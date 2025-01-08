import React from 'react'
import { Link } from 'react-router-dom';
import './NotFoundPage.css'
import {LanguageContext} from '../../contexts/TranslationContext'  
import choose from '../../const/notFoundPageData'

function NotFoundPage() {

    const { language } = React.useContext(LanguageContext)
    const { en, rus, hebrew } = choose

    let translatedContext = '';
      if (language === 'en') {
        translatedContext = en;
      } else if (language === 'rus') {
        translatedContext = rus;
      } else if (language === 'hebrew') {
        translatedContext = hebrew;
      }

    return (
        <div className='notFoundPage-container'>
            <h1>{translatedContext.mainTitle}</h1>
            <Link to="/" className='notFoundPage-link'>
                <p>{translatedContext.backLinkName} &rarr;</p>
            </Link>
        </div>
    )
}

export default NotFoundPage;