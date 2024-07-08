import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import {CurrentUserContext} from './contexts/CurrentUserContext'
import { LanguageProvider } from './contexts/TranslationContext';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import * as Api from './Api/Api'
import Registration from './Components/Registration/Registration'
import Login from './Components/Login/Login'
import Header from './Components/Header/Header'
import Main from './Components/Main/Main'
import Footer from './Components/Footer/Footer'
import MyPage from './Components/MyPage/MyPage'
import CategoryPage from './Components/Main/CategoryPage/CategoryPage'
import './App.css'

import AddAdPage from './Components/AddAdPage/AddAdPage'
import NotFoundPage from './Components/NotFoundPage/NotFoundPage'
import MyFavoritesPage from './Components/MyFavoritesPage/MyFavoritesPage'
import UserPage from './Components/UserPage/UserPage'
import CardPage from './Components/CardPage/CardPage'
import ChoiceOfProductOrServicePopup from './Components/Popups/ChoiceOfProductOrServicePopup/ChoiceOfProductOrServicePopup'
import SuccessfulActionPopup from './Components/Popups/ SuccessfulActionPopup/ SuccessfulActionPopup'

import testData from './const/testData';

function App() {
  const [isLoggin, setIsLoggin] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState({})

  const [isChoiceOfProductOrServicePopup, setIsChoiceOfProductOrServicePopup] = React.useState(false)
  const [isSuccessfulActionPopup, setSuccessfulActionPopup] = React.useState(false)
  const [popupMessage, setPopupMessage] = React.useState('')
  
  const [myAds, setMyAds] = React.useState([])
  const [categories, setCategories] = React.useState([])

  const [allImages, setAllImages] = React.useState([])
  const [myImages, setMyImages] = React.useState([])

  const [categoriesToRender, setCategoriesToRender] = React.useState([])

  const [lastFourtyItems, setLastFoutryItems] = React.useState([])

  const [itemsSecondPageSearch, setItemsSecondPageSearch] = React.useState([])//items
  const [startItemsSecondPage, setStartItemsSecondPage] = React.useState([])//items

  const [itemsAfterSearch, setItemsAfterSearch] = React.useState([])

  const [selectedItem, setSelectedItem] = React.useState([])
  const [userInfo, setUserInfo] = React.useState([])
  const [favorite, setFovorite] = React.useState([])
  const [favoriteItems, setFavoriteItems] = React.useState([])
  
  const [isGood, setIsGood] = React.useState(true)
  const [isLoginError, setIsLoginError] = React.useState(false)
  const [isRegError, setIsRegError] = React.useState(false)

  const [limit, setLimit] = React.useState(3)

  const addAds = () => setLimit(limit + 3);
  //const hideAds = () => setLimit(3);


  const userId = currentUser.user_id
  const navigate = useNavigate()

  async function getCategory() {
    try {
      const res = await Api.getCategory();
      setCategories(res);
      setCategoriesToRender(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function getLastFourtyItems() {
    try {
      const res = await Api.getLastForty();
      setLastFoutryItems(res)
      setItemsAfterSearch(res) 
      //setLastFoutryItems(testData)
      //setItemsAfterSearch(testData) 
      //testData
      
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllImagesForItems() {
    try {
      const res = await Api.getAllImages();
      setAllImages(res)
    } catch (err) {
      console.log(err);
    }
  }

  React.useEffect(()=>{
    getAllImagesForItems()
    getCategory()
    getLastFourtyItems()
    
    /*if(localStorage.getItem('isLogin') === true ) {
      setIsLoggin(true)
      setCurrentUser(localStorage.getItem('user'))
    }*/
  },[])

  function chooseCategory(category) {

      setCategoriesToRender(categories.filter((item) => item.parent_id === category.category_id)) 
  
      let myCatToRender = []

      findAllCategoryGrandChildren(category, myCatToRender) 
   
      setItemsSecondPageSearch(lastFourtyItems.filter((i) => myCatToRender.includes(i.category_id)))
      setStartItemsSecondPage(lastFourtyItems.filter((i) => myCatToRender.includes(i.category_id)))
      
  } 

  function findAllCategoryGrandChildren(category, myCatToRenderNew) {
    let childrens = categories.filter((item) => item.parent_id === category.category_id)

    if(childrens.length === 0) {
      myCatToRenderNew.push(category.category_id)
    } else {
      childrens.forEach((item) => {
        findAllCategoryGrandChildren(item, myCatToRenderNew)
      })
    }

    return myCatToRenderNew
  }


  function handleRegSubmit(userData) {
    setIsRegError(false)
    Api.register({
      username:userData.username,
      email: userData.email,
      password: userData.password,
    })
    
    .then((data) => {
      setIsRegError(false)
      setCurrentUser(data.user)
      localStorage.setItem('user', data.user)
      setMyAds([]);
      setIsLoggin(true)
      localStorage.setItem('isLogin', true)
      navigate(`/`)
    })  
    .catch((err) => {
      if(err == 400) {
        setIsRegError(true)
      }
    })
  }

  function handleLoginSubmit(userData){
    Api.authorize({
      password: userData.password, 
      email: userData.email
    })
    .then ((res) => {
      setIsLoginError(false)
      setIsLoggin(true)
      localStorage.setItem('isLogin', true)
      setCurrentUser(res.user)
      localStorage.setItem('user', res.user)
      const favorite_collector_id = res.user.user_id
      getMyFavorites(favorite_collector_id)
      navigate(`/`)
    })  
    .catch((err) => {
      if(err == 401) {
        setIsLoginError(true)
        setTimeout(function(){
          setIsLoginError(false)
        }, 3000)
      }
    })
  }

  function getMyItems(owner_id) {
    Api.getUserItems(owner_id)
    .then((res) => {
      setMyAds(res)
    })
  }

  function handleAddAdSubmit(data) {
    const { formData, ...otherData } = data;
    Api.createItem(otherData)
    .then((res)=> {
      if(formData) {
        const id = res.item_id
        const str_item_id = Number(id)
        formData.append('str_item_id', str_item_id); 
        Api.uploadFile(formData)
        .then((res) => {
          setMyImages([res[0], ...myImages])
          closeAllPopups()
          setPopupMessage("Ad added successful!")
          setMyAds([res, ...myAds])
          openSuccessfulActionPopup()
        })
        .then(()=> {
          getLastFourtyItems()
          getAllImagesForItems()
        })
        .catch((err)=> {
          console.log(err)
          closeAllPopups()
          setPopupMessage("Something wrong, plese try again")
          openSuccessfulActionPopup()
          
        })
      }else {
          closeAllPopups()
          setPopupMessage("Ad added successful!")
          setMyAds([res, ...myAds])
          openSuccessfulActionPopup()
      }
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
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function deleteMyAd(item_id) {
    Api.deleteItem(item_id)
    .then((res) => {
      setMyAds((state) => state.filter((item) => item.item_id !== item_id))
      setLastFoutryItems((state) => state.filter((item) => item.item_id !== item_id))
      setItemsAfterSearch((state) => state.filter((item) => item.item_id !== item_id))
      setItemsSecondPageSearch((state) => state.filter((item) => item.item_id !== item_id))
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function addToFavorites(favorite_collector_id, item_id, item) {
    Api.addToFavoritesServer({ favorite_collector_id, item_id })
      .then((res) => {
        setFovorite([res, ...favorite])
        setFavoriteItems([item, ...favoriteItems]);
      })
    .catch((err) => {
      console.log(err)
    })
  }
 
  function deleteFromFavorites(favItem) {
    Api.deleteFromFavoritesServer(favItem.item_id)
      .then((res) => {
        setFovorite((state) => 
          state.filter((item) => 
          item.item_id !== favItem.item_id)
        )
        setFavoriteItems((state) => state.filter((item) => item.item_id !== favItem.item_id));
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function getMyFavorites(favorite_collector_id) {
    Api.getMyFavorites(favorite_collector_id)
    .then((res) => {
      setFovorite(res)
      const favoriteItemsResult = lastFourtyItems.filter(item =>
      res.some(favoriteItem => favoriteItem.item_id === item.item_id)
      );
      setFavoriteItems(favoriteItemsResult);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function startToSearch(keyWord) {
    const keywordLowerCase = keyWord.toLowerCase()
    setItemsAfterSearch(lastFourtyItems.filter((item) => item.title.toLowerCase().includes(keywordLowerCase)))
  }

  function startToSearchSecondPage (keyWord) {
    const keywordLowerCase = keyWord.toLowerCase()
    setItemsSecondPageSearch(startItemsSecondPage.filter((item) => item.title.toLowerCase().includes(keywordLowerCase)))
  }

  function openSuccessfulActionPopup() {
    setSuccessfulActionPopup(true)
  }

  function handleAddAdClick(data){
    setIsGood(data)
    navigate(`/add-ad`) 
    closeAllPopups()
  }

  function handleChoiceOfProductOrServicePopupClick(){
    setIsChoiceOfProductOrServicePopup(true)
  }

  function closeAllPopups() {
    setIsChoiceOfProductOrServicePopup(false)
    setSuccessfulActionPopup(false)
    setPopupMessage("")
  }

  function handleLogout() {
      setIsLoggin(false)
      localStorage.removeItem('isLogin')
      localStorage.removeItem('user')
      
      setCurrentUser({})
      getMyFavorites([])
      navigate(`/`)
  }
  
  return (
    <LanguageProvider>
    <CurrentUserContext.Provider value={currentUser}>  
    <div className='App'>
      <Header isLoggin={isLoggin} onAdPopup={handleChoiceOfProductOrServicePopupClick}></Header>

      <Routes>
        <Route
        path="/signup"
        element={
        <Registration 
          onRegister={handleRegSubmit}
          isRegError={isRegError}
        />
        }>
        </Route>

        <Route
          path="/signin"
          element={
            <Login 
              onLogin={handleLoginSubmit}
              isLoginError={isLoginError}
            />
          }>
        </Route>

        <Route
          path="/"
          element={
            <Main 
              onChooseCategory={chooseCategory}
              getItemById={getItemById}
              categories={categories}
              lastFourtyItems={lastFourtyItems} //Need, because of search
              addToFavorites={addToFavorites}
              startToSearch={startToSearch}
              deleteMyAd={deleteMyAd}
              deleteFromFavorites={deleteFromFavorites}
              favorite={favorite}
              favoriteItems={favoriteItems}
              itemsAfterSearch={itemsAfterSearch}
              isLoggin={isLoggin}
              allImages={allImages}
            />
          }
        />

        <Route 
          path='/category/:slug' 
          element={
            <CategoryPage 
              chooseCategory={chooseCategory}
              categoriesToRender={categoriesToRender}
              categories={categories}
              deleteMyAd={deleteMyAd}
              addToFavorites={addToFavorites}
              deleteFromFavorites={deleteFromFavorites}
              getItemById={getItemById} 
              lastFourtyItems={lastFourtyItems}
              itemsSecondPageSearch={itemsSecondPageSearch}
              startToSearchSecondPage={startToSearchSecondPage}
              isLoggin={isLoggin}
              favorite={favorite}
              favoriteItems={favoriteItems}
              allImages={allImages}
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
              favoriteItems={favoriteItems}
              deleteMyAd={deleteMyAd}
              allImages={allImages}
            />
          }
        />

        <Route
          path={`/add-ad`}
          element={
            <ProtectedRoute isLoggin={isLoggin}>
              <AddAdPage
                categories={categories}
                onAddAd={handleAddAdSubmit}
                isLoggin={isLoggin}
                isGood={isGood}
              />
            </ProtectedRoute>
          }>
        </Route> 

        <Route
          exact path={`/users/${userId}`}/////тут было так ${userId}
          element={
            <ProtectedRoute isLoggin={isLoggin}>
              <MyPage
                onAdPopup={handleChoiceOfProductOrServicePopupClick}
                getUserById={getUserById}
                getMyItems={getMyItems}
                myAds={myAds}
                deleteMyAd={deleteMyAd}
                handleLogout={handleLogout}
                isLoggin={isLoggin}
                getItemById={getItemById}
                addToFavorites={addToFavorites} 
                deleteFromFavorites={deleteFromFavorites}
                favorite={favorite}
                favoriteItems={favoriteItems}
                allImages={allImages}
                limit={limit}
                addAds={addAds}
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
              favoriteItems={favoriteItems}
              favorite={favorite}
              allImages={allImages}
          />
          }>
        </Route>

        <Route
          exact path={`/my_favorites`}
          element={
            <ProtectedRoute isLoggin={isLoggin}>
              <MyFavoritesPage 
                getMyFavorites={getMyFavorites}
                favorite={favorite}
                lastFourtyItems={lastFourtyItems}
                favoriteItems={favoriteItems}
                deleteFromFavorites={deleteFromFavorites}
                allImages={allImages}
              />
            </ProtectedRoute>
          }>
        </Route> 

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

      <SuccessfulActionPopup 
        isOpen={isSuccessfulActionPopup}
        onClose={closeAllPopups}
        popupMessage={popupMessage}
      />
      <Footer handleLogout={handleLogout}></Footer>
    </div>
    </CurrentUserContext.Provider>  
    </LanguageProvider>
  );
}

export default App;
