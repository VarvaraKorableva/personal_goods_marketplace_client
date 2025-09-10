import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import * as Api from '../../Api/Api'

export default function usePopups({setReceiverId, myAds, setItemId, setItemIdDelete}) {

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
    if (myAds.length >= 20) {
      setSuccessfulActionPopup(true)
      setPopupMessage(`Можно добавлять не более 20 объявлений, у вас добавлено ${myAds.length}`)
    } else {
      setIsChoiceOfProductOrServicePopup(true)
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
    isOneConversationPopup,
    isBurgerMenuPopup,
    editPopupName,
    popupEditItemId,
    setPopupMessage,
    setSuccessfulActionPopup,
  };

};