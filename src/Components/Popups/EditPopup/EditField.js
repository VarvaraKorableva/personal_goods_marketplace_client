import React from "react";
import { cities } from "../../../const/Cities/citiesKeys";
import { conditions } from "../../../const/Сonditions/Сonditions";
import '../Popups.css'

function EditField({ title, language, text, onChange, errorMessage }) {

  const langKey = {
    rus: "rus",
    en: "en",
    hebrew: "hebrew",
  };

  if (title === "condition") {
    const options = language === "rus" ? conditions.rus : conditions.en;
    return (
      <select className="addAdPage__select" onChange={onChange} value={text}>
        <option value="">
          {language === "rus" ? "Выберите состояние" : "Choose condition"}
        </option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  }

  if (title === "city") {
    return (
      <select className="addAdPage__select" onChange={onChange} value={text}>
        <option value="">
          {language === "rus"
            ? "Выберите город"
            : language === "hebrew"
            ? "בחר עיר"
            : "Choose city"}
        </option>
  
        {cities.map((city) => {
          const value = city[langKey[language]] || city.en;

        return (
          <option key={value} value={value}>
            {value}
          </option>
  );
})}

      </select>
    );
  }

  if (title === "price") {
    return (
      <>
        <input
          className="input"
          onChange={onChange}
          value={text}
          placeholder={language === "rus" ? "Введите цену" : "Enter price"}
        />
        <span className="popup__mistake-msg">{errorMessage}</span>
      </>
    );
  }

  if (title === "telegram") {
    return (
      <>
        <input
          className="input"
          onChange={onChange}
          value={text}
          placeholder={language === "rus" ? "Введите Telegram" : "Enter Telegram"}
        />
        <span className="popup__mistake-msg">{errorMessage}</span>
      </>
    );
  }

  // fallback — описание
  return (
    <>
      <textarea
        className="firstMessagePopup__text"
        onChange={onChange}
        value={text}
        placeholder={language === "rus" ? "Введите описание" : "Enter description"}
      />
      <span className="popup__mistake-msg">{errorMessage}</span>
    </>
  );
}

export default EditField;
