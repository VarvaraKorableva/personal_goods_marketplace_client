import React from 'react'
import '../Popups.css'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/Popups/Popup'
import { IoMdCloseCircleOutline } from "react-icons/io";

function ChoiceOfProductOrServicePopup({onClose, isOpen, onAdBtn}) {

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

  function handleGoodBtn() {
    const data = true
    onAdBtn(data)
  }

  function handleServicesBtn() {
    const data = false
    onAdBtn(data)
  }

return (
    
    <div className={`popup ${isOpen && 'popup__opened'}`}>
    <div className="popup__container">
        <IoMdCloseCircleOutline 
          className="popup__close-button" 
          type="button" 
          onClick={onClose}
        />
    <h2 className="popup__title-ChoiceOfProductOrServicePopup">{translatedContext.chooseListingTypePopup.popupTitle}</h2>
    <div className='popup__container-ChoiceOfProductOrServicePopup'>
        <button onClick={handleGoodBtn} className='popup_choice_btn'>{translatedContext.chooseListingTypePopup.goodsBtn}</button>
        <button onClick={handleServicesBtn} className='popup_choice_btn'>{translatedContext.chooseListingTypePopup.servicesBtn}</button>
    </div>  
    </div>
    </div>
  )
}

export default ChoiceOfProductOrServicePopup;