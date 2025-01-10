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
  const [isChoiceOfProductOrServicePopup, setIsChoiceOfProductOrServicePopup] = React.useState(false)
  const [isSuccessfulActionPopup, setSuccessfulActionPopup] = React.useState(false)
  const [isFirstMessagePopup, setIsFirstMessagePopup] = React.useState(false)
  const [isEditPopup, setIsEditPopup] = React.useState(false)
  const [isDeletePopup, setIsDeletePopup] = React.useState(false)
  const [itemIdDelete, setItemIdDelete] = React.useState(0)
  
  const [popupMessage, setPopupMessage] = React.useState('')
  const [isOneConversationPopup, setIsOneConversationPopup] = React.useState(false)
  const [isBurgerMenuPopup, setIsBurgerMenuPopup] = React.useState(false)
  
  const [myAds, setMyAds] = React.useState([])
  const [categories, setCategories] = React.useState([])
  
  const [myImages, setMyImages] = React.useState([])

  const [categoriesToRender, setCategoriesToRender] = React.useState([])

  const [lastFourtyItems, setLastFoutryItems] = React.useState([])
  const [totalCountOfAds, setTotalCountOfAds] = React.useState(0)

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

  const [page, setPage] = React.useState(1);
  const [isPageItemsLoading, setIsPageItemsLoading] = React.useState(false);

  //for messages 
  const [receiverId, setReceiverId] = React.useState('')
  const [itemId, setItemId] = React.useState('')

  const [coversations, setCoversations] = React.useState([])

  //popups
  const [userNameForOneConversationPopup, setUserNameForOneConversationPopup] = React.useState({})
  const [itemTitleForOneConversationPopup, setItemTitleForOneConversationPopup] = React.useState({})
  const [receiver_idForOneConversationPopup, setReceiver_idForOneConversationPopup] = React.useState('')
  const [sender_idForOneConversationPopup, setSender_idForOneConversationPopup] = React.useState('')
  const [item_idForOneConversationPopup, setItem_idForOneConversationPopup] = React.useState('')

  //filter query
  const [city, setCity] = React.useState('') 
  const [lowPrice, setLowPrice] = React.useState(0) 
  const [highPrice, setHighPrice] = React.useState(0) 
  const [condition, setCondition] = React.useState('') 
  const [title, setTitle] = React.useState('') 

  //title and itemId for edit popup
  const [editPopupName, setEditPopupName] = React.useState('') 
  const [popupEditItemId, setPopupEditItemId] = React.useState(0) 

  const [isReserved, setIsReserved] = React.useState(false)

  const [adCount, setAdCount] = React.useState(0) //count of ads for regulations adding

  const [unreadbleMessages, setUnreadbleMessages]= React.useState([])

  const [isLoading, setIsLoading] = React.useState(false) 

  const [isVerificationCodeSent, setIsVerificationCodeSent] = React.useState(false) 
  const [isVerificationCodeSentMessage, setIsVerificationCodeSentMessage] = React.useState('') 

  const [adsCategoryName, setAdsCategoryName] = React.useState('') 

  const [isEmailConfirmed, setIsEmailConfirmed] = React.useState(false) ///использовать при разверешии или нет для перехода на страницу регистрации

  const [limit, setLimit] = React.useState(3)

  const addAds = () => setLimit(limit + 3);
  const userId = currentUser.user_id
  useEffect(() => {
    currentUser?
      setAdCount(currentUser.ad_count)
    :
      setAdCount(0)
  }, [userId])
  
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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
  async function getAllItems(page = 1, limit = 20) {
    openLoading();
    try {
      const res = await Api.getAllItems({ page, limit });
      if(page == 1) {
        setTotalCountOfAds(res.totalCount);
        setLastFoutryItems(res.result);
        setItemsAfterSearch(res.result)
      }
      else {
        setLastFoutryItems(prevItems => [...prevItems, ...res.result]);
        setItemsAfterSearch(prevItems => [...prevItems, ...res.result]);
      }
      closeLoading();
      setIsPageItemsLoading(false)
      window.dispatchEvent(new Event('resize'));
    } catch (err) {
      console.log(err);
      closeLoading();
    }
  }

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

  React.useEffect(()=>{
    getCategory()
    getAllItems()
    //getUnreadbleMessages(userId)
  },[])
  
  function chooseCategory(category) {
      setCategoriesToRender(categories.filter((item) => item.parent_id === category.category_id)) 
      let myCatToRender = []
      findAllCategoryGrandChildren(category, myCatToRender) 
      setAdsCategoryName(category.name_rus)
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
      
      localStorage.setItem('user', JSON.stringify(data.user))
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
      
      localStorage.setItem('user', JSON.stringify(res.user))
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
        formData.append('user_id', userId); 
        Api.uploadMultipleFiles(formData)
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
          navigate(`/users/${userId}`)
        })
        .catch((err)=> {
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
          navigate(`/users/${userId}`)
      }
    })
    .catch((err)=> {
      closeAllPopups()
      setPopupMessage("Something wrong, please try again")
      openSuccessfulActionPopup()
      closeLoading()
    })
  }

