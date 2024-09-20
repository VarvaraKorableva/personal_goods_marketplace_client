import React from 'react'
import './FilterBtnContainer.css'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/mainContainer'
import { conditions } from '../../../const/Сonditions/Сonditions'

function FilterBtnContainer({handleGetItemsByFilter, handleCityPriceAndConditionChange}) {
    const { language } = React.useContext(LanguageContext)
    const [cityFromInput, setCityFromInput] = React.useState('')
    const [lowPriceFromInput, setLowPriceFromInput] = React.useState('')
    const [highPriceFromInput, setHighPriceFromInput] = React.useState('')
    const [conditionFromInput, setConditionFromInput] = React.useState('')

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
    setCityFromInput(e.target.value)
    handleCityPriceAndConditionChange(e.target.value, lowPriceFromInput, highPriceFromInput, conditionFromInput)
  }

  function handleSearchByLowPriceFromInput(e) {
    setLowPriceFromInput(e.target.value)
    handleCityPriceAndConditionChange(cityFromInput, e.target.value, highPriceFromInput, conditionFromInput)
  }

  function handleSearchByHighPriceFromInput(e) {
    setHighPriceFromInput(e.target.value)
    handleCityPriceAndConditionChange(cityFromInput, lowPriceFromInput, e.target.value, conditionFromInput)
  }

  function handleSearchByConditionFromInput(e) {
    setConditionFromInput(e.target.value)
    handleCityPriceAndConditionChange(cityFromInput, lowPriceFromInput, highPriceFromInput, e.target.value)
  }
/*
  function onSearch() {
    handleCityPriceAndConditionChange(cityFromInput, lowPriceFromInput, highPriceFromInput, conditionFromInput)
    handleGetItemsByFilter()
  }*/

  function deleteAllFilters() {
    setCityFromInput('')
    setLowPriceFromInput(0)
    setHighPriceFromInput(0)
    setConditionFromInput('')
  }

    return(
        <div className="filterBtnContainer__container">
            <div className="filterBtnContainer__price-wrapper">
              <p className="filterBtnContainer__price-title">Выбрать диапазон цен</p>
              <div className="filterBtnContainer__numbers-container">
                <input 
                    className="filterBtnContainer__input-price"
                    placeholder='от'
                    value={lowPriceFromInput}
                    onChange={handleSearchByLowPriceFromInput}
                >
                </input>
                <input 
                    className="filterBtnContainer__input-price"
                    placeholder='до'
                    value={highPriceFromInput}
                    onChange={handleSearchByHighPriceFromInput}
                >
                </input>
              </div>
              <div className="filterBtnContainer__btn-price" onClick={deleteAllFilters}>Сбросить фильтры</div>
            </div>

            <div className="filterBtnContainer__inputs-container">

              <input 
                className="filterBtnContainer__input-city"
                placeholder='Город'
                value={cityFromInput}
                onChange={handleSearchByCity}
              >
              </input>

              <select 
                className='filterBtnContainer__input' 
                onChange={handleSearchByConditionFromInput}
                value={conditionFromInput}
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
