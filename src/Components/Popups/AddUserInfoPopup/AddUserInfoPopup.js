import React from 'react'
import '../Popups.css'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/AddAdPageData'
import { IoMdCloseCircleOutline } from "react-icons/io"
import { cities } from '../../../const/Cities/cities'
import { conditions } from '../../../const/Сonditions/Сonditions'


function AddUserInfoPopup ({
  onClose, isOpen,
}) {
    const [text, setText] = React.useState('')
    const [isMessageText, setIsMessageText] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState('')
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

    function handleOnClose() {
      onClose()
      setIsMessageText(false)
      setErrorMessage('')
      setText('')
    }

    function onEditBtn(e) {
        e.preventDefault()

        setIsMessageText(false)
        setText('')
    }
   

    function handleTelegramChange(e) {
      if(e.target.value.length > 30) {
        setIsMessageText(false)
        setErrorMessage('Длинна телеграмма не может превышать 30 символов')
      } else if(e.target.value) {
        setIsMessageText(true)
        setErrorMessage('')
        setText(e.target.value)
      } else {
        setIsMessageText(true)
        setErrorMessage('')
        setText('')
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
            <IoMdCloseCircleOutline
              className="popup__close-button" 
              type="button" 
              onClick={handleOnClose}
            />
        <form className='editItemPopup__form' onSubmit={onEditBtn}>
            <label className='editItemPopup__title'>
              Добавить телеграм
            </label>

              <>
              <input 
                className='popup__input'
                onChange={handleTelegramChange} 
                value={text}
              >
              </input>
              <span className='popup__mistake-msg'>{errorMessage}</span>
              </>

            <button 
              className={isValid? 'firstMessagePopup__btn_active':'firstMessagePopup__btn'} 
              type='sumbit' 
              disabled={!isValid}
            >
              {`${translatedContext.editPopupBtn.changeBtn}`}
            </button>
        </form>  
        </div>
        </div>
    )
}

export default AddUserInfoPopup;