function adCountIncrement(userId) {
  Api.adCountIncrement(userId)
  .then((res)=> {
    setAdCount(res);
  })
  .catch((err) => {
    console.log(err)
  })
}

function adCountDecrement(userId) {
  Api.adCountDecrement(userId)
  .then((res)=> {
    setAdCount(res)
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
      closeAllPopups()
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
        setFovorite([item, ...favoriteItems])
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
      res.some(favoriteItem => favoriteItem.item_id === item.item_id) ////из всего всего аррея ищится избранное а в аррее нет тех кто делитед тру
      );
      setFavoriteItems(res);
      closeLoading()
    })
    .catch((err) => {
      console.log(err)
      closeLoading()
    })
  }
  //sendVerificationCode verifyCode
  function verifyCode(email, code) {
    openLoading()
    Api.verifyCode(email, code) 
    
    .then((res) => {
      if(res.msg === "Error verifying code." || res.msg === "Invalid or expired verification code."){
        closeLoading()
        closeAllPopups()
        setIsVerificationCodeSent(true)
        setIsVerificationCodeSentMessage('Неверный или истекший код, попробуйте снова')
        setIsEmailConfirmed(false)
      }
      if(res.msg === "Code verified. You can now complete registration.") {
        closeAllPopups()
        closeLoading()
        setIsVerificationCodeSent(false)
        setIsVerificationCodeSentMessage('')
        setIsEmailConfirmed(true)
      }
    })
    .catch((err) => {
      console.log(err)
      closeLoading()
      closeAllPopups()
      setIsVerificationCodeSent(false)
      setSuccessfulActionPopup(true)
      setPopupMessage('Что-то пошло не так :(')
    })
  }

  function sendVerificationCode(email) {
    openLoading()
    Api.sendVerificationCode(email) 
    .then((res) => {
      closeAllPopups()
      closeLoading()
      setIsVerificationCodeSent(true)
      //setIsVerificationCodeSentMessage("Код отправлен на почту")
    })
    .catch((err) => {
      console.log(err)
      closeLoading()
      closeAllPopups()
      setIsVerificationCodeSent(false)
    })
  }

  //createMessage create conversation and create first message popup
  function addNewMessage(message_text) {
    openLoading()
    Api.createConversation({conversation_owner_id: userId, item_owner_id: receiverId, item_id: itemId}) 
      .then((res)=> {
        
        Api.addMessage({receiver_id: receiverId, sender_id: userId, item_id: itemId, message_text, conversation_id: res.conversation_id}) 
        .then((res) => {
          
          closeAllPopups()
          //setCoversations([res, ...coversations])
          setReceiverId('')
          setItemId('')
          closeLoading()
          setSuccessfulActionPopup(true)
          setPopupMessage('Сообщение отправлено')
        })
        .catch((err) => {
          closeLoading()
          closeAllPopups()
          setSuccessfulActionPopup(true)
          setPopupMessage('Что-то пошло не так :(')
        })
      })
    .catch((err) => {
      closeLoading()
      closeAllPopups()
      setSuccessfulActionPopup(true)
      setPopupMessage('Что-то пошло не так :(')
    })
  }
