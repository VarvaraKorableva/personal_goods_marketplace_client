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
import Footer from './Components/Footer/Footer'
import MyPage from './Components/MyPage/MyPage'
import './App.css'
import Category from './Components/Main/Сategory/Сategory';
import AddAdPopup from './Components/Popups/AddAdPopup/AddAdPopup'
import ChoiceOfProductOrServicePopup from './Components/Popups/ChoiceOfProductOrServicePopup/ChoiceOfProductOrServicePopup'

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

  const [myAds, setMyAds] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [subCategories, setSubCategories] = React.useState([])

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
  },[])

  function chooseCategory(category_id) {
    setSubCategories(categories.filter((item) => item.parent_id === category_id))
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
      setCurrentUser(res)
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

  function handleAddAdSubmit(formData) {
    /*axios.post('http://localhost:3000/dreams', formData, {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        setDreams([res.data, ...dreams]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });*/
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
    /*setIsAddNewDatePopup(false)
    setIsLanguageChangePopup(false)
    setIsEditDreamPopup(false)
    setSelectedDream({})
    setSelectedMotan({})*/
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
            <Main categories={categories} onChooseCategory={chooseCategory}/>
          }
        />

        <Route 
          path='/category/:slug' 
          element={
            <Main subCategories={subCategories}/>
          }
        />

        <Route
          exact path={`/users/${userId}`}
          element={
            <ProtectedRoute isLoggin={isLoggin}>
              <MyPage
              
              />
            </ProtectedRoute>
          }>
        </Route>  
{/*        
        <Route 
        path='/users/:id' 
        element={
          <OneUserPage
            friends={friends}
            isLoggin={isLoggin}
            onFriendCardClick={handleMotanClick}
            addSubscribe={addSubscribe}
            getAllSubscriptions={getAllSubscriptions}
            allMySubscriptions={allMySubscriptions}
            deleteSubscription={deleteSubscription}
            showLoading={showLoading}
          />
        }>
        </Route>
        <Route
        path="*"
        element={
          <NotFoundPage />
        }>
        </Route>

      </Routes>

    <AddAvatarPopap 
      isOpen={isAddAvatarPopap}
      onClose={closeAllPopups}
      handleAddAvatar={handleAddAvatar}/>

    <AddDreamPopup
      isOpen={isAddDreamPopup}
      onClose={closeAllPopups}
      onAddDream={handleAddDreamSubmit}
    />  

    <EditDreamPopup
      isOpen={isEditDreamPopup}
      onClose={closeAllPopups}
    />

    <ImagePopup 
      dream={selectedDream}
      onClose={closeAllPopups}
    />

    <MotanOpenPopap
      motan={selectedMotan}
      onClose={closeAllPopups}
    />

    <PopapChangeAvatar
      onClose={closeAllPopups}
      isOpen={isChangeAvatarPopup}
      handleUpdateAvatarSubmit={handleUpdateAvatar}
    />

    <AddNewDatePopap
      isOpen={isAddNewDatePopup}
      onClose={closeAllPopups}
      onAddDate={handleAddNewDateSubmit}
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
      <Footer></Footer>
    </div>
    </CurrentUserContext.Provider>  
    </LanguageProvider>
  );
}

export default App;
