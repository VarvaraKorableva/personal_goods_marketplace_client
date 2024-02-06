import React from 'react'
import './Header.css'
import { Link, useLocation } from 'react-router-dom'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/HeaderLan'

function Header({signOut, onChangeLanguageClick}) {
  
const currentUser = React.useContext(CurrentUserContext)
const isLoggin = true
//const userId = currentUser._id

const location = useLocation();

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

return (
  <div className='header_container'>
    <div className='header'>
    <Link to={`/`} className='header_logo-container'>
      <h1 className='header_logo'> Personal goods marketplace</h1>
    </Link> 
    <div className='header__langpic-container'>
      {isLoggin ?//&& location.pathname === `/users/`${userId}
        <div className='header_wrapper'>
          <button className='header_add-announcement-btn'>Place an ad</button>
          <button className='header_LogOut-btn' onClick={signOut}>{translatedContext.logout}</button>
          
        </div>
        
      :  
      isLoggin ?
        <div className='header_wrapper'>
          <Link to={`/users/`} className='header_login-link'>
            <p className='header_login-link'>{translatedContext.mypage}</p>
          </Link>
        </div>
         
      :
      !isLoggin  || location.pathname === '/signup'?
      <Link to="/signin" className='header_login-link'>
        <p className='header_login-link'>{translatedContext.login}</p>
      </Link>
      :
      !isLoggin || location.pathname === '/signin'?
      <Link to="/signup" className='header_registraion-link'>
        <p className='header_registraion-link'>{translatedContext.registration}</p>
      </Link>
      :
      <></>
      }
      <button className='header__langpic' onClick={onChangeLanguageClick}></button>
    </div>
    </div>
  </div>  
)
}

export default Header;