import React from 'react'
import './CityFilterBtn.css'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/mainContainer'
import {cities} from '../../../const/Cities/cities'

function CityFilterBtn({}) {
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

    return(
        <div className="cityFilterBtn__container">
            <>
                <input 
                    className="cityFilterBtn__input-price"
                    placeholder='от'
                >
                </input>
                <input 
                    className="cityFilterBtn__input-price"
                    placeholder='до'
                >
                </input>
                <div className="cityFilterBtn__btn-city">Выбрать диапозон цен</div>
            </>

            <input 
                className="cityFilterBtn__input-price"
                placeholder='Город'
            >
            </input>


            
        </div>
    )
}

export default CityFilterBtn;
