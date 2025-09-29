import React from 'react'
import './MainSearchEngine.css'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/mainContainer'
import { LuSettings2 } from "react-icons/lu";
import { useFiltersContext } from "../../../contexts/FiltersContext";
import { ITEMS_LIMIT } from "../../../const/helper";

function MainSearchEngine({ getAllItems, handleGetItemsByFilter, handleFilterBtnClick, resetAllfilters }) {
    const limit = ITEMS_LIMIT
    const {
        title, setTitle,
      } = useFiltersContext();

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
        setTitle(e.target.value)
    }

    function handleSearch() {
        handleGetItemsByFilter()
    }

    function handleReset() {
        resetAllfilters()
        getAllItems({ page: 1, limit, filters: {} })  
    }



    return(
        <form className="MainSearchEngine-form" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <LuSettings2 className="MainSearchEngine-filter-btn" onClick={handleFilterBtnClick}/>
            <input 
                className="MainSearchEngine-input"
                placeholder={translatedContext.placeholder}
                value={title}
                onChange={handleTakeKeyWord}
            />
            <div className="MainSearchEngine-btn-container">
                <button className="MainSearchEngine-reset-btn" type='button' onClick={handleReset}>X</button>
                <button className="MainSearchEngine-btn" type='submit'>{translatedContext.btnNameSearch}</button>
            </div>
        </form>
    )
}

export default MainSearchEngine;