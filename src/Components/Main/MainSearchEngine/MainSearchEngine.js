import React from 'react'
import './MainSearchEngine.css'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/mainContainer'
import { LuSettings2 } from "react-icons/lu";

function MainSearchEngine({resetTitle, getAllItems, handleTitleChange, handleGetItemsByFilter, getTitle, handleFilterBtnClick }) {
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
        //console.log(keyWord)
    }

    function handleReset() {
        setKeyWord('')
        getAllItems()
        resetTitle()
    }

    return(
        <form className="MainSearchEngine-form">
            <LuSettings2 className="MainSearchEngine-filter-btn" onClick={handleFilterBtnClick}/>
            <input 
                className="MainSearchEngine-input"
                placeholder={translatedContext.placeholder}
                value={keyWord}
                onChange={handleTakeKeyWord}
            />
            <div className="MainSearchEngine-btn-container">
                <button className="MainSearchEngine-reset-btn" type='button' onClick={handleReset}>X</button>
                <button className="MainSearchEngine-btn" type='button' onClick={handleSearchByTitle}>{translatedContext.btnNameSearch}</button>
            </div>
        </form>
    )
}

export default MainSearchEngine;