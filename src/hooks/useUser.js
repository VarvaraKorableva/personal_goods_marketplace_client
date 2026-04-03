
import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import * as Api from '../Api/Api'
import { useItemsContext } from '../contexts/ItemsContext';
import {LanguageContext} from '../contexts/TranslationContext'
import choose from '../const/Popups/Popup'

export default function useUser({ openLoading, closeLoading, closeAllPopups, setPopupMessage, openSuccessfulActionPopup}) {
    const { language } = React.useContext(LanguageContext)
    const [userInfo, setUserInfo] = React.useState([])

    const { en, rus, hebrew } = choose;
  
    let translatedContext = '';
    if (language === 'en') {
      translatedContext = en;
    } else if (language === 'rus') {
      translatedContext = rus;
    } else if (language === 'hebrew') {
      translatedContext = hebrew;
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

      function updateTelegram(user_id, telegram) {
        openLoading()
        Api.updateTelegram(user_id, telegram)
        .then((res) => {
          closeAllPopups()
          setPopupMessage(translatedContext.messagesPopup.changesSaved)
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
      
      function updateUserName(user_id, username) {
        openLoading()
        Api.updateUserName(user_id, username)
        .then((res) => {
          closeAllPopups()
          setPopupMessage(translatedContext.messagesPopup.changesSaved)
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

  return {
    getUserById,
    userInfo,
    updateTelegram,
    updateUserName,
  };

};