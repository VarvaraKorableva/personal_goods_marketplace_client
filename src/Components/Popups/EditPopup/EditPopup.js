import React from 'react'
import '../Popups.css'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/AddAdPageData'
import { IoMdCloseCircleOutline } from "react-icons/io"
import { cities } from '../../../const/Cities/cities'
import { conditions } from '../../../const/Сonditions/Сonditions'

function EditPopup ({onClose, isOpen, title}) {//, onSubmitFunction
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

    function onEditBtn(e) {
        e.preventDefault()
        //onSubmitFunction(text)
        console.log(text)
        setIsMessageText(false)
        setText('')
    }

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
              onClick={onClose}
            />
        <form className='firstMessagePopup__form' onSubmit={onEditBtn}>
            <label className='editItemPopup__title'>Изменить {title}</label>
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
            : 
              <>
              <input 
                className='popup__input' 
                //onChange={handleEditInfo}
                onChange={title === 'price' ? handlePriceChange : handleEditInfo} 
                value={text}
              >
              </input>
              <span className='popup__mistake-msg'>{errorMessage}</span>
              </>
            )}

            <button 
              className={isValid? 'firstMessagePopup__btn_active':'firstMessagePopup__btn'} 
              type='sumbit' 
              disabled={!isValid}
            >
              Изменить
            </button>
        </form>  
        </div>
        </div>
    )
}

export default EditPopup;