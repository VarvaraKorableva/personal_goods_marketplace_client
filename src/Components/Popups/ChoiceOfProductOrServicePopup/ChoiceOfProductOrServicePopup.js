import React from 'react'
import '../Popups.css'

function ChoiceOfProductOrServicePopup({onClose, isOpen, onAdBtn}) {

return (
    
    <div className={`popup ${isOpen && 'popup__opened'}`}>

    <div className="popup__container">
    <button 
      className="popup__close-button" 
      type="button" 
      onClick={onClose}>
    </button>
    <h2 className="popup__title-ChoiceOfProductOrServicePopup">What ad would you like to add?</h2>
    <div className='popup__container-ChoiceOfProductOrServicePopup'>
        <button onClick={onAdBtn} className='popup_choice_btn'>Goods</button>
        <button className='popup_choice_btn'>Services</button>
    </div>  
    </div>
    </div>
  )
}

export default ChoiceOfProductOrServicePopup;