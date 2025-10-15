//ImagePopup
import React from 'react';
import '../Popups.css'
import { IoMdCloseCircleOutline } from "react-icons/io"

function ImagePopup({ imgLink, onClose, isOpen }) {

  return (
    <aside className={`popup ${isOpen ? 'popup__opened' : ''}`}>
      <div className="popup__picture-container">
        <div>
            < IoMdCloseCircleOutline
              className="popup__close-button" 
              type="button" 
              onClick={onClose}
            />
          <img src={imgLink}
            alt='pic'
            className='popup__picture'
            
          />
        </div>
      </div>
    </aside>
  );
}
  
export default ImagePopup;