import React from 'react'
import './Header.css'
import { Link, useLocation } from 'react-router-dom'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/HeaderLan'

function Header({isLoggin, onAdPopup, unreadbleMessages, getUnreadbleMessages, onOpenBurgerMenuPopup}) {
  console.log('unreadbleMessages', unreadbleMessages)
  
const currentUser = React.useContext(CurrentUserContext)

const userId = currentUser.user_id

const location = useLocation();

const { language, changeLanguage } = React.useContext(LanguageContext)

const handleLanguageChange = (newLanguage) => {
  changeLanguage(newLanguage);
};

function handleGetUnreadbleMessages() {
  getUnreadbleMessages(userId)
}

const { en, rus, hebrew } = choose;

let translatedContext = '';
if (language === 'en') {
  translatedContext = en;
} else if (language === 'rus') {
  translatedContext = rus;
} else if (language === 'hebrew') {
  translatedContext = hebrew;
}

function handleAddAdClick() {
  onAdPopup()
  getUnreadbleMessages(userId)
}

function handleOpenBurgerMenuPopup() {
  onOpenBurgerMenuPopup()
}

return (
  <div className='header_container'>
    <div className='header'>
    <Link to={`/`} className='header_logo-container'>
      {/*<div className='header_logo-img'></div>
      <h1 className='header_logo'>Personal <span className='header_logo-name'></span> marketplace</h1> Personal goods marketplace */}
      <h1 className='header_logo'>Personal</h1>
      <div className='header_logo-img'></div>
      <h1 className='header_logo'>Marketplace</h1>
    </Link> 

    <button className='header__burger-menu' onClick={handleOpenBurgerMenuPopup}>
      {unreadbleMessages.length > 0? 
        <div className='header__burger-menu-messages-badge'>{unreadbleMessages.length}</div>
          :
        <></>
      } 
    </button>

    <div className='header__langpic-container'>
      {isLoggin ?
        <div className='header_wrapper'>
          
          <button className='header_add-announcement-btn' onClick={handleAddAdClick}>{translatedContext.addNewAddBtnName}</button>
          
          <Link to={`/users/${userId}`} className='header_link' onClick={handleGetUnreadbleMessages}>
            <button className='header_add-announcement-btn'>{translatedContext.mypage}</button>
          </Link>

          <Link  to={`/my_favorites`} className='header_link' onClick={handleGetUnreadbleMessages}>
            <button className='header_favorite-btn'></button>
          </Link>

          <Link to={`/users/${userId}/messages`} className='header_link header_link-message-container'>
            <button className='header__message-pic'></button>
            {unreadbleMessages.length > 0? 
                <div className='header__messages-badge'>{unreadbleMessages.length}</div>
                :
                <></>
            }     
          </Link>
        </div>
      :  
      isLoggin ?
        <div className='header_wrapper'>
          <Link to={`/users/`} className='header_login-link' onClick={handleGetUnreadbleMessages}>
            <p className='header_login-link'>{translatedContext.mypage}</p>
          </Link>
        </div>
         
      :
      !isLoggin  && location.pathname === '/signup-first-stage'?
      <Link to="/signin" className='header_login-link'>
        <p>{translatedContext.login}</p>
      </Link>
      :
      !isLoggin && location.pathname === '/signin'?
      <Link to="/signup-first-stage" className='header_registraion-link'>
        <p>{translatedContext.registraion}</p>
      </Link>
      :
      <div className='header__links-container'>
        <Link to="/signin" className='header_registraion-link'>
          <p>{translatedContext.login}</p>
        </Link>
        <Link to="/signup-first-stage" className='header_registraion-link'>
          <p>{translatedContext.registraion}</p>
        </Link>
      </div>
      }
      <div className='header__lang-container'>
        <button onClick={() => handleLanguageChange('rus')} className={language === 'rus'? 'header__lang-btn_active':'header__lang-btn'}>RU</button>
        <button onClick={() => handleLanguageChange('en')} className={language === 'en'? 'header__lang-btn_active':'header__lang-btn'}>EN</button>
      </div>
      
    </div>
    </div>
  </div>  
)
}

export default Header;

/*
<button className='header__langpic' onClick={onChangeLanguageClick}></button>
*/