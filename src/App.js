import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import {CurrentUserContext} from './contexts/CurrentUserContext'
import { LanguageContext, LanguageProvider } from './contexts/TranslationContext';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import * as Api from './Api/Api'
import Registration from './Components/Registration/Registration'
import Login from './Components/Login/Login'
import Header from './Components/Header/Header'
import Main from './Components/Main/Main'
import CategoryPage from './Components/Main/CategoryPage/CategoryPage'
import Footer from './Components/Footer/Footer'
import MyPage from './Components/MyPage/MyPage'
import './App.css'

import ThirdCategoryPage from './Components/Main/ThirdCategoryPage/ThirdCategoryPage'
import NotFoundPage from './Components/NotFoundPage/NotFoundPage'
import MyFavoritesPage from './Components/MyFavoritesPage/MyFavoritesPage'
import UserPage from './Components/UserPage/UserPage'
import CardPage from './Components/CardPage/CardPage'
import Category from './Components/Main/Сategory/Сategory';
import AddAdPopup from './Components/Popups/AddAdPopup/AddAdPopup'
import ChoiceOfProductOrServicePopup from './Components/Popups/ChoiceOfProductOrServicePopup/ChoiceOfProductOrServicePopup'
import SuccessfulActionPopup from './Components/Popups/ SuccessfulActionPopup/ SuccessfulActionPopup'

