import React from 'react'
import '../Popups.css'

function ChoiceOfProductOrServicePopup({onClose, isOpen, onAdBtn}) {

return (
    
    <div className={`add-dream-popup ${isOpen && 'add-dream-popup__opened'}`}>

    <div className="add-dream-popup__container">
    <button 
      className="add-dream-popup__close-button" 
      type="button" 
      onClick={onClose}>
    </button>
    <h2 className="add-dream-popup__title"></h2>
    <div className='add-dream-popup__form'>
        <button onClick={onAdBtn}>Goods</button>
        <button>Services</button>
    </div>  
    </div>
    </div>
  )
}

export default ChoiceOfProductOrServicePopup;