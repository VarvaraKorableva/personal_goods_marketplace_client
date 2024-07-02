import React from 'react'
import './Header.css'
import { Link, useLocation } from 'react-router-dom'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/HeaderLan'

function Header({isLoggin, onAdPopup}) {
  
const currentUser = React.useContext(CurrentUserContext)

const userId = currentUser.user_id

const location = useLocation();

const { language, changeLanguage } = React.useContext(LanguageContext)

const handleLanguageChange = (newLanguage) => {
  changeLanguage(newLanguage);
};

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
          
          <button className='header_add-announcement-btn' onClick={handleAddAdClick}>Place an ad</button>
          
          <Link to={`/users/${userId}`} className='header_link'>
            <button className='header_add-announcement-btn'>My page</button>
          </Link>

          <Link  to={`/my_favorites`} className='header_link'>
            <button className='header_favorite-btn'></button>
          </Link>
        </div>
      :  
      isLoggin ?
        <div className='header_wrapper'>
          <Link to={`/users/`} className='header_login-link'>
            <p className='header_login-link'>{translatedContext.mypage}</p>
          </Link>
        </div>
         
      :
      !isLoggin  && location.pathname === '/signup'?
      <Link to="/signin" className='header_login-link'>
        <p>{translatedContext.login}</p>
      </Link>
      :
      !isLoggin && location.pathname === '/signin'?
      <Link to="/signup" className='header_registraion-link'>
        <p>{translatedContext.registraion}</p>
      </Link>
      :
      <div className='header__links-container'>
        <Link to="/signin" className='header_registraion-link'>
          <p>{translatedContext.login}</p>
        </Link>
        <Link to="/signup" className='header_registraion-link'>
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