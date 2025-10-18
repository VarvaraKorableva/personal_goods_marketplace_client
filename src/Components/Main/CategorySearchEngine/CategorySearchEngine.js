import React from 'react'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/mainContainer'

function CategorySearchEngine({}) {
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
    }

    function handleSubmitToSearch(e) {
        e.preventDefault()
        //startToSearchSecondPage(keyWord)
    }

    return(
        <form className="MainSearchEngine-form" onSubmit={handleSubmitToSearch}>
            <input 
                className="MainSearchEngine-input"
                placeholder={translatedContext.placeholder}
                value={keyWord}
                onChange={handleTakeKeyWord}
            />
            <button className="MainSearchEngine-btn" type='submit'>{translatedContext.btnNameSearch}</button>
        </form>
    )
}

export default CategorySearchEngine;