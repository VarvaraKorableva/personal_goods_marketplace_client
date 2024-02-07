import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import {CurrentUserContext} from './contexts/CurrentUserContext'
import { LanguageContext, LanguageProvider } from './contexts/TranslationContext';
//import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Registration from './Components/Registration/Registration'
import Header from './Components/Header/Header'
import Main from './Components/Main/Main'
import Footer from './Components/Footer/Footer'
import './App.css'

function App() {
  return (
    <LanguageProvider>
    <CurrentUserContext.Provider>  
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
        path="/"
        element={
        <Main
        />
        }>
        </Route>
{/*
        <Route
        path="/signin"
        element={
        <Login
          onSubmit={handleLoginSubmit}
          errorLoginMessage={errorLoginMessage}
          isLoginError={isLoginError}
        />
        }>
        </Route>

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
          <MyFriendsPage
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
        path="/users"  ///Searching
        element={
        <FriendsSearching
          friends={friends}
          handleGetUsersSubmit={handleGetUsersSubmit}
        />
        }>
        </Route>

        <Route
        path="/my-subscriptions"  ///Searching (MY!!!)
        element={
          <ProtectedRoute isLoggin={isLoggin}>
            <AllMyFriendsPageAndSerching
              getAllSubscriptions = {getAllSubscriptions}
              allMySubscriptions={allMySubscriptions}
              friends={friends}
              handleGetUsersSubmit={handleGetUsersSubmit}
              isLoading={isLoading}
            />
          </ProtectedRoute>
        }>
        </Route>

        <Route
        path="/change-my-profile"
        element={
          <ProtectedRoute isLoggin={isLoggin}>
            <ChangeMyProfile
              onChangeSubmit={changeUserInfoSubmit}
            />
          </ProtectedRoute>
        }>
        </Route>

        <Route
        path={`/users/${userId}/dates`}
        element={
          <ProtectedRoute isLoggin={isLoggin}>
            <MyImportantDatesPage
              addPopupOpen={handleAddNewDateClick}
              importantDates={importantDates} //только мои даты
              getMyImportantDates={getMyImportantDates} //получение только моих дат
              isLoading={isLoading}
              onDelete={handleDeleteMyImportantDate}
            />
          </ProtectedRoute>
        }>
        </Route>

        <Route 
        path='/users/:id/dates' 
        element={
          <MyFriendsImportantDatesPage
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
