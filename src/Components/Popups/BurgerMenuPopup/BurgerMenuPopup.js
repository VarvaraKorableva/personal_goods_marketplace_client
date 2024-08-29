import React from 'react'
import './BurgerMenuPopup.css'
import { Link, useLocation } from 'react-router-dom'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/HeaderLan'

function BurgerMenuPopup({onClose, isOpen, isLoggin, getUnreadbleMessages, unreadbleMessages, onAdPopup}) {
    const currentUser = React.useContext(CurrentUserContext)

    const userId = currentUser.user_id
    
    const location = useLocation();
    
    const { language, changeLanguage } = React.useContext(LanguageContext)

    const { en, rus, hebrew } = choose;

    let translatedContext = '';
      if (language === 'en') {
        translatedContext = en;
      } else if (language === 'rus') {
        translatedContext = rus;
      } else if (language === 'hebrew') {
        translatedContext = hebrew;
    }

    const handleLanguageChange = (newLanguage) => {
        changeLanguage(newLanguage);
    };

    function handleGetUnreadbleMessages() {
        getUnreadbleMessages(userId)
        onClose()
    }

    function handleAddAdClick() {
        onClose()
        getUnreadbleMessages(userId)
        onAdPopup()
    }

return (
    
  <div className={`burgerMenuPopup ${isOpen && 'burgerMenuPopup__opened'}`}>
    <div className="burgerMenuPopup__container">
        <button 
            className="burgerMenuPopup__close-btn" 
            type="button" 
            onClick={onClose}>
        </button>

      {isLoggin ?
        <div className='burgerMenuPopup_wrapper'>

          <Link to={`/`} className='burgerMenuPopup_link' onClick={handleGetUnreadbleMessages}>
            <div className='burgerMenuPopup_add-main-page-pic'></div>
            <button className='burgerMenuPopup_add-announcement-btn'>{translatedContext.mainPage}</button>
          </Link>

          <div className='burgerMenuPopup_add-announcement-container'>
            <div className='burgerMenuPopup_add-announcement-btn-pic' onClick={handleAddAdClick}></div>
            <button className='burgerMenuPopup_add-announcement-btn' onClick={handleAddAdClick}>{translatedContext.addNewAddBtnName}</button>
          </div> 

          <Link to={`/users/${userId}`} className='burgerMenuPopup_link' onClick={handleGetUnreadbleMessages}>
            <div className='burgerMenuPopup_add-mypage-pic'></div>
            <button className='burgerMenuPopup_add-announcement-btn'>{translatedContext.mypage}</button>
          </Link>

          <Link  to={`/my_favorites`} className='burgerMenuPopup_link' onClick={handleGetUnreadbleMessages}>
            <button className='burgerMenuPopup_favorite-btn'></button>
            <button className='burgerMenuPopup_add-announcement-btn'>Избранное</button>
          </Link>

          <Link to={`/users/${userId}/messages`} className='burgerMenuPopup_link burgerMenuPopup_link-message-container' onClick={onClose}>
            <button className='burgerMenuPopup__message-pic'></button>
            {unreadbleMessages.length > 0? 
                <div className='burgerMenuPopup__messages-badge'>{unreadbleMessages.length}</div>
                :
                <></>
            }     
            <button className='burgerMenuPopup_add-announcement-btn'>Мои сообщения</button>
          </Link>
        </div>
      :  
      isLoggin ?
        <div className='burgerMenuPopup_wrapper'>
          <Link to={`/users/`} className='burgerMenuPopup_login-link' onClick={handleGetUnreadbleMessages}>
            <p className='burgerMenuPopup_login-link'>{translatedContext.mypage}</p>
          </Link>
        </div>
         
      :
      !isLoggin  && location.pathname === '/signup-first-stage'?
      <Link to="/signin" className='burgerMenuPopup_login-link' onClick={onClose}>
        <p>{translatedContext.login}</p>
      </Link>
      :
      !isLoggin && location.pathname === '/signin'?
      <Link to="/signup-first-stage" className='burgerMenuPopup_registraion-link' onClick={onClose}>
        <p>{translatedContext.registraion}</p>
      </Link>
      :
      <div className='burgerMenuPopup__links-container'>
        <Link to="/signin" className='burgerMenuPopup_registraion-link' onClick={onClose}>
          <p>{translatedContext.login}</p>
        </Link>
        <Link to="/signup-first-stage" className='burgerMenuPopup_registraion-link' onClick={onClose}>
          <p>{translatedContext.registraion}</p>
        </Link>
      </div>
      }
      {/*
      <div className='burgerMenuPopup__lang-container'>
        <button onClick={() => handleLanguageChange('rus')} className={language === 'rus'? 'burgerMenuPopup__lang-btn_active':'burgerMenuPopup__lang-btn'}>RU</button>
        <button onClick={() => handleLanguageChange('en')} className={language === 'en'? 'burgerMenuPopup__lang-btn_active':'burgerMenuPopup__lang-btn'}>EN</button>
      </div>*/}
      
    </div>
    
  </div>
)
}

export default  BurgerMenuPopup;