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
import MyMessages from './Components/MyPage/MyMessages/MyMessages'
//import OneMessagePage from './Components/MyPage/MyMessages/OneMessagePage'
import CategoryPage from './Components/Main/CategoryPage/CategoryPage'
import Preloader from './Components/Preloader/Preloader'

import './App.css'

import AddAdPage from './Components/AddAdPage/AddAdPage'
import NotFoundPage from './Components/NotFoundPage/NotFoundPage'
import MyFavoritesPage from './Components/MyFavoritesPage/MyFavoritesPage'
import UserPage from './Components/UserPage/UserPage'
import CardPage from './Components/CardPage/CardPage'
import ChoiceOfProductOrServicePopup from './Components/Popups/ChoiceOfProductOrServicePopup/ChoiceOfProductOrServicePopup'
import SuccessfulActionPopup from './Components/Popups/SuccessfulActionPopup/SuccessfulActionPopup'
import OneConversationPopup from './Components/Popups/OneConversationPopup/OneConversationPopup'
import FirstMessagePopup from './Components/Popups/FirstMessagePopup/FirstMessagePopup'
import BurgerMenuPopup from './Components/Popups/BurgerMenuPopup/BurgerMenuPopup'
import AddServicesPage from './Components/AddServicesPage/AddServicesPage'

function App() {
  const [isLoggin, setIsLoggin] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState({})

  const [isChoiceOfProductOrServicePopup, setIsChoiceOfProductOrServicePopup] = React.useState(false)
  const [isSuccessfulActionPopup, setSuccessfulActionPopup] = React.useState(false)
  const [isFirstMessagePopup, setIsFirstMessagePopup] = React.useState(false)
  const [popupMessage, setPopupMessage] = React.useState('')
  const [isOneConversationPopup, setIsOneConversationPopup] = React.useState(false)
  const [isBurgerMenuPopup, setIsBurgerMenuPopup] = React.useState(false)
  
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

  //for messages 
  const [receiverId, setReceiverId] = React.useState('')
  const [itemId, setItemId] = React.useState('')

  const [coversations, setCoversations] = React.useState([])
  const [userNameForOneConversationPopup, setUserNameForOneConversationPopup] = React.useState({})
  
  
  const [receiver_idForOneConversationPopup, setReceiver_idForOneConversationPopup] = React.useState('')
  const [sender_idForOneConversationPopup, setSender_idForOneConversationPopup] = React.useState('')
  const [item_idForOneConversationPopup, setItem_idForOneConversationPopup] = React.useState('')

  const [unreadbleMessages, setUnreadbleMessages]= React.useState([])

  const [isLoading, setIsLoading] = React.useState(false) 

  const [limit, setLimit] = React.useState(3)

  const addAds = () => setLimit(limit + 3);
  //const hideAds = () => setLimit(3);
  const userId = currentUser.user_id
  const adСount = currentUser.ad_count

  const navigate = useNavigate()

  async function getCategory() {
    openLoading()
    try {
      const res = await Api.getCategory();
      setCategories(res);
      setCategoriesToRender(res);
      closeLoading()
    } catch (err) {
      console.log(err);
      closeLoading()
    }

  }

  async function getAllItems() {
    openLoading()
    try {
      const res = await Api.getAllItems();
      setLastFoutryItems(res)
      setItemsAfterSearch(res) 
      closeLoading() 
    } catch (err) {
      console.log(err);
      closeLoading()
    }
  }

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

  async function getItemsByParentId(parent_id) {
    openLoading()
    try {
      const res = await Api.getItemsBySubCategoriesByParentId(parent_id)
      setStartItemsSecondPage(res)
      setItemsSecondPageSearch(res)
      closeLoading()
    } catch (err) {
      console.log(err);
      closeLoading()
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
    getAllItems()
    //getUnreadbleMessages(userId)
  },[])


  function chooseCategory(category) {
      setCategoriesToRender(categories.filter((item) => item.parent_id === category.category_id)) 
      let myCatToRender = []
      findAllCategoryGrandChildren(category, myCatToRender) 
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
    openLoading()
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
      closeLoading()
    })  
    .catch((err) => {
      if(err == 400) {
        setIsRegError(true)
        closeLoading()
      }
    })
  }

  function handleLoginSubmit(userData){
    openLoading()
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
      getUnreadbleMessages(res.user.user_id)
      closeLoading()
    })  
    .catch((err) => {
      closeLoading()
      if(err == 401) {
        setIsLoginError(true)
        setTimeout(function(){
          setIsLoginError(false)
        }, 3000)
      }
    })
  }

  function getMyItems(owner_id) {
    openLoading()
    Api.getUserItems(owner_id)
    .then((res) => {
      setMyAds(res)
      closeLoading()
    })
    .catch((err) => {
      console.log(err)
      closeLoading()
    })
  }

  function handleAddAdSubmit(data) {
    openLoading()
    adCountIncrement(userId)
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
          closeLoading()
        })
        .then(()=> {
          getAllItems()
          getAllImagesForItems()
        })
        .catch((err)=> {
          console.log(err)
          closeAllPopups()
          setPopupMessage("Something wrong, plese try again")
          openSuccessfulActionPopup()
          closeLoading()
        })
      }else {
          closeAllPopups()
          setPopupMessage("Ad added successful!")
          setMyAds([res, ...myAds])
          openSuccessfulActionPopup()
          closeLoading()
      }
    })
    .catch((err)=> {
      closeAllPopups()
      setPopupMessage("Something wrong, please try again")
      openSuccessfulActionPopup()
      closeLoading()
    })
  }


