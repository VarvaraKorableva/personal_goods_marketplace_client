import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import '../Popups.css'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/Popups/Popup'

function AreYouSurePopup({onClose, isOpen, deleteMyAd, itemIdDelete}) {
  const [selectedReason, setSelectedReason] = useState('');
  const [valid, setValid] = useState(false);

  const { language, changeLanguage } = React.useContext(LanguageContext)

  const { en, rus, hebrew } = choose;

  let translatedContext = '';
    if (language === 'en') {
      translatedContext = en;
    } else if (language === 'rus') {
      translatedContext = rus;
    } else if (language === 'hebrew') {
      translatedContext = hebrew;
  }
  function handleDeleteAd() {
    deleteMyAd(itemIdDelete, selectedReason);
  }

  useEffect(() => {
    if (!selectedReason) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [selectedReason]);
  
  return (
    <div className={`popup ${isOpen && 'popup__opened'}`}>
      <div className="popup__container">
        <IoMdCloseCircleOutline 
          className="popup__close-button" 
          type="button" 
          onClick={onClose}
        />

        <div className="popup__reasons-wrapper">
          <h2 className="popup__title_black">
          {translatedContext.areYouSurePopup.popupTitle}
            {/*Выберите причину, по которой вы удаляете объявление:*/}
          </h2>
          <div className="popup__reasons-container">
            {translatedContext.areYouSurePopup.reasons.map((reason, i) => (
              <div
                key={i}
                className={`popup__reason font ${selectedReason === reason ? 'popup__reason_selected' : ''}`}
                onClick={() => setSelectedReason(reason)}
              >
                <span>{reason}</span>
                {selectedReason === reason && (
                  <FaCheckCircle className="popup__reason-check" />
                )}
              </div>
            ))}
          </div>
          <div className='popup_choice_btn_container'>
            <button 
              onClick={handleDeleteAd} 
              className={`popup_choice_btn_disabled ${valid ? 'popup_choice_btn' : ''}`} 
              type="button" 
              disabled={!valid}
            >
              {translatedContext.areYouSurePopup.deleteBtn}
            </button>
            <button onClick={onClose} className='popup_choice_btn' type="button">
              {translatedContext.areYouSurePopup.cancelBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AreYouSurePopup;

/*
{translatedContext.areYouSurePopup.reasons}
    areYouSurePopup: {
      popupTitle: 'Выберите причину, по которой вы удаляете объявление:',
      deleteBtn: 'Удалить',
      cancelBtn: 'Отмена',
      reasons: [
        'Продал на «ГУДС»',
        'Продал где-то еще',
        'Передумал продавать',
        'Другая причина'
      ],

*/