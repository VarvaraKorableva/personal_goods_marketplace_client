import React from 'react'
import '../Popups.css'
import { IoMdCloseCircleOutline } from "react-icons/io"

function  SuccessfulActionPopup({onClose, isOpen, popupMessage}) {

return (
    
  <div className={`popup ${isOpen && 'popup__opened'}`}>
    <div className="popup__container">
        {/*<button 
            className="popup__close-button-successfulActionPopup" 
            type="button" 
            onClick={onClose}>
        </button>*/}
        <IoMdCloseCircleOutline 
            className="popup__close-button-successfulActionPopup" 
            type="button" 
            onClick={onClose} 
        />
    
        <div className='popup__message-container'>
            <h2>{popupMessage}</h2>
        </div>  
    </div>
  </div>
)
}

export default  SuccessfulActionPopup;