// create message from page
  function createNewMessageFromConversationPopup(receiver_id, item_id, message_text, conversation_id) {
    openLoading()
    Api.addMessage({receiver_id, sender_id: userId, item_id, message_text, conversation_id}) 
    .then((res) => {
      getOneConversation(receiver_id, userId, item_id)
      closeLoading()
    })
    .catch((err) => {
      console.log(err)
      closeLoading()
      closeAllPopups()
      setPopupMessage("Something wrong, plese try again")
      openSuccessfulActionPopup()
    })
  }

  function getOneConversation(r_id, s_id, i_id) {
    openLoading()
    Api.getOneConversation(r_id, s_id, i_id, userId)
    .then((res) => {
      setCoversations(res.messages)
      setUserNameForOneConversationPopup(res)//.user.username
      setItemTitleForOneConversationPopup(res.item)
      setIsReserved(res.item.reserved)
      closeLoading()
    })
    .catch((err) => {
      console.log(err)
      closeLoading()
      closeAllPopups()
      setPopupMessage("Something wrong, plese try again")
      openSuccessfulActionPopup()
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
      closeAllPopups()
      setPopupMessage("Something wrong, plese try again")
      openSuccessfulActionPopup()
    })
  }

  function markMessagesAsRead( conversation_id ) {
    Api.markMessagesAsRead(conversation_id, userId)
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

  function openLoading() {
    setIsLoading(true)
  }

  function closeLoading() {
    setIsLoading(false)
  }

  function openSuccessfulActionPopup() {
    setSuccessfulActionPopup(true)
  }

//onConversation
  function selectConversation(r_id, s_id, i_id) {
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

  function openEditPopup(popup_item_id, popupName) {
    setEditPopupName(popupName)
    setPopupEditItemId(popup_item_id)
    setIsEditPopup(true)
  }

  function openDeletePopup(item_id) {
    setIsDeletePopup(true)
    setItemIdDelete(item_id)
  }

  function handleAddAdClick(data){
    setIsGood(data)

    data?
    navigate(`/add-ad`) 
    :
    navigate(`/add-new-service`)
    
    closeAllPopups()
  }

  function handleChoiceOfProductOrServicePopupClick() {
    if (adCount >= 20) {
      setSuccessfulActionPopup(true)
      setPopupMessage(`Можно добавлять не более 3 объявлений, у вас добавлено ${adCount}`)
    } else {
      setIsChoiceOfProductOrServicePopup(true)
    }
  }

  function closeAllPopups() {
    setIsChoiceOfProductOrServicePopup(false)
    setSuccessfulActionPopup(false)
    setIsFirstMessagePopup(false)
    setPopupMessage("")
    setIsOneConversationPopup(false)
    setIsBurgerMenuPopup(false)
    setIsEditPopup(false)
    setIsDeletePopup(false)
  }

  function handleLogout() {
      setIsLoggin(false)
      localStorage.removeItem('isLogin')
      localStorage.removeItem('user')
      setCurrentUser({})
      getMyFavorites([])
      navigate(`/`)
  }

function updatePassword(email, newPassword) {
  Api.updatePassword(email, newPassword)
  .then((res) => {
    console.log(res)
      setIsLoginError(false)
      setIsLoggin(true)
      localStorage.setItem('isLogin', true)
      setCurrentUser(res)
      localStorage.setItem('user', JSON.stringify(res))
      const favorite_collector_id = res.user_id
      getMyFavorites(favorite_collector_id)
      navigate(`/`)
      getUnreadbleMessages(res.user_id)
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
  function handleUpdateIsReserved(item_id) {
    Api.updateIsReserved(item_id, userId)
    .then((res) => {
      setIsReserved(!isReserved)
    })
    .catch((err) => {
      console.log(err)
      setPopupMessage("Something wrong, plese try again")
    })
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
  
  function updateItemCity(item_id, city) {
    openLoading()
    Api.updateItemCity(item_id, city)
    .then((res) => {
      closeAllPopups()
      setPopupMessage("Изменения получены, скоро вы сможете их увидеть на сайте")
      openSuccessfulActionPopup()
      closeLoading()
    })
    .catch((err) => {
      closeAllPopups()
      closeLoading()
      setPopupMessage("Something wrong, plese try again")
      openSuccessfulActionPopup()
    })
  }

  function updatePrice(item_id, price) {
    openLoading()
    Api.updatePrice(item_id, price)
    .then((res) => {
      closeAllPopups()
      setPopupMessage("Изменения получены, скоро вы сможете их увидеть на сайте")
      openSuccessfulActionPopup()
      closeLoading()
    })
    .catch((err) => {
      closeAllPopups()
      closeLoading()
      setPopupMessage("Something wrong, plese try again")
      openSuccessfulActionPopup()
    })
  }

  function updateDescription(item_id, description) {
    openLoading()
    Api.updateDescription(item_id, description)
    .then((res) => {
      closeAllPopups()
      setPopupMessage("Изменения получены, скоро вы сможете их увидеть на сайте")
      openSuccessfulActionPopup()
      closeLoading()
    })
    .catch((err) => {
      closeAllPopups()
      closeLoading()
      setPopupMessage("Something wrong, plese try again")
      openSuccessfulActionPopup()
    })
  }

  function updateCondition(item_id, condition) {
    openLoading()
    Api.updateCondition(item_id, condition)
    .then((res) => {
      closeAllPopups()
      setPopupMessage("Изменения получены, скоро вы сможете их увидеть на сайте")
      openSuccessfulActionPopup()
      closeLoading()
    })
    .catch((err) => {
      closeAllPopups()
      closeLoading()
      setPopupMessage("Something wrong, plese try again")
      openSuccessfulActionPopup()
    })
  }
  
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
                deleteMyAd={deleteMyAd}
                openDeletePopup={openDeletePopup}
                coversations={coversations}
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
