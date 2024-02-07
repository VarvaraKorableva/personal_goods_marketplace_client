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

function App() {
  const [isLoggin, setIsLoggin] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState({})

  const [isLoading, setIsLoading] = React.useState(false)
  const [showLoading, setShowLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [errorLoginMessage, setErrorLoginMessage] = React.useState('')
  const [isError, setIsError] = React.useState(false)
  const [isLoginError, setIsLoginError] = React.useState(false)

  const [myAds, setMyAds] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [subCategories, setSubCategories] = React.useState([])

  const userId = currentUser._id
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
      password: userData.password,
      email: userData.email,
      name:userData.name
    })
    .then((data) => {
      setCurrentUser(data.user)
    })  
    .then(() => {
      setMyAds([]);
      setIsLoggin(true)
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

  return (
    <LanguageProvider>
    <CurrentUserContext.Provider value={currentUser}>  
    <div className='App'>
      <Header></Header>

      <Routes>
        <Route
        path="/signup"
        element={
        <Registration
        />
        }>
        </Route>

        <Route
        path="/signin"
        element={
        <Login
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
{/*
        <Route
        exact path={`/users/${userId}`}
        element={
          <ProtectedRoute isLoggin={isLoggin}>
            <MyPage
              addPopupOpen={handleAddDreamClick}
              OnDeleteMyDream={handleDeleteDream}
              OnEditMyDream={handleEditDreamClick}
              dreams={dreams}
              onCardClick={handleDreamClick}
              onImgToChangeAvatar={handleChangeAvatarClick}
              addDreams={addDreams}
              limit={limit}
            />
          </ProtectedRoute>
        }>
        </Route>  
        
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
      <Footer></Footer>
    </div>
    </CurrentUserContext.Provider>  
    </LanguageProvider>
  );
}

export default App;
