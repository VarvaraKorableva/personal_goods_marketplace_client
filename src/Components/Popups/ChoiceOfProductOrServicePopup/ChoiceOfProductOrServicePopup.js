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
    onClose()
  }

  function handleServicesBtn() {
    const data = false
    onAdBtn(data)
    onClose()
  }

  function handleRealEstateBtn() {
    const data = true
    const realEstate = true
    onAdBtn(data, realEstate)
    onClose()
  }

return (
    
    <div className={`popup ${isOpen && 'popup__opened'}`}>
    <div className="popup__container">
    <div className='popup__container-ChoiceOfProductOrServicePopup'>

        <IoMdCloseCircleOutline 
          className="popup__close-button" 
          type="button" 
          onClick={onClose}
        />
    <h2 className="popup__title_black">{translatedContext.chooseListingTypePopup.popupTitle}</h2>
    
        <button onClick={handleGoodBtn} className='popup__reason font'>{translatedContext.chooseListingTypePopup.goodsBtn}</button>
        <button onClick={handleServicesBtn} className='popup__reason font'>{translatedContext.chooseListingTypePopup.servicesBtn}</button>
        <button onClick={handleRealEstateBtn} className='popup__reason font'>{translatedContext.chooseListingTypePopup.realEstateBtn}</button>
    </div>  
    </div>
    </div>
  )
}

export default ChoiceOfProductOrServicePopup;