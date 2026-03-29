import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import Container from '../../UK-kit/Container/Container'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/Footer/FooterLinksData'

function Footer({handleLogout, isLoggin}) {
  const currentUser = React.useContext(CurrentUserContext)
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

  function onLogout() {
    handleLogout()
}
    return (
      
        <Container as='footer' baseClassName='wrapper' className='footer'>
          <Container as='div' baseClassName='container' className='footer-container'>
            <div className='footer_logo-img'></div>  
            
            <div className="footer-links-container">
              <Link className='footer__link'to={`/about-Goods`}>{translatedContext.aboutProject}</Link>
                <Link className='footer__link' to={'/publication-rules'}>{translatedContext.publicationRules}</Link>
                <Link className='footer__link'to={`/privacy-policy`}>{translatedContext.privacyPolicy}</Link>
                <Link className='footer__link' to={'/not-ready-page'}>{translatedContext.reportUser}</Link>
                <Link className='footer__link' to={'/not-ready-page'}>{translatedContext.reportBug}</Link>
                <Link className='footer__link' to={'/not-ready-page'}>{translatedContext.suggestImprovements}</Link>

                {/*{
                  currentUser.email === process.env.REACT_APP_ADMIN ? 
                    <Link className='footer__link' to={'/admin'}>Админ</Link>
                  :
                    <></>
                }*/}
                {isLoggin?
                  <button onClick={onLogout} className='footer__link'>{translatedContext.logout}</button>
                :
                  <></>
                }
            </div>  
          </Container>
        </Container>
    )

}

export default Footer;
