import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import Container from '../../UK-kit/Container/Container'

function Footer({handleLogout, isLoggin}) {
  const currentUser = React.useContext(CurrentUserContext)

  function onLogout() {
    handleLogout()
}
    return (
      
      
        <Container as='footer' baseClassName='wrapper' className='footer'>
          <Container as='div' baseClassName='container' className='footer-container'>
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
                {isLoggin?
                  <button onClick={onLogout} className='footer__link'>Выйти из приложения</button>
                :
                  <></>
                }
            </div>  
          </Container>
        </Container>
    )

}

export default Footer;
