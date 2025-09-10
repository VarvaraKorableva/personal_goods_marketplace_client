import useItem from "./hooks/items/useItem"
import useItemUpdate from "./hooks/items/useItemUpdate"
import useItemFavorites from "./hooks/items/useItemFavorites";
import useAuthActions from "./hooks/useAuthActions";
import useMessages from "./hooks/useMessages";
import useCategory from "./hooks/category/useCategory"
import usePopup from "./hooks/popups/usePopups"

import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import {CurrentUserContext} from './contexts/CurrentUserContext'
import { LanguageProvider } from './contexts/TranslationContext';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import * as Api from './Api/Api'
import Registration from './Components/Registration/Registration'
import RegistrationFirstStage from './Components/Registration/RegistrationFirstStage'
import Login from './Components/Login/Login'
import Header from './Components/Header/Header'
import Main from './Components/Main/Main'
import Footer from './Components/Footer/Footer'
import MyPage from './Components/MyPage/MyPage'
import MyMessages from './Components/MyPage/MyMessages/MyMessages'
//import OneMessagePage from './Components/MyPage/MyMessages/OneMessagePage'
import CategoryPage from './Components/Main/CategoryPage/CategoryPage'
import RulesPublicationsPage from './Pages/RulesPublicationsPage/RulesPublicationsPage'
import Preloader from './Components/Preloader/Preloader'

import './App.css'
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

