import React from 'react'
import './MainSearchEngine.css'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/mainContainer'

function MainSearchEngine({ handleTitleChange, handleGetItemsByFilter, getTitle }) {
    const [keyWord, setKeyWord] = React.useState('')
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

    function handleTakeKeyWord(e) {
        setKeyWord(e.target.value)
        handleTitleChange(e.target.value)
    }

    function handleSearchByTitle() {
        handleGetItemsByFilter()
        getTitle(keyWord)
    }

    return(
        <form className="MainSearchEngine-form">
            <input 
                className="MainSearchEngine-input"
                placeholder={translatedContext.placeholder}
                value={keyWord}
                onChange={handleTakeKeyWord}
            />
            <button className="MainSearchEngine-btn" type='button' onClick={handleSearchByTitle}>{translatedContext.btnNameSearch}</button>
        </form>
    )
}

export default MainSearchEngine;


//<button className="MainSearchEngine-btn-city">Выбрать город</button>