import React from 'react'
import './Header.css'
import { Link, useLocation } from 'react-router-dom'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/HeaderLan'
import Container from '../../UK-kit/Container/Container'
import Logo from '../Logo/Logo'
import AuthenticatedHeader from './AuthenticatedHeader/AuthenticatedHeader'
import NotAuthenticatedHeader from './NotAuthenticatedHeader/NotAuthenticatedHeader'

function Header({isLoggin, onAdPopup, unreadbleMessages, getUnreadbleMessages, onOpenBurgerMenuPopup, getMyItems}) {
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
  getMyItems(userId)
}

function handleOpenBurgerMenuPopup() {
  onOpenBurgerMenuPopup()
}

return (
  <Container as='header' baseClassName='wrapper' className='header_container'>
    <Container as='div' baseClassName='container' className='header'>

      <Logo/>

        <button className='header__burger-menu' onClick={handleOpenBurgerMenuPopup}>
          {unreadbleMessages.length > 0? 
            <div className='header__burger-menu-messages-badge'>{unreadbleMessages.length}</div>
              :
            <></>
          } 
        </button>

        <div className='header__langpic-container'>
          {isLoggin ?
              <AuthenticatedHeader 
                handleAddAdClick={handleAddAdClick} 
                handleGetUnreadbleMessages={handleGetUnreadbleMessages}
                unreadbleMessages={unreadbleMessages}
                userId={userId}
                translatedContext={translatedContext}
              />
              
          :
            <NotAuthenticatedHeader 
              isLoggin={isLoggin}
              translatedContext={translatedContext}
            />
          }
            <div className='header__lang-container'>
              <button onClick={() => handleLanguageChange('rus')} className={language === 'rus'? 'header__lang-btn_active':'header__lang-btn'}>RU</button>
              <button onClick={() => handleLanguageChange('en')} className={language === 'en'? 'header__lang-btn_active':'header__lang-btn'}>EN</button>
            </div>
          
        </div>

    </Container>
  </Container>  
)
}

export default Header;