function App() {
  const [isLoggin, setIsLoggin] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState({})

  //const [isLoading, setIsLoading] = React.useState(false)
  const [showLoading, setShowLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [errorLoginMessage, setErrorLoginMessage] = React.useState('')
  const [isError, setIsError] = React.useState(false)
  const [isLoginError, setIsLoginError] = React.useState(false)

  const [isAddAdPopup, setIsAddAdPopup] = React.useState(false)
  const [isChoiceOfProductOrServicePopup, setIsChoiceOfProductOrServicePopup] = React.useState(false)
  const [isSuccessfulActionPopup, setSuccessfulActionPopup] = React.useState(false)
  const [popupMessage, setPopupMessage] = React.useState('')
  

  const [myAds, setMyAds] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [subCategories, setSubCategories] = React.useState([])
  const [thirdSubCategories, setThirdSubCategories] = React.useState([])
  const [lastFourtyItems, setLastFoutryItems] = React.useState([])

  const [categoryItemsSearch, setCategoryItemsAfterSearch] = React.useState([])
  const [itemsAfterSearch, setItemsAfterSearch] = React.useState([])
  const [selectedItem, setSelectedItem] = React.useState([])
  const [userInfo, setUserInfo] = React.useState([]) ///нужно удалить!!!
  const [favorite, setFovorite] = React.useState([])
  const [favoriteItems, setFavoriteItems] = React.useState([])

  const userId = currentUser.user_id
  const favorite_collector_id = currentUser.user_id
  
  const navigate = useNavigate()

  async function getCategory() {
    try {
      const res = await Api.getCategory();
      setCategories(res);
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(()=>{
    getCategory()
    getLastFourtyItems()
    
  },[])
//при нажатии на категорию вызываем функцию, аргументом передаем категори_айди+
//функция которая передает в стейт все айтомы в этой категории
//нужно получить все айтомы и все категории, их профильтровать на категори_айди,
//стейт должен получиться только из айтомов соответствующей категории
  function chooseCategory(category_id) {
    setSubCategories(categories.filter((item) => item.parent_id === category_id))
    setCategoryItemsAfterSearch(lastFourtyItems.filter((i) => i.category_id === category_id))
  } 

  function chooseThirdCategory(category_id) {
    setThirdSubCategories(categories.filter((item) => item.parent_id === category_id))
    console.log(categories.filter((item) => item.parent_id === category_id))
    //setCategoryItemsAfterSearch(lastFourtyItems.filter((i) => i.category_id === category_id))
  } 

  function goToCategory(slug) {
    setSubCategories(categories.filter((item) => item.slug === slug))
  } 

  function handleRegSubmit(userData) {
    Api.register({
      username:userData.username,
      email: userData.email,
      password: userData.password,
    })
    .then((data) => {
      setCurrentUser(data.user)
      setMyAds([]);
      setIsLoggin(true)
      navigate(`/`)
    })  
    .catch((err) => {
      if (err.status === 409 || 11000) {
        setIsError(true)
        setErrorMessage('Error, such Email already exists.');
      } else {
        setIsError(true)
        setErrorMessage('The server encountered an error. Please try again later.')
        setTimeout(function(){
          setErrorMessage('');
          setIsError(false)
        }, 5000)
      }
    })
  }

  function handleLoginSubmit(userData){
    Api.authorize({
      password: userData.password, 
      email: userData.email
    })
    .then ((res) => {
      setIsLoggin(true)
      setCurrentUser(res.user[0])
      Api.getCategory()
        .then((data) => {
          setCategories(data)
          navigate(`/`)
        })
    })  
    .catch((err) => {
      console.log(err)
      if (err.status === 401 || 11000) {
        setIsLoginError(true)
        setErrorLoginMessage('One of the two does not fit.');
        setTimeout(function(){
          setErrorLoginMessage('')
          //setIsLoginError(false)
        }, 4000)
      } else {
        setIsLoginError(true)
        setErrorLoginMessage('The server encountered an error. Please try again later.')
        setTimeout(function(){
          setErrorLoginMessage('')
          //setIsLoginError(false)
        }, 5000)
      }
      //401
    })
  }

  function getLastFourtyItems() {
    Api.getLastForty()
    .then((res) => {
      setLastFoutryItems(res)
      setItemsAfterSearch(res)
    })
  }

  function getMyItems(owner_id) {
    Api.getUserItems(owner_id)
    .then((res) => {
      setMyAds(res)
    })
  }

  function handleAddAdSubmit(data) {
    Api.createItem(data)
    .then((res)=> {
      closeAllPopups()
      setPopupMessage("Ad added successful!")
      openSuccessfulActionPopup()
    })
    .catch((err)=> {
      closeAllPopups()
      setPopupMessage("Something wrong, plese try again")
      openSuccessfulActionPopup()
    })
  }

  function getItemById(item_id) {
    Api.getItemById(item_id)
    .then((res)=> {
      setSelectedItem(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function getUserById(user_id) {
    Api.getUserById(user_id)
    .then((res) => {
      setUserInfo(res)
      console.log(res) 
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function deleteMyAd(item_id) {
    Api.deleteItem(item_id)
    .then((res) => {
      setMyAds((state) => state.filter((item) => item.item_id !== item_id))
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function addToFavorites(favorite_collector_id, item_id, item) {
    const isLiked = favorite.some((i) => i.item_id === item_id);
    if (isLiked) {
      console.log("Этот элемент уже в избранном!");
    }
    Api.addToFavoritesServer({ favorite_collector_id, item_id })
      .then((res) => {
        setFovorite([res, ...favorite])
        console.log("Элемент успешно добавлен в избранное!")
      })
    .catch((err) => {
      console.log(err)
    })
  }

  function deleteFromFavorites(favorite_items_id) {
    console.log('from app => ', favorite_items_id)
    Api.deleteFromFavoritesServer(favorite_items_id)
    .then((res)=> {
      setFovorite(prevFavorite => prevFavorite.filter((f) => f.favorite_items_id !== favorite_items_id));
    })
    .catch((err)=> {
      console.log(err)
    })
  }

  function getMyFavorites(favorite_collector_id) {
    Api.getMyFavorites(favorite_collector_id)
    .then((res) => {
      setFovorite(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function startToSearch(keyWord) {
    const keywordLowerCase = keyWord.toLowerCase()
    console.log(lastFourtyItems.filter((item) => item.title.toLowerCase().includes(keywordLowerCase)));

    //itemsAfterSearch, 
    setItemsAfterSearch(lastFourtyItems.filter((item) => item.title.toLowerCase().includes(keywordLowerCase)))
    //console.log(categories.filter((category) => category.name.includes(keyWord)))
    //console.log(lastFourtyItems.filter((item) => item.title.toUpperCase().includes(keyWord.toUpperCase())))
    //console.log(lastFourtyItems.filter((item) => item.city.includes(keyWord)))
}

  function handleItemClick(item) {
    setSelectedItem(item);
  }

  function openSuccessfulActionPopup() {
    setSuccessfulActionPopup(true)
  }

  function handleAddAdClick(){
    setIsAddAdPopup(true)
  }

  function handleChoiceOfProductOrServicePopupClick(){
    setIsChoiceOfProductOrServicePopup(true)
  }

  function closeAllPopups() {
    setIsAddAdPopup(false)
    setIsChoiceOfProductOrServicePopup(false)
    setSuccessfulActionPopup(false)
    setPopupMessage("")
  }

  function handleLogout() {
    //Api.logout()
    //.then((res)=>{
      setIsLoggin(false)
      setCurrentUser({})
      navigate(`/`)
    //})
    //.coach((err) => {
    //  console.log(err)
    //})
  }
/*
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }
  
  // Пример использования:
  const token = getCookie('jwt');
  console.log(token);*/

  return (
    <LanguageProvider>
    <CurrentUserContext.Provider value={currentUser}>  
    <div className='App'>
      <Header isLoggin={isLoggin} onAdPopup={handleChoiceOfProductOrServicePopupClick}></Header>

      <Routes>
        <Route
        path="/signup"
        element={
        <Registration onRegister={handleRegSubmit}
        />
        }>
        </Route>

        <Route
          path="/signin"
          element={
            <Login onLogin={handleLoginSubmit}
            />
          }>
        </Route>

        <Route
          path="/"
          element={
            <Main 
              categories={categories} 
              onChooseCategory={chooseCategory}
              getItemById={getItemById}

              lastFourtyItems={lastFourtyItems} //Need, because of search
              addToFavorites={addToFavorites}
              startToSearch={startToSearch}
              //deleteFromFavorites={deleteFromFavorites}
              favorite={favorite}
              favoriteItems={favoriteItems}

              itemsAfterSearch={itemsAfterSearch}

              isLoggin={isLoggin}
            />
          }
        />

        <Route 
          path='/category/:slug' 
          element={
            <CategoryPage 
              categories={categories}
              startToSearch={startToSearch}
              categoryItemsSearch={categoryItemsSearch}
              addToFavorites={addToFavorites}
              deleteFromFavorites={deleteFromFavorites}
              chooseThirdCategory={chooseThirdCategory}
            />
          }
        />

        <Route 
          path='/third-category-page/:slug' 
          element={
            <ThirdCategoryPage 
              thirdSubCategories={thirdSubCategories}
              startToSearch={startToSearch}
              categoryItemsSearch={categoryItemsSearch}
              addToFavorites={addToFavorites}
              deleteFromFavorites={deleteFromFavorites}
            />
          }
        />

        <Route 
          path='/items/:item_id' 
          element={
            <CardPage 
              selectedItem={selectedItem}
              getItemById={getItemById}
              getUserById={getUserById}
              userInfo={userInfo}
              addToFavorites={addToFavorites}
              deleteFromFavorites={deleteFromFavorites}
              isLoggin={isLoggin}
            />
          }
        />

        <Route
          exact path={`/users/${userId}`}
          element={
            <ProtectedRoute isLoggin={isLoggin}>
              <MyPage
                getMyItems={getMyItems}
                myAds={myAds}
                deleteMyAd={deleteMyAd}
                handleLogout={handleLogout}
                isLoggin={isLoggin}
              />
            </ProtectedRoute>
          }>
        </Route>  
       
        <Route 
          path={`/users/:owner_id`}
          element={
            <UserPage
              addToFavorites={addToFavorites}
              deleteFromFavorites={deleteFromFavorites}
              getUserById={getUserById}
              userInfo={userInfo}
              myAds={myAds}
              getMyItems={getMyItems}
              getItemById={getItemById}
              isLoggin={isLoggin}
          />
          }>
        </Route>

        <Route 
          path='/my_favorites' //закрытый роут !!!!
          element={
            <MyFavoritesPage 
              getMyFavorites={getMyFavorites}
              favorite={favorite}
              lastFourtyItems={lastFourtyItems}
              favoriteItems={favoriteItems}
              deleteFromFavorites={deleteFromFavorites}
              getMyFavorites={getMyFavorites}
            />
          }
        />
        <Route
          path="*"
          element={
            <NotFoundPage />
          }>
        </Route>
      </Routes>
      <ChoiceOfProductOrServicePopup
        isOpen={isChoiceOfProductOrServicePopup}
        onClose={closeAllPopups}
        onAdBtn={handleAddAdClick}
      /> 
      <AddAdPopup
        isOpen={isAddAdPopup}
        onClose={closeAllPopups}
        onAddAd={handleAddAdSubmit}
        categories={categories}
      /> 

      <SuccessfulActionPopup 
        isOpen={isSuccessfulActionPopup}
        onClose={closeAllPopups}
        popupMessage={popupMessage}
      />
      <Footer></Footer>
    </div>
    </CurrentUserContext.Provider>  
    </LanguageProvider>
  );
}

export default App;
