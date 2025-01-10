import { IoMdCloseCircleOutline } from "react-icons/io";
import React from 'react'
import '../Popups.css'

function AreYouSurePopup({onClose, isOpen, deleteMyAd, itemIdDelete}) {
    const item_id = 1

    function handleDeleteAd() {
        deleteMyAd(itemIdDelete)
    }
  
  return (
      
      <div className={`popup ${isOpen && 'popup__opened'}`}>
      <div className="popup__container">
          {/*<button 
            className="popup__close-button" 
            type="button" 
            onClick={onClose}>
          </button>*/} 
          <IoMdCloseCircleOutline 
            className="popup__close-button" 
            type="button" 
            onClick={onClose}
          />
  
      <h2 className="popup__title-ChoiceOfProductOrServicePopup">Вы уверены, что хотите удалить объявление?</h2>
      <div className='popup__container-ChoiceOfProductOrServicePopup'>
          <button onClick={handleDeleteAd} className='popup_choice_btn' type="button">Да</button>
          <button onClick={onClose} className='popup_choice_btn' type="button">Нет</button>
      </div> 
      </div>
      </div>
    )
  }
export default AreYouSurePopup