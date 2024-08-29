import React from 'react'
import './Footer.css'
import { Link, useLocation } from 'react-router-dom'

function Footer() {


    return (
        <footer className="footer">
          <div className="footer-container">
            <div className='footer_logo-img'></div>  

            <div className="footer-links-container">
                <Link className='footer__link' to={'/publication-rules'}>Правила размещения объявлений</Link>
                <Link className='footer__link'>Пожаловаться на пользователя</Link>
                <Link className='footer__link'>Сообщить об ошибке в работе приложения</Link>
                <Link className='footer__link'>Предложить улучшения для приложения</Link>
            </div>  
          </div>
        </footer>
    )

}

export default Footer;
