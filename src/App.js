import useItem from "./hooks/items/useItem"
import useItemUpdate from "./hooks/items/useItemUpdate"
import useItemFavorites from "./hooks/items/useItemFavorites";
import useAuthActions from "./hooks/useAuthActions";
import useMessages from "./hooks/useMessages";
import useCategory from "./hooks/category/useCategory"
import usePopup from "./hooks/popups/usePopups"
import useFilters from "./hooks/items/useFilters"
import useUser from "./hooks/useUser"
import useLoading from "./hooks/useLoading"
import useScroll from "./hooks/useScroll";

import './App.css'

import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import {CurrentUserContext} from './contexts/CurrentUserContext'

import { LanguageProvider } from './contexts/TranslationContext';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'

import Registration from './Components/Registration/Registration'
import RegistrationFirstStage from './Components/Registration/RegistrationFirstStage'
import Login from './Components/Login/Login'
import Header from './Components/Header/Header'
import Main from './Components/Main/Main'
import Footer from './Components/Footer/Footer'
import MyPage from './Components/MyPage/MyPage'
import MyMessages from './Components/MyPage/MyMessages/MyMessages'
import CategoryPage from './Pages/CategoryPage/CategoryPage'
import RulesPublicationsPage from './Pages/RulesPublicationsPage/RulesPublicationsPage'
import Preloader from './Components/Preloader/Preloader'
import AdminPage from './Pages/AdminPage/AdminPage'
import ChangeCategoryPage from './Pages/AdminPage/ChangeCategoryPage/ChangeCategoryPage'
import AddAdPage from './Pages/AddAdPage/AddAdPage'
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage'
import MyFavoritesPage from './Pages/MyFavoritesPage/MyFavoritesPage'
import UserPage from './Pages/UserPage/UserPage'
import CardPage from './Components/CardPage/CardPage'

import EditPopup from './Components/Popups/EditPopup/EditPopup'
import AreYouSurePopup from './Components/Popups/AreYouSurePopup/AreYouSurePopup'
import ChoiceOfProductOrServicePopup from './Components/Popups/ChoiceOfProductOrServicePopup/ChoiceOfProductOrServicePopup'
import SuccessfulActionPopup from './Components/Popups/SuccessfulActionPopup/SuccessfulActionPopup'
import FirstMessagePopup from './Components/Popups/FirstMessagePopup/FirstMessagePopup'
import BurgerMenuPopup from './Components/Popups/BurgerMenuPopup/BurgerMenuPopup'
import AddServicesPage from './Pages/AddServicesPage/AddServicesPage'
import NotReadyPage from './Pages/NotReadyPage/NotReadyPage'
import RecoverPasswordPage from './Pages/RecoverPasswordPage/RecoverPasswordPage'
import PasswordRecoveryCodeRequestPage from './Pages/PasswordRecoveryCodeRequestPage/PasswordRecoveryCodeRequestPage'
import ConversationPage from './Pages/ConversationPage/ConversationPage'
import ClientsAdminPage from './Pages/AdminPage/ClientsAdminPage/ClientsAdminPage'
import ListingsAdminPage from './Pages/AdminPage/ListingsAdminPage/ListingsAdminPage'
import ModerationAdminPage from './Pages/AdminPage/ModerationAdmin/ModerationAdmin'