//adCountIincrement
//adCountDecrement

function adCountIncrement(userId) {
  Api.adCountIncrement(userId)
  .then((res)=> {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
}

function adCountDecrement(userId) {
  Api.adCountDecrement(userId)
  .then((res)=> {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
}

  function getItemById(item_id) {
    openLoading()
    Api.getItemById(item_id)
    .then((res)=> {
      setSelectedItem(res)
      setIsLoading(false)
      closeLoading()
    })
    .catch((err) => {
      console.log(err)
      closeLoading()
    })
  }

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

  function deleteMyAd(item_id) {
    openLoading()
    Api.deleteItem(item_id)
    .then((res) => {
      setMyAds((state) => state.filter((item) => item.item_id !== item_id))
      setLastFoutryItems((state) => state.filter((item) => item.item_id !== item_id))
      setItemsAfterSearch((state) => state.filter((item) => item.item_id !== item_id))
      setItemsSecondPageSearch((state) => state.filter((item) => item.item_id !== item_id))
      adCountDecrement(userId)
      closeLoading()
    })
    .catch((err) => {
      console.log(err)
      closeLoading()
    })
  }

  function addToFavorites(favorite_collector_id, item_id, item) {
    openLoading()
    Api.addToFavoritesServer({ favorite_collector_id, item_id })
      .then((res) => {
        setFovorite([res, ...favorite])
        setFavoriteItems([item, ...favoriteItems]);
        closeLoading()
      })
    .catch((err) => {
      console.log(err)
      closeLoading()
    })
  }
 
  function deleteFromFavorites(favItem) {
    openLoading()
    Api.deleteFromFavoritesServer(favItem.item_id)
      .then((res) => {
        setFovorite((state) => 
          state.filter((item) => 
          item.item_id !== favItem.item_id)
          
        )
        setFavoriteItems((state) => state.filter((item) => item.item_id !== favItem.item_id));
        closeLoading()
      })
      .catch((err) => {
        console.log(err)
        closeLoading()
      })
  }

  function getMyFavorites(favorite_collector_id) {
    openLoading()
    Api.getMyFavorites(favorite_collector_id)
    .then((res) => {
      setFovorite(res)
      const favoriteItemsResult = lastFourtyItems.filter(item =>
      res.some(favoriteItem => favoriteItem.item_id === item.item_id)
      );
      setFavoriteItems(favoriteItemsResult);
      closeLoading()
    })
    .catch((err) => {
      console.log(err)
      closeLoading()
    })
  }

  //createMessage
  function addNewMessage(message_text) {
    openLoading()
    Api.addMessage({receiver_id: receiverId, sender_id: userId, item_id: itemId, message_text}) 
    .then((res) => {
      closeAllPopups()
      setCoversations([res, ...coversations])
      setReceiverId('')
      setItemId('')
      closeLoading()
      setSuccessfulActionPopup(true)
      setPopupMessage('Сообщение отправлено')

    })
    .catch((err) => {
      console.log(err)
      closeLoading()
      closeAllPopups()
      setSuccessfulActionPopup(true)
      setPopupMessage('Что-то пошло не так :(')
    })
  }

  function createNewMessageFromConversationPopup(receiver_id, item_id, message_text) {
    openLoading()
    Api.addMessage({receiver_id, sender_id: userId, item_id, message_text}) 
    .then((res) => {
      //setCoversations([res, ...coversations])
      //setCoversations([...coversations, res]);
      getOneConversation(receiver_id, userId, item_id)
      closeLoading()
    })
    .catch((err) => {
      console.log(err)
      closeLoading()
    })
  }

  function getOneConversation(r_id, s_id, i_id) {
    openLoading()
    Api.getOneConversation(r_id, s_id, i_id, userId)
    .then((res) => {
      setCoversations(res.messages)
      setUserNameForOneConversationPopup(res.user.username)
      closeLoading()
    })
    .catch((err) => {
      console.log(err)
      closeLoading()
    })
  }

  function deleteOneMessage(message_id) {
    openLoading()
    Api.deleteMessage(message_id)
    .then((res) => {
      setCoversations((state) => state.filter((item) => item.message_id !== message_id))
      closeLoading()
    })
    .catch((err) => {
      console.log(err)
      closeLoading()
    })
  }

  function markMessagesAsRead( r_id, s_id, i_id ) {
    Api.markMessagesAsRead(r_id, s_id, i_id, userId)
    .then((res) => {
      getUnreadbleMessages(userId)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function getUnreadbleMessages(userId) {
    Api.getUnreadbleMessages(userId)
    .then((res) => {
      setUnreadbleMessages(res)
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

  //setIsLoading(false)

  function openLoading() {
    setIsLoading(true)
  }

  function closeLoading() {
    setIsLoading(false)
  }

  function openSuccessfulActionPopup() {
    setSuccessfulActionPopup(true)
  }

  function openOneConversationPopup(r_id, s_id, i_id) {
    setIsOneConversationPopup(true)

    setReceiver_idForOneConversationPopup(r_id)
    setSender_idForOneConversationPopup(s_id) 
    setItem_idForOneConversationPopup(i_id)
  }

  function openFirstMessagePopup(receiver_id, item_id) {
    setIsFirstMessagePopup(true)
    setReceiverId(receiver_id) 
    setItemId(item_id)
  }

  function openBurgerMenuPopup() {
    setIsBurgerMenuPopup(true)
  }

  function handleAddAdClick(data){
    setIsGood(data)

    data?
    navigate(`/add-ad`) 
    :
    navigate(`/add-new-service`)
    
    closeAllPopups()
  }

  function handleChoiceOfProductOrServicePopupClick(){
    if (adСount >= 3) {
      setSuccessfulActionPopup(true)
      setPopupMessage(`Можно добавлять не более 3 объявлений, у вас добавлено ${adСount}`)
      console.log(adСount)
    } else {
      setIsChoiceOfProductOrServicePopup(true)
      console.log(currentUser)
    }
  }

  function closeAllPopups() {
    setIsChoiceOfProductOrServicePopup(false)
    setSuccessfulActionPopup(false)
    setIsFirstMessagePopup(false)
    setPopupMessage("")
    setIsOneConversationPopup(false)
    setIsBurgerMenuPopup(false)
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
      <Header 
        isLoggin={isLoggin} 
        onAdPopup={handleChoiceOfProductOrServicePopupClick}
        unreadbleMessages={unreadbleMessages}
        getUnreadbleMessages={getUnreadbleMessages}
        onOpenBurgerMenuPopup={openBurgerMenuPopup}
      />

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
              openFirstMessagePopup={openFirstMessagePopup}


              getItemsByCategoryCategoryId={getItemsByCategoryCategoryId}
              getItemsByParentId={getItemsByParentId}
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
              getItemsByCategoryCategoryId={getItemsByCategoryCategoryId}
              getItemsByParentId={getItemsByParentId}

              openFirstMessagePopup={openFirstMessagePopup}
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

              openFirstMessagePopup={openFirstMessagePopup}
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
          path={`/users/:userId/messages`}
          element={
            <ProtectedRoute isLoggin={isLoggin}>
              <MyMessages
                getOneConversation={getOneConversation}
                openOneConversationPopup={openOneConversationPopup}
                markMessagesAsRead={markMessagesAsRead}
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

      <OneConversationPopup
        isOpen={isOneConversationPopup}
        onClose={closeAllPopups}
        getOneConversation={getOneConversation}
        receiver_id={receiver_idForOneConversationPopup}
        sender_id={sender_idForOneConversationPopup}
        item_id={item_idForOneConversationPopup}
        
        coversations={coversations}
        userName={userNameForOneConversationPopup}

        createNewMessage={createNewMessageFromConversationPopup}
        deleteOneMessage={deleteOneMessage}
      />

      <Preloader 
        isLoading={isLoading}
      />

      <Footer handleLogout={handleLogout}></Footer>

    </div>
    </CurrentUserContext.Provider>  
    </LanguageProvider>
  );
}

export default App;
