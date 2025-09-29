import React from 'react'
import './FilterBtnContainer.css'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/mainContainer'
import { conditions } from '../../../const/Сonditions/Сonditions'
//import { useItemsContext } from "../../../contexts/ItemsContext";
import { useFiltersContext } from "../../../contexts/FiltersContext";
import { ITEMS_LIMIT } from "../../../const/helper";

function FilterBtnContainer({getAllItems, resetAllfilters}) {
    const { language } = React.useContext(LanguageContext)
    const limit = ITEMS_LIMIT

    const {
      city, setCity,
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
              <p className="filterBtnContainer__price-title">Выбрать диапазон цен</p>
              <div className="filterBtnContainer__numbers-container">
                <input 
                    className="filterBtnContainer__input-price"
                    placeholder='от'
                    value={lowPrice}
                    onChange={handleSearchByLowPriceFromInput}
                >
                </input>
                <input 
                    className="filterBtnContainer__input-price"
                    placeholder='до'
                    value={highPrice}
                    onChange={handleSearchByHighPriceFromInput}
                >
                </input>
              </div>
              <div className="filterBtnContainer__btn-price" onClick={handleResetAllFilters}>Сбросить фильтры</div>
            </div>

            <div className="filterBtnContainer__inputs-container">

              <input 
                className="filterBtnContainer__input-city"
                placeholder='Город'
                value={city}
                onChange={handleSearchByCity}
              >
              </input>

              <select 
                className='filterBtnContainer__input' 
                onChange={handleSearchByConditionFromInput}
                value={condition}
              >
                <option value="">Выбрать состояние</option>

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