function App() {
  //const [currentUser, setCurrentUser] = React.useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {})
  const [currentUser, setCurrentUser] = React.useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Ошибка парсинга localStorage user:", e);
      return {};
    }
  });
  const userId = currentUser.user_id
  const [myAds, setMyAds] = React.useState([])
  const [receiverId, setReceiverId] = React.useState('')
  const [itemId, setItemId] = React.useState('') //используется по попапов и для айтемс, поэтому нельзя выносить отдельно
  const [isReserved, setIsReserved] = React.useState(false)
  
  const location = useLocation();

  const {
    openLoading,
    closeLoading,
    isLoading,
  } = useLoading();

  const {
    closeAllPopups,
    openSuccessfulActionPopup,
    openFirstMessagePopup,
    openBurgerMenuPopup,
    openEditPopup,
    openDeletePopup,
    handleChoiceOfProductOrServicePopupClick,
    isChoiceOfProductOrServicePopup,
    isSuccessfulActionPopup,
    isFirstMessagePopup,
    isEditPopup,
    isDeletePopup,
    popupMessage,
    isBurgerMenuPopup,
    editPopupName,
    popupEditItemId,
    setPopupMessage,
    setSuccessfulActionPopup,
    itemIdDelete,
    handleAddAdClick,
    isGood,
  } = usePopup({setReceiverId, myAds, setItemId, currentUser});

  const {
    getUserById,
    userInfo,
    updateTelegram,
  } = useUser({openLoading, closeLoading, openLoading, closeLoading, closeAllPopups, setPopupMessage, openSuccessfulActionPopup});

  const {
    getAllItems,
    deleteMyAd,
    getMyItems,
    getItemById, 
    startItemsSecondPage,
    itemsSecondPageSearch,
    handleAddAdSubmit,
    getItemsByCategoryId,
  } = useItem({
    openLoading, closeLoading, closeAllPopups, openSuccessfulActionPopup, userId, setPopupMessage, myAds, setMyAds,
  })

  const {
    resetAllfilters,
    handleGetItemsByFilter,
  } = useFilters({getAllItems,});



  const { 
    handleScroll,
    handleCategoryScroll,
  } = useScroll({ 
    getAllItems, getItemsByCategoryId
  });

  const {
    getCategory,
    categories,
    categoriesToRender,
    chooseCategory,
    adsCategoryName,
  } = useCategory({closeLoading, openLoading, });

  const {
    addToFavorites,
    deleteFromFavorites,
    getMyFavorites,
    resetFavorites,
  } = useItemFavorites(openLoading, closeLoading);

  const {
    createNewMessageFromConversationPopup,
    selectConversation,
    receiver_idForOneConversationPopup,
    sender_idForOneConversationPopup,
    item_idForOneConversationPopup,
    userNameForOneConversationPopup,
    itemTitleForOneConversationPopup,
    addNewMessage,
    getOneConversation,
    conversations,
    deleteOneMessage,
    markMessagesAsRead,
    getUnreadbleMessages,
    unreadbleMessages,
  } = useMessages(
    userId, {
      openLoading, closeLoading, closeAllPopups, setPopupMessage, openSuccessfulActionPopup, 
      setReceiverId, setItemId, setSuccessfulActionPopup, receiverId, itemId, setIsReserved,
    });

  const {
    sendVerificationCode,
    verifyCode,
    handleLogout,
    isEmailConfirmed,
    isVerificationCodeSent,
    isVerificationCodeSentMessage,
    handleLoginSubmit,
    handleRegSubmit,
    isRegError,
    updatePassword,
    isLoggin,
    isLoginError,

  } = useAuthActions({
    resetFavorites, openLoading, closeAllPopups, closeLoading, setSuccessfulActionPopup, setPopupMessage,
    getMyFavorites, getUnreadbleMessages, setMyAds, currentUser, setCurrentUser
  })

  const {
    updateDescription,
    updatePrice,
    updateItemCity,
    updateCondition,
    handleUpdateIsReserved,
  } = useItemUpdate(userId, {openLoading, closeLoading, closeAllPopups, setPopupMessage, openSuccessfulActionPopup, setIsReserved, isReserved,})

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    
    <LanguageProvider>
    <CurrentUserContext.Provider value={currentUser}>  
    <Header 
        isLoggin={isLoggin} 
        onAdPopup={handleChoiceOfProductOrServicePopupClick}
        unreadbleMessages={unreadbleMessages}
        getUnreadbleMessages={getUnreadbleMessages}
        onOpenBurgerMenuPopup={openBurgerMenuPopup}
    />

    <div className='App'>
    
      <Routes>
        <Route
          path="/signup"
          element={
        <Registration 
          onRegister={handleRegSubmit}
          isRegError={isRegError}
          isLoading={isLoading}
        />
        }>
        </Route>

        <Route
          path="/signup-first-stage"
          element={
        <RegistrationFirstStage
          onSendBtn={sendVerificationCode}
          isRegError={isRegError}
          isLoading={isLoading}
          isVerificationCodeSent={isVerificationCodeSent}
          isVerificationCodeSentMessage={isVerificationCodeSentMessage}
          verifyCode={verifyCode}
          isEmailConfirmed={isEmailConfirmed}
          onRegister={handleRegSubmit}
        />
        }>
        </Route>

        <Route
          path="/signin"
          element={
            <Login 
              onLogin={handleLoginSubmit}
              isLoginError={isLoginError}
              isLoading={isLoading}
            />
          }>
        </Route>

        <Route
          path="/recover-password"
          element={
            <RecoverPasswordPage onSendBtn={sendVerificationCode}/>
          }>
        </Route>

        <Route
          path="/password-recovery-code-request"
          element={
            <PasswordRecoveryCodeRequestPage   
              onSendBtn={sendVerificationCode}
              isRegError={isRegError}
              isLoading={isLoading}
              isVerificationCodeSent={isVerificationCodeSent}
              isVerificationCodeSentMessage={isVerificationCodeSentMessage}
              verifyCode={verifyCode}
              isEmailConfirmed={isEmailConfirmed}
              handleLogout={handleLogout}
              updatePassword={updatePassword}
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
              addToFavorites={addToFavorites}
              openDeletePopup={openDeletePopup}
              deleteFromFavorites={deleteFromFavorites}
              isLoggin={isLoggin}
              openFirstMessagePopup={openFirstMessagePopup}
              handleUpdateIsReserved={handleUpdateIsReserved}
              handleGetItemsByFilter={handleGetItemsByFilter}
              resetAllfilters={resetAllfilters}
              getAllItems={getAllItems}
              handleScroll={handleScroll}
              getCategory={getCategory}
              userId={userId} 
              getMyFavorites={getMyFavorites}
            />
          }
        />

        <Route 
          path='/category/*' 
          element={
            <CategoryPage 
              chooseCategory={chooseCategory}
              categoriesToRender={categoriesToRender}
              categories={categories}
              openDeletePopup={openDeletePopup}
              addToFavorites={addToFavorites}
              deleteFromFavorites={deleteFromFavorites}
              getItemById={getItemById}    
              itemsSecondPageSearch={itemsSecondPageSearch}
              isLoggin={isLoggin}
              openFirstMessagePopup={openFirstMessagePopup}
              handleUpdateIsReserved={handleUpdateIsReserved}
              adsCategoryName={adsCategoryName}
              getItemsByCategoryId={getItemsByCategoryId}
              handleCategoryScroll={handleCategoryScroll}
            />
          }
        />

        <Route 
          path='/items/:item_id' 
          element={
            <CardPage 
              getItemById={getItemById}
              getUserById={getUserById}
              userInfo={userInfo}
              addToFavorites={addToFavorites}
              deleteFromFavorites={deleteFromFavorites}
              isLoggin={isLoggin}
              openDeletePopup={openDeletePopup}
              openFirstMessagePopup={openFirstMessagePopup} 
              openEditPopup={openEditPopup}
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
                isLoading={isLoading}
                openLoading={openLoading}
                closeLoading={closeLoading}
              />
            </ProtectedRoute>
          }>
        </Route> 

        <Route
          path={`/add-new-service`}
          element={
            <ProtectedRoute isLoggin={isLoggin}>
              <AddServicesPage
                categories={categories}
                onAddAd={handleAddAdSubmit}
                isLoggin={isLoggin}
                isGood={isGood}
                isLoading={isLoading}
                openLoading={openLoading}
                closeLoading={closeLoading}
              />
            </ProtectedRoute>
          }>
        </Route>

        <Route
          exact path={`/users/${userId}`}
          element={
            <ProtectedRoute isLoggin={isLoggin}>
              <MyPage
                openEditPopup={openEditPopup}
                onAdPopup={handleChoiceOfProductOrServicePopupClick}
                getMyItems={getMyItems}
                myAds={myAds}
                openDeletePopup={openDeletePopup}
                
                isLoggin={isLoggin}
                getItemById={getItemById}
                addToFavorites={addToFavorites} 
                deleteFromFavorites={deleteFromFavorites}
                handleUpdateIsReserved={handleUpdateIsReserved}
                
              />
            </ProtectedRoute>
          }>
        </Route>  

        <Route 
          path={`/users/:userId/messages`}
          element={
            <ProtectedRoute isLoggin={isLoggin}>
              <MyMessages
                getOneConversation={getOneConversation}
                markMessagesAsRead={markMessagesAsRead}
                onConversation={selectConversation}
              />
            </ProtectedRoute>
          }>  
        </Route>

        <Route 
          path={`/users/conversation-page/:conversation_id`}
          element={
            <ProtectedRoute isLoggin={isLoggin}>
              <ConversationPage
                getOneConversation={getOneConversation}
                receiver_id={receiver_idForOneConversationPopup}
                sender_id={sender_idForOneConversationPopup}
                item_id={item_idForOneConversationPopup}
                openDeletePopup={openDeletePopup}
                conversations={conversations}
                userName={userNameForOneConversationPopup}
                itemTitle={itemTitleForOneConversationPopup}
                createNewMessage={createNewMessageFromConversationPopup}
                deleteOneMessage={deleteOneMessage}
                handleUpdateIsReserved={handleUpdateIsReserved}
                isReserved={isReserved}
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
            
             
              openFirstMessagePopup={openFirstMessagePopup}
          />
          }>
        </Route>

        <Route
          exact path={`/my_favorites`}
          element={
            <ProtectedRoute isLoggin={isLoggin}>
              <MyFavoritesPage 
                getMyFavorites={getMyFavorites}
                deleteFromFavorites={deleteFromFavorites}
                
              />
            </ProtectedRoute>
          }>
        </Route> 

        <Route 
          path={`/publication-rules`}
          element={
            <RulesPublicationsPage />
          }>
        </Route>

        <Route 
          path={`/admin`}
          element={
            <AdminPage />
          }>
        </Route>

        <Route 
          path={`/category-admin`}
          element={
            <ChangeCategoryPage/>
          }>
        </Route>

        <Route 
          path={`/clients-admin`}
          element={
            <ClientsAdminPage/>
          }>
        </Route>

        <Route 
          path={`/listings-admin`}
          element={
            <ListingsAdminPage/>
          }>
        </Route>

        <Route 
          path={`/add-new-ads-as-admin`}
          element={
            <ModerationAdminPage/>
          }>
        </Route>

        <Route
          path="*"
          element={
            <NotFoundPage />
          }>
        </Route>

        <Route
          path={`/not-ready-page`}
          element={
            <NotReadyPage />
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

      <BurgerMenuPopup 
        isOpen={isBurgerMenuPopup}
        onClose={closeAllPopups}
        isLoggin={isLoggin}
        getUnreadbleMessages={getUnreadbleMessages}
        unreadbleMessages={unreadbleMessages}
        onAdPopup={handleChoiceOfProductOrServicePopupClick}
      />        

      <FirstMessagePopup 
        isOpen={isFirstMessagePopup}
        onClose={closeAllPopups}
        createNewMessage={addNewMessage}
      />

      <EditPopup
        isOpen={isEditPopup}
        onClose={closeAllPopups}
        title={editPopupName}
        updateItemCity={updateItemCity}
        updatePrice={updatePrice}
        updateDescription={updateDescription}
        updateCondition={updateCondition}
        popupEditItemId={popupEditItemId}
        updateTelegram={updateTelegram}
      />

      <AreYouSurePopup
        isOpen={isDeletePopup}
        onClose={closeAllPopups}
        deleteMyAd={deleteMyAd}
        itemIdDelete={itemIdDelete}
      />

      <Preloader 
        isLoading={isLoading}
      />
    </div>
    <Footer handleLogout={handleLogout} isLoggin={isLoggin}></Footer>
    </CurrentUserContext.Provider>  
    </LanguageProvider>
    
  );
}

export default App;
