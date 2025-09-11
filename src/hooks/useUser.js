
import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import * as Api from '../Api/Api'

export default function useUser({ openLoading, closeLoading,  }) {
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

  return {
    getUserById,
    userInfo,
  };

};