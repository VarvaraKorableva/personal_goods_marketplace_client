import React from 'react'
import './Footer.css'
import { Link, useLocation } from 'react-router-dom'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'


function Footer() {
  const currentUser = React.useContext(CurrentUserContext)

    return (
        <footer className="footer">
          <div className="footer-container">
            <div className='footer_logo-img'></div>  
            
            <div className="footer-links-container">
                <Link className='footer__link' to={'/publication-rules'}>Правила размещения объявлений</Link>
                <Link className='footer__link' to={'/not-ready-page'}>Пожаловаться на пользователя</Link>
                <Link className='footer__link' to={'/not-ready-page'}>Сообщить об ошибке в работе приложения</Link>
                <Link className='footer__link' to={'/not-ready-page'}>Предложить улучшения для приложения</Link>

                {
                  currentUser.email === process.env.REACT_APP_ADMIN ? 
                    <Link className='footer__link' to={'/admin'}>Админ</Link>
                  :
                    <></>
                }
            </div>  
          </div>
        </footer>
    )

}

export default Footer;
