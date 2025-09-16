import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import * as Api from '../Api/Api'
import { useItemsContext } from "../contexts/ItemsContext";

export default function useAuthActions({ 
    resetFavorites, openLoading, closeAllPopups, closeLoading, setSuccessfulActionPopup, setPopupMessage,
    getMyFavorites, getUnreadbleMessages, 
    setMyAds, currentUser, setCurrentUser
 }) {
 
  const {
      lastFourtyItems,
      setLastFourtyItems,
      itemsAfterSearch,
      setItemsAfterSearch,
      totalCountOfAds,
      setTotalCountOfAds,
      page,
      setPage,
      isPageItemsLoading,
      setIsPageItemsLoading,
    } = useItemsContext();

    const [isLoginError, setIsLoginError] = useState(false)
    const [isLoggin, setIsLoggin] = useState(localStorage.getItem('user') == null ? false : true)
    const [isEmailConfirmed, setIsEmailConfirmed] = useState(false) ///использовать при разверешии или нет для перехода на страницу регистрации
    const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false) 
    const [isVerificationCodeSentMessage, setIsVerificationCodeSentMessage] = useState('') 
    const [isRegError, setIsRegError] = useState(false)

    const navigate = useNavigate()

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

    const verifyCode = (email, code) => {
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

    const handleLogout = () => {
        setIsLoggin(false)
        localStorage.removeItem('isLogin')
        localStorage.removeItem('user')
        localStorage.removeItem('category')
        setCurrentUser({})
        resetFavorites()
        navigate(`/`)
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
          getMyFavorites(favorite_collector_id, lastFourtyItems)
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

    const handleRegSubmit = (userData) => {
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

    function updatePassword(email, newPassword) {
      Api.updatePassword(email, newPassword)
      .then((res) => {
          setIsLoginError(false)
          setIsLoggin(true)
          localStorage.setItem('isLogin', true)
          setCurrentUser(res)
          localStorage.setItem('user', JSON.stringify(res))
          const favorite_collector_id = res.user_id
          getMyFavorites(favorite_collector_id, lastFourtyItems)
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



  return {
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
  };

};