import React from 'react'
import { useNavigate } from 'react-router-dom'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/Popups/Popup'

export default function usePopups({setReceiverId, myAds, myAdsCount, setItemId}) {
  const navigate = useNavigate()

  const [isImglinkPopup, setIsImglinkPopup] = React.useState(false)
  const [imgLink, setImgLink] = React.useState('')
  const [isChoiceOfProductOrServicePopup, setIsChoiceOfProductOrServicePopup] = React.useState(false)
  const [isSuccessfulActionPopup, setSuccessfulActionPopup] = React.useState(false)
  const [isFirstMessagePopup, setIsFirstMessagePopup] = React.useState(false)
  const [isEditPopup, setIsEditPopup] = React.useState(false)
  const [isDeletePopup, setIsDeletePopup] = React.useState(false)
  const [popupMessage, setPopupMessage] = React.useState('')
  const [isOneConversationPopup, setIsOneConversationPopup] = React.useState(false)
  const [isBurgerMenuPopup, setIsBurgerMenuPopup] = React.useState(false)
  const [editPopupName, setEditPopupName] = React.useState('') 
  const [popupEditItemId, setPopupEditItemId] = React.useState(0)
  const [itemIdDelete, setItemIdDelete] = React.useState(0)
  const [isGood, setIsGood] = React.useState(true)
  
  const { language } = React.useContext(LanguageContext)

  const { en, rus, hebrew } = choose;

  let translatedContext = '';
  if (language === 'en') {
    translatedContext = en;
  } else if (language === 'rus') {
    translatedContext = rus;
  } else if (language === 'hebrew') {
    translatedContext = hebrew;
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
    setIsImglinkPopup(false)
  }

  function openImgLinkPopup(link) {
    setIsImglinkPopup(true)
    setImgLink(link)
  }

  function openSuccessfulActionPopup() {
    setSuccessfulActionPopup(true)
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

  function handleChoiceOfProductOrServicePopupClick() {
    if (myAds.length >= 5) {
      setSuccessfulActionPopup(true)
      setPopupMessage(`${translatedContext.messagesPopup.maxAdsPopupMessage} ${myAds.length}`)
    } else {
      setIsChoiceOfProductOrServicePopup(true)
    }
  }

  function handleAddAdClick(data, realEstate = false, commercial = false, land = false) {
    setIsGood(data);
  
    if (data) {
      if (realEstate) {
        navigate(`/add-real-estate`);
      } else if (commercial) {
        navigate(`/add-commercial`); ///можно будет добавить сюда
      } else if (land) {
        navigate(`/add-land`); ///можно будет добавить сюда
      } else {
        navigate(`/add-ad`);
      }
    } else {
      navigate(`/add-new-service`);
    }
  }  

  return {
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
    openImgLinkPopup,
    imgLink,
    isImglinkPopup
  };

};