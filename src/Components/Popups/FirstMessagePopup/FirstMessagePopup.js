import React from 'react'
import '../Popups.css'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/Popups/FirstMessagePopupData'
import { IoMdCloseCircleOutline } from "react-icons/io"

function FirstMessagePopup ({onClose, isOpen, createNewMessage}) {
    const [messageText, setMessageText] = React.useState('')
    const [isMessageText, setIsMessageText] = React.useState(false)
    const [isValid, setIsValid] = React.useState(false)
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

    function handleCreateNewMessage(e) {
        e.preventDefault()
        createNewMessage(messageText)
        setIsMessageText(false)
        setMessageText('')
    }

    function handleMessageText(e) {
      if(!e.target.value) {
        setIsMessageText(false)
        setMessageText('')
      }else {
        setIsMessageText(true)
        setMessageText(e.target.value)
      }
    }    

    React.useEffect(() => {
      if(isMessageText) {
        setIsValid(true)
      }else {
        setIsValid(false)
      }
      
    }, [isMessageText])

    return(
        <div className={`popup ${isOpen && 'popup__opened'}`}>
        <div className="popup__container">
            {/*<button 
              className="popup__close-button" 
              type="button" 
              onClick={onClose}>
            </button>*/}
            < IoMdCloseCircleOutline
              className="popup__close-button" 
              type="button" 
              onClick={onClose}
            />
    
        <h2 className="popup__title-ChoiceOfProductOrServicePopup">{translatedContext.popupTitle}</h2>
        <form className='firstMessagePopup__form' onSubmit={handleCreateNewMessage}>
            <textarea 
              className='firstMessagePopup__text' 
              onChange={handleMessageText}
              value={messageText}
            >
            </textarea>
            <button 
              className={isValid? 'firstMessagePopup__btn_active':'firstMessagePopup__btn'} 
              type='sumbit' 
              disabled={!isValid}
            >
              {translatedContext.submitBtn}
            </button>
        </form>  
        </div>
        </div>
    )
}

export default FirstMessagePopup;