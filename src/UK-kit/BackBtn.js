import React from 'react'
import { useNavigate } from 'react-router-dom'
import {LanguageContext} from '../contexts/TranslationContext'
import choose from '../const/mainContainer'

function BackBtn({ className = '' }) {
    const navigate = useNavigate()
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

    const goBack = () => {
        navigate(-1);
      };

    return (
        <button 
            className={`back-btn ${className}`} 
            onClick={goBack}>
                ← {translatedContext.backBtn}
        </button>
    )
}

export default BackBtn