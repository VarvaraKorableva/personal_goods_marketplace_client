
import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import * as Api from '../Api/Api'
import { useItemsContext } from '../contexts/ItemsContext';

export default function useUser({ openLoading, closeLoading, closeAllPopups, setPopupMessage, openSuccessfulActionPopup}) {
    const [userInfo, setUserInfo] = React.useState([])

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

  return {
    getUserById,
    userInfo,
    updateTelegram,
  };

};