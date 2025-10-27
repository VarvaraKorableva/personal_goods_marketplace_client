import React from 'react'
import '../Popups.css'
import {LanguageContext} from '../../../contexts/TranslationContext'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'
import choose from '../../../const/AddAdPageData'
import { IoMdCloseCircleOutline } from "react-icons/io"
import { cities } from '../../../const/Cities/cities'
import { conditions } from '../../../const/Сonditions/Сonditions'
import EditField from "./EditField";

function EditPopup ({
  onClose, isOpen, title, 
  updateItemCity, updatePrice, 
  updateDescription, updateCondition, popupEditItemId, updateTelegram,
}) {
    const [text, setText] = React.useState('')
    const [isMessageText, setIsMessageText] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState('')
    const [isValid, setIsValid] = React.useState(false)
    const currentUser = React.useContext(CurrentUserContext)
    const userId = currentUser.user_id
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
        if(title === "condition"){
          updateCondition(popupEditItemId, text)
        } else if(title === "city") {
          updateItemCity(popupEditItemId, text)
        } else if(title === "price") {
          updatePrice(popupEditItemId, text)
        } else if(title === "description") {
          updateDescription(popupEditItemId, text)
        } else if(title === "telegram") {
          updateTelegram(userId, text)
        }
        setIsMessageText(false)
        setText('')
    }

    function handleChange(e) {
      const value = e.target.value;
      setText(value);
  
      if (!value) {
        setIsValid(false);
        return;
      }
  
      // простая валидация для телеграма
      if (title === "telegram" && value.length > 50) {
        setErrorMessage("Длина Telegram не может превышать 50 символов");
        setIsValid(false);
        return;
      }
  
      // простая валидация для цены
      if (title === "price" && !/^\d+$/.test(value)) {
        setErrorMessage("Цена должна содержать только цифры");
        setIsValid(false);
        return;
      }
  
      setErrorMessage("");
      setIsValid(true);
    }
/*
    function handleEditInfo(e) {
      if(!e.target.value) {
        setIsMessageText(false)
        setText('')
      }else {
        setIsMessageText(true)
        setText(e.target.value)
      }
    }    

    const handlePriceChange = (e) => {
      if (!e.target.value) {
        setIsMessageText(false)
        setErrorMessage(`${translatedContext.errors.priceErrorMessage.errorMessage}`)
        setText('')
      } else if(!(/^\d*$/.test(e.target.value))) {
        setIsMessageText(false)
        setErrorMessage(`${translatedContext.errors.priceErrorMessage.errorMessageOnlyNumbers}`)
      } else if (e.target.value.length > 10) {
        setIsMessageText(false)
        setErrorMessage(`Цена не может содержать более 10 цифр`)
      } else {
        setIsMessageText(true)
        setText(e.target.value)
        setErrorMessage('')
      }
    };

    function handledesDriptionChange(e) {
      if(e.target.value.length > 900) {
        setIsMessageText(false)
        setErrorMessage('Длинна описания не может превышать 900 символов')
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

    function handledeTelegramChange(e) {
      if(e.target.value.length > 50) {
        setIsMessageText(false)
        setErrorMessage('Длинна telegram не может превышать 50 символов')
      } else if(e.target.value) {
        setIsMessageText(true)
        setErrorMessage('')
        setText(e.target.value)
      } else {
        setIsMessageText(true)
        setErrorMessage('')
        setText('')
      }
    }*/


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
              {translatedContext.changeBtn} {`${translatedContext.titles[title]}`}
            </label>
            {/*}
            {title === 'condition'? 
            <select 
            className='addAdPage__select' 
            onChange={handleEditInfo}
            value={text}
            >

            <option value="">{translatedContext.condition}</option>
    
              {language === 'rus' ?
                conditions.rus.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))
                
                :
                conditions.en.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))
              }
            </select>
            : 
            (title === 'city'? 
              
              <select 
                className='addAdPage__select' 
                onChange={handleEditInfo}
                value={text}
              >
              <option value="">{translatedContext.place}</option>

              {language === 'rus' ?
                cities.rus.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))
            
              :
                cities.en.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))
              }
              </select> 
            : (
              title === 'price' ?
              <>
              <input 
                className='input'
                onChange={handlePriceChange} 
                value={text}
              >
              </input>
              <span className='popup__mistake-msg'>{errorMessage}</span>
              </>
              :
              <>
              <textarea 
                className='firstMessagePopup__text'
                onChange={handledesDriptionChange} 
                value={text}
              />
              <span className='popup__mistake-msg'>{errorMessage}</span>
              </>
            ))}*/}
            <EditField
              title={title}
              language={language}
              text={text}
              onChange={handleChange}
              errorMessage={errorMessage}
            />

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

export default EditPopup;