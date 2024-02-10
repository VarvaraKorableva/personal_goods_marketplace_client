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

  const [isLoading, setIsLoading] = React.useState(false)
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
  const [lastFourtyItems, setLastFoutryItems] = React.useState([])
  const [selectedItem, setSelectedItem] = React.useState([])
  const [userInfo, setUserInfo] = React.useState([])
  const [favorite, setFovorite] = React.useState([])

  const userId = currentUser.user_id
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

  function chooseCategory(category_id) {
    setSubCategories(categories.filter((item) => item.parent_id === category_id))
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
      setCurrentUser(data)
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
      console.log(res.user[0])
      setCurrentUser(res.user[0])
      setIsLoggin(true)
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

  function addToFavorites(favorite_collector_id, item_id) {
    Api.addToFavorites({favorite_collector_id, item_id})
    .then((res) => {
      //setFovorite((prev) => res)
    })
    .catch((err) => {
      console.log(err)
    })
  }
//////Передать функцию во все айтомы + в мейн

  function getMyFavorites(favorite_collector_id) {
    Api.getMyFavorites(favorite_collector_id)
    .then((res) => {
      setFovorite(res)
    })
    .catch((err) => {
      console.log(err)
    })
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
              lastFourtyItems={lastFourtyItems}
              addToFavorites={addToFavorites}
              />
          }
        />

        <Route 
          path='/category/:slug' 
          element={
            <CategoryPage 
              categories={categories}
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
              />
            </ProtectedRoute>
          }>
        </Route>  
       
        <Route 
          path={`/users/:owner_id`}
          element={
            <UserPage
              addToFavorites={addToFavorites}
              getUserById={getUserById}
              userInfo={userInfo}
              myAds={myAds}
              getMyItems={getMyItems}
              getItemById={getItemById}
          />
          }>
        </Route>

        <Route 
          path='/my_favorites' 
          element={
            <MyFavoritesPage 
              getMyFavorites={getMyFavorites}
              favorite={favorite}
            />
          }
        />
{/*         <Route
        path="*"
        element={
          <NotFoundPage />
        }>
        </Route>
MyFavoritesPage
      </Routes>

    <AddAvatarPopap 
      isOpen={isAddAvatarPopap}
      onClose={closeAllPopups}
      handleAddAvatar={handleAddAvatar}/>

    <ImagePopup 
      dream={selectedDream}
      onClose={closeAllPopups}
    />

    <PopapChangeAvatar
      onClose={closeAllPopups}
      isOpen={isChangeAvatarPopup}
      handleUpdateAvatarSubmit={handleUpdateAvatar}
    />

    <LanguageChangePopup
      isOpen={isLanguageChangePopup}
      onClose={closeAllPopups}
    />

    
      <Footer/>*/}
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
