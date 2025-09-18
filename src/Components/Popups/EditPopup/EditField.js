import React from "react";
import { cities } from "../../../const/Cities/cities";
import { conditions } from "../../../const/Сonditions/Сonditions";
import '../Popups.css'

function EditField({ title, language, text, onChange, errorMessage }) {
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
    const options = language === "rus" ? cities.rus : cities.en;
    return (
      <select className="addAdPage__select" onChange={onChange} value={text}>
        <option value="">
          {language === "rus" ? "Выберите город" : "Choose city"}
        </option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  }

  if (title === "price") {
    return (
      <>
        <input
          className="popup__input"
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
          className="popup__input"
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
