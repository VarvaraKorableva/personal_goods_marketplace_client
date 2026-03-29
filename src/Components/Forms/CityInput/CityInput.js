import { useState } from "react";
import { cities } from '../../../const/Cities/citiesKeys'
import '../../Forms/Forms.css'
import './CityInput.css'

function CityInput({label, language, translatedContext, city, setCity, setCity_ru, setCity_en, setCity_he, isCitySelected, setIsCitySelected, cityErrorMessage, setCityErrorMessage, good, realEstate }) {
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value) {
      
      const list = cities.filter(item =>
        item[language].toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(list);
      setShowDropdown(true);
      setIsCitySelected(false);
    } else {
      setFilteredCities([]);
      setShowDropdown(false);
      setIsCitySelected(false);
      setCityErrorMessage(`${translatedContext.errors.cityErrorMessage.errorMessage}`);
    }
  };

  const handleSelectCity = (cityObj) => {
    setCity(cityObj[language]);
    setCity_ru(cityObj.rus);
    setCity_en(cityObj.en);
    setCity_he(cityObj.hebrew);
    setIsCitySelected(true);
    setShowDropdown(false);
    setCityErrorMessage('');
  };

  return (
    <div className="input-container" style={{ position: "relative" }}>
      <label className='inputname'>
        {label} <span className='inputname-span'>*</span> 
      <input
        type="text"
        className="addAdPage__select font"
        placeholder={translatedContext.inputPlace}
        value={city}
        onChange={handleCityChange}
      />
      {showDropdown && filteredCities.length > 0 && (
        <ul
          className="autocomplete-dropdown"
        >
          {filteredCities.map((item, index) => (
            <li
              className="autocomplete-dropdown-city"
              key={index}
              onClick={() => handleSelectCity(item)}
            >
              {item[language]}
            </li>
          ))}
        </ul>
      )}

      {isCitySelected ? (
        <span className='popup__mistake-msg'></span>
      ) : (
        <span className='popup__mistake-msg'>{cityErrorMessage}</span>
      )}
      </label>
    </div>
  );
}

export default CityInput;
