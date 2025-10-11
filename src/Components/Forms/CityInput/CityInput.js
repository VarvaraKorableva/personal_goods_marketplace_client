import { useState } from "react";
import { cities } from '../../../const/Cities/cities'
import './CityInput.css'

function CityInput({ language, translatedContext, city, setCity, isCitySelected, setIsCitySelected, cityErrorMessage, setCityErrorMessage }) {
  const [filteredCities, setFilteredCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value) {
      const list = (language === "rus" ? cities.rus : cities.en).filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(list);
      setShowDropdown(true);
      setIsCitySelected(false); // пока пользователь не выбрал из списка
      setCityErrorMessage('');
    } else {
      setFilteredCities([]);
      setShowDropdown(false);
      setIsCitySelected(false);
      setCityErrorMessage(`${translatedContext.errors.cityErrorMessage.errorMessage}`);
    }
  };

  const handleSelectCity = (cityName) => {
    setCity(cityName);
    setIsCitySelected(true);
    setShowDropdown(false);
    setCityErrorMessage('');
  };

  return (
    <div className="city-autocomplete" style={{ position: "relative" }}>
       <label className='popup__inputname'>{translatedContext.place}<span className='popup__inputname-span'>*</span> 
      <input
        type="text"
        className="addAdPage__select"
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
              {item}
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