function App() {
  const [isLoggin, setIsLoggin] = React.useState(localStorage.getItem('user') == null ? false : true)
  const [currentUser, setCurrentUser] = React.useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {})

  const [itemIdDelete, setItemIdDelete] = React.useState(0)
  
  const [myAds, setMyAds] = React.useState([])
  const [myImages, setMyImages] = React.useState([])

  const [lastFourtyItems, setLastFoutryItems] = React.useState([])
  const [totalCountOfAds, setTotalCountOfAds] = React.useState(0)

  const [itemsAfterSearch, setItemsAfterSearch] = React.useState([])

  const [selectedItem, setSelectedItem] = React.useState([])
  const [userInfo, setUserInfo] = React.useState([])
  
  const [isGood, setIsGood] = React.useState(true)
  const [isLoginError, setIsLoginError] = React.useState(false)


  const [page, setPage] = React.useState(1);
  const [isPageItemsLoading, setIsPageItemsLoading] = React.useState(false);

  //for messages 
  const [receiverId, setReceiverId] = React.useState('')
  const [itemId, setItemId] = React.useState('')

  //filter query
  const [city, setCity] = React.useState('') 
  const [lowPrice, setLowPrice] = React.useState(0) 
  const [highPrice, setHighPrice] = React.useState(0) 
  const [condition, setCondition] = React.useState('') 
  const [title, setTitle] = React.useState('') 

  const [isReserved, setIsReserved] = React.useState(false)

  const [unreadbleMessages, setUnreadbleMessages]= React.useState([])

  const [isLoading, setIsLoading] = React.useState(false) 

  const [limit, setLimit] = React.useState(3)

  const addAds = () => setLimit(limit + 3);
  const userId = currentUser.user_id

  const navigate = useNavigate()
  const location = useLocation();
  

  function openLoading() {
    setIsLoading(true)
  }

  function closeLoading() {
    setIsLoading(false)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleScroll = () => {
    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
  
    if (bottom && !isPageItemsLoading && lastFourtyItems.length < totalCountOfAds) {
      setIsPageItemsLoading(true);
      setPage(prevPage => prevPage + 1);
    }
  };
  
  const handleTouchScroll = () => {
    handleScroll();
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchmove', handleTouchScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleTouchScroll);
    };
  }, [isPageItemsLoading, lastFourtyItems, totalCountOfAds]);

  async function getItemsByCategoryCategoryId(category_id) {
    openLoading()
    try {
      const res = await Api.getItemsByCategory(category_id)
      setStartItemsSecondPage(res)
      setItemsSecondPageSearch(res)
      closeLoading()
    } catch (err) {
      console.log(err);
      closeLoading()
    }
  }

  React.useEffect(()=>{
    getCategory()
    getAllItems()
    //getUnreadbleMessages(userId)
  },[])

  function getUserById(user_id) {
    openLoading()
    Api.getUserById(user_id)
    .then((res) => {
      setUserInfo(res)
      closeLoading()
    })
    .catch((err) => {
      console.log(err)
      closeLoading()
    })
  }
  //don't need anymore
  /*
  function startToSearch(keyWord) {
    const keywordLowerCase = keyWord.toLowerCase()
    setItemsAfterSearch(lastFourtyItems.filter((item) => item.title.toLowerCase().includes(keywordLowerCase)))
  }*/

  function startToSearchSecondPage (keyWord) {
    const keywordLowerCase = keyWord.toLowerCase()
    setItemsSecondPageSearch(startItemsSecondPage.filter((item) => item.title.toLowerCase().includes(keywordLowerCase)))
  }

  function handleAddAdClick(data){
    setIsGood(data)

    data?
    navigate(`/add-ad`) 
    :
    navigate(`/add-new-service`)
    
    closeAllPopups()
  }

  function handleTitleChange(keyWord) {
    setTitle(keyWord)
  }

  function handleCityPriceAndConditionChange(cityFromInput, lowPriceFromInput, highPriceFromInput, conditionFromInput) {
    setCity(cityFromInput)
    setLowPrice(lowPriceFromInput)
    setHighPrice(highPriceFromInput)
    setCondition(conditionFromInput)
  }

  function resetAllfilters() {
    setCity('')
    setLowPrice(0)
    setHighPrice(0)
    setCondition('')
  }

  function handleGetItemsByFilter() {
    openLoading()
    const filters = {
      city: city,
      lowPrice: lowPrice,
      highPrice: highPrice,
      condition: condition,
      title: title,
    };

    Api.getItemsByFilter(filters)
    .then((res) => {
      setItemsAfterSearch(res)
      closeLoading()
    })
    .catch((err) => {
      closeLoading()
      setPopupMessage("Something wrong, plese try again")
      openSuccessfulActionPopup()
    })
  }

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
    isOneConversationPopup,
    isBurgerMenuPopup,
    editPopupName,
    popupEditItemId,
    setPopupMessage,
    setSuccessfulActionPopup,
  } = usePopup({setReceiverId, myAds, setItemId, setItemIdDelete});

  const {
    getAllItems,
    deleteMyAd,
    getMyItems,
    getItemById,
    getItemsByParentId,
    startItemsSecondPage,
    itemsSecondPageSearch,
    setItemsSecondPageSearch,
    setStartItemsSecondPage,
    handleAddAdSubmit,
  } = useItem({
    setItemsAfterSearch, setLastFoutryItems, setItemsAfterSearch, openLoading, 
    closeLoading, closeAllPopups, setTotalCountOfAds, setIsPageItemsLoading, setSelectedItem, 
    setIsLoading, setMyImages, openSuccessfulActionPopup, userId, myImages, setPopupMessage, myAds, setMyAds,
  })

  const {
    getCategory,
    categories,
    categoriesToRender,
    chooseCategory,
    adsCategoryName,
  } = useCategory({closeLoading, openLoading, });

  const {
    favorite,
    favoriteItems,
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
  } = useAuthActions({
    setIsLoggin, setCurrentUser, resetFavorites, openLoading, closeAllPopups, closeLoading, setSuccessfulActionPopup, setPopupMessage,
    setIsLoginError, getMyFavorites, getUnreadbleMessages, lastFourtyItems, setMyAds,
  })

  const {
    updateDescription,
    updatePrice,
    updateItemCity,
    updateCondition,
    handleUpdateIsReserved,
  } = useItemUpdate(userId, {openLoading, closeLoading, closeAllPopups, setPopupMessage, openSuccessfulActionPopup, setIsReserved, isReserved,})

  useEffect(() => {
    getMyFavorites(userId,lastFourtyItems)
  }, []);
  
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
              lastFourtyItems={lastFourtyItems} //Need, because of search
              totalCountOfAds={totalCountOfAds}
              addToFavorites={addToFavorites}
              openDeletePopup={openDeletePopup}
              deleteFromFavorites={deleteFromFavorites}
              favorite={favorite}
              favoriteItems={favoriteItems}
              itemsAfterSearch={itemsAfterSearch}
              isLoggin={isLoggin}
              openFirstMessagePopup={openFirstMessagePopup}
              getItemsByCategoryCategoryId={getItemsByCategoryCategoryId}
              getItemsByParentId={getItemsByParentId}
              handleUpdateIsReserved={handleUpdateIsReserved}
              handleGetItemsByFilter={handleGetItemsByFilter}
              handleTitleChange={handleTitleChange}
              handleCityPriceAndConditionChange={handleCityPriceAndConditionChange}
              resetAllfilters={resetAllfilters}
              getAllItems={getAllItems}
              page={page}
              isPageItemsLoading={isPageItemsLoading}
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
              openDeletePopup={openDeletePopup}
              addToFavorites={addToFavorites}
              deleteFromFavorites={deleteFromFavorites}
              getItemById={getItemById} 
              lastFourtyItems={lastFourtyItems}
              itemsSecondPageSearch={itemsSecondPageSearch}
              startToSearchSecondPage={startToSearchSecondPage}
              isLoggin={isLoggin}
              favorite={favorite}
              favoriteItems={favoriteItems}
              getItemsByCategoryCategoryId={getItemsByCategoryCategoryId}
              getItemsByParentId={getItemsByParentId}
              openFirstMessagePopup={openFirstMessagePopup}
              handleUpdateIsReserved={handleUpdateIsReserved}
              adsCategoryName={adsCategoryName}
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
                onAdPopup={handleChoiceOfProductOrServicePopupClick}
                getMyItems={getMyItems}
                myAds={myAds}
                openDeletePopup={openDeletePopup}
                handleLogout={handleLogout}
                isLoggin={isLoggin}
                getItemById={getItemById}
                addToFavorites={addToFavorites} 
                deleteFromFavorites={deleteFromFavorites}
                favorite={favorite}
                favoriteItems={favoriteItems}
                limit={limit}
                addAds={addAds}
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
              favoriteItems={favoriteItems}
              favorite={favorite}
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
                favorite={favorite}
                lastFourtyItems={lastFourtyItems}
                favoriteItems={favoriteItems}
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
    <Footer handleLogout={handleLogout}></Footer>
    </CurrentUserContext.Provider>  
    </LanguageProvider>
  );
}

export default App;
