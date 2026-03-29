import React from 'react'
import './FilterBtnContainer.css'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/mainContainer'
import { conditions } from '../../../const/Сonditions/Сonditions'
//import { useItemsContext } from "../../../contexts/ItemsContext";
import { useFiltersContext } from "../../../contexts/FiltersContext";
import { ITEMS_LIMIT } from "../../../const/helper";
import { cities } from '../../../const/Cities/citiesKeys'

function FilterBtnContainer({getAllItems, resetAllfilters}) {
    const { language } = React.useContext(LanguageContext)
    const limit = ITEMS_LIMIT

    const {
      city, setCity,
      city_ru, city_en, city_he,
      setCity_ru, setCity_en, setCity_he,
      lowPrice, setLowPrice,
      highPrice, setHighPrice,
      condition, setCondition,
    } = useFiltersContext();

    const { en, rus, hebrew } = choose;

    let translatedContext = '';
      if (language === 'en') {
        translatedContext = en;
      } else if (language === 'rus') {
        translatedContext = rus;
      } else if (language === 'hebrew') {
        translatedContext = hebrew;
    }

    const langKeyMap = {
      rus: 'rus',
      en: 'en',
      hebrew: 'he'
    };

    const currentLang = langKeyMap[language] || 'rus';

    //const cityOptions = cities.map(cityObj => cityObj[currentLang] || cityObj.rus);
    const cityOptions = cities.map(cityObj => cityObj[language] || cityObj.rus);
    
    const conditionOptions = conditions[currentLang] || conditions.rus;

    function handleSearchByCity(e) {
      setCity(e.target.value)
    }

    function handleSearchByLowPriceFromInput(e) {
      setLowPrice(e.target.value)
    }

    function handleSearchByHighPriceFromInput(e) {
      setHighPrice(e.target.value)
    }

    function handleSearchByConditionFromInput(e) {
      setCondition(e.target.value)
    }

    function handleResetAllFilters() {
      resetAllfilters()
      getAllItems({ page: 1, limit, filters: {} }) 
    }

    return(
        <div className="filterBtnContainer__container">
            <div className="filterBtnContainer__price-wrapper">
              <p className="filterBtnContainer__price-title">{translatedContext.priceRangeTitle}</p>
              <div className="filterBtnContainer__numbers-container">
                <input 
                    className="filterBtnContainer__input-price"
                    placeholder={translatedContext.priceFrom}
                    value={lowPrice}
                    onChange={handleSearchByLowPriceFromInput}
                >
                </input>
                <input 
                    className="filterBtnContainer__input-price"
                    placeholder={translatedContext.priceTo}
                    value={highPrice}
                    onChange={handleSearchByHighPriceFromInput}
                >
                </input>
              </div>
              <div className="filterBtnContainer__btn-price" onClick={handleResetAllFilters}>{translatedContext.resetFilters}</div>
            </div>

{/*
            <div className="filterBtnContainer__inputs-container">

              <input 
                className="filterBtnContainer__input-city"
                placeholder='Город'
                value={city}
                onChange={handleSearchByCity}
              >
              </input>
*/}
            <div className="filterBtnContainer__inputs-container">
            <select
                className="filterBtnContainer__input-city"
                value={city}
                onChange={handleSearchByCity}
              >
                <option value="">{translatedContext.selectCity}</option>
                {cityOptions.map((c, index) => (
                  <option key={index} value={c}>
                    {c}
                  </option>
                ))}
              </select>



              <select 
                className='filterBtnContainer__input' 
                onChange={handleSearchByConditionFromInput}
                value={condition}
              >
                <option value="">{translatedContext.selectCondition}</option>

                    {/*{language === 'rus' ?
                        conditions.rus.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))
            
                    :
                        conditions.en.map((item) => (
                            <option key={item} value={item}>{item}</option>
                        ))
                    }*/}

                      {conditionOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
              </select>
            </div>
        </div>
    )
}

export default FilterBtnContainer;
