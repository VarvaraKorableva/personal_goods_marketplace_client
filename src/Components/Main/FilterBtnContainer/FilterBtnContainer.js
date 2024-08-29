import React from 'react'
import './FilterBtnContainer.css'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/mainContainer'
import { conditions } from '../../../const/Сonditions/Сonditions'

function FilterBtnContainer({}) {
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
        <div className="filterBtnContainer__container">
            <div className="filterBtnContainer__price-wrapper">
              <div className="filterBtnContainer__numbers-container">
                <input 
                    className="filterBtnContainer__input-price"
                    placeholder='от'
                >
                </input>
                <input 
                    className="filterBtnContainer__input-price"
                    placeholder='до'
                >
                </input>
              </div>
              <div className="filterBtnContainer__btn-price">Выбрать диапозон цен</div>
            </div>

            <div className="filterBtnContainer__inputs-container">

              <input 
                className="filterBtnContainer__input"
                placeholder='Город'
              >
              </input>

              <select 
                className='filterBtnContainer__input' 
                //onChange={handleCityChange}
                //value={city}
              >
                <option value="">Выбрать сотояние</option>

                    {language === 'rus' ?
                        conditions.rus.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))
            
                    :
                        conditions.en.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))
                    }
              </select>
            </div>
        </div>
    )
}

export default FilterBtnContainer;
