import React,{ useState } from "react";
import * as Api from '../../Api/Api'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/Popups/Popup'

export default function useItemUpdate(userId, {openLoading, closeLoading, closeAllPopups, setPopupMessage, openSuccessfulActionPopup, setIsReserved, isReserved,}) {
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

  const updateDescription = (item_id, description) => {
    openLoading()
    Api.updateDescription(item_id, description)
    .then((res) => {
      closeAllPopups()
      setPopupMessage(translatedContext.messagesPopup.changesSaved)
      openSuccessfulActionPopup()
      closeLoading()
    })
    .catch((err) => {
      closeAllPopups()
      closeLoading()
      setPopupMessage(translatedContext.messagesPopup.somethingWrong)
      openSuccessfulActionPopup()
    })
  }

  const updatePrice = (item_id, price) => {
    openLoading()
    Api.updatePrice(item_id, price)
    .then((res) => {
      closeAllPopups()
      setPopupMessage(translatedContext.messagesPopup.changesSaved)
      openSuccessfulActionPopup()
      closeLoading()
    })
    .catch((err) => {
      closeAllPopups()
      closeLoading()
      setPopupMessage(translatedContext.messagesPopup.somethingWrong)
      openSuccessfulActionPopup()
    })
  }

  const updateItemCity = (item_id, city) => {
    openLoading()
    Api.updateItemCity(item_id, city)
    .then((res) => {
      closeAllPopups()
      setPopupMessage(translatedContext.messagesPopup.changesSaved)
      openSuccessfulActionPopup()
      closeLoading()
    })
    .catch((err) => {
      closeAllPopups()
      closeLoading()
      setPopupMessage(translatedContext.messagesPopup.somethingWrong)
      openSuccessfulActionPopup()
    })
  }

  const updateCondition = (item_id, condition) => {
    openLoading()
    Api.updateCondition(item_id, condition)
    .then((res) => {
      closeAllPopups()
      setPopupMessage(translatedContext.messagesPopup.changesSaved)
      openSuccessfulActionPopup()
      closeLoading()
    })
    .catch((err) => {
      closeAllPopups()
      closeLoading()
      setPopupMessage(translatedContext.messagesPopup.somethingWrong)
      openSuccessfulActionPopup()
    })
  }

  function handleUpdateIsReserved(item_id) {
    Api.updateIsReserved(item_id, userId)
    .then((res) => {
      setIsReserved(!isReserved)
    })
    .catch((err) => {
      console.log(err)
      setPopupMessage(translatedContext.messagesPopup.somethingWrong)
    })
  }


  return {
    updateDescription,
    updatePrice,
    updateItemCity,
    updateCondition,
    handleUpdateIsReserved,
  };

};


