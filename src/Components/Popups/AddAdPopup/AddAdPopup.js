import React from 'react'
import '../Popups.css'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/Popups/addAdPopup'

function AddAdPopup({onClose, isOpen, onAddDream}) {
    /*
    title, owner_id, category_id, city_id, 
    price, size, color, condition, 
    year_of_manufacture, description
    */

  const [isValid, setIsValid] = React.useState(false)
  const [errorNameMessage, setErrorNameMessage] = React.useState('')
  const [errorImgMessage, setErrorImgMessage] = React.useState('')
  const [errorPriceMessage, setErrorPriceMessage] = React.useState('')
  const [errorDreamLinkMessage, setErrorDreamLinkMessage] = React.useState('')
  
  const [luckyMessage, setLuckyMessage] = React.useState('')

  const [errorName, setErrorName] = React.useState(true)
  const [errorImg, setErrorImg] = React.useState(true)
  const [errorPrice, setErrorPrice] = React.useState(true)
  const [errorDreamLink, setErrorDreamLink] = React.useState(true)

  const [name, setName] = React.useState('')
  const [img, setImg] = React.useState(null)
  const [price, setPrice] = React.useState('')
  const [dreamLink, setDreamLink] = React.useState('')
  const [buttonText, setButtonText] = React.useState('Upload picture');

  const addDreamRef = React.useRef(null);

  const currentUser = React.useContext(CurrentUserContext)
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

  React.useEffect(() => {
    setButtonText(translatedContext.img.buttonTextUploadPictureOfYourDream);
  }, [isOpen]);

  const formRef = React.useRef(null);

  function handleImgLinkChange(e) {
    setImg(e.target.files[0]);
  }

  function handleDreamLinkChange(e) {
    /*const validLink = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/;
    const inputLink = e.target.value;
    
    if (validLink.test(inputLink)) {
      setDreamLink(inputLink);
      setErrorDreamLink(false);
      setErrorDreamLinkMessage('');
    } else if (e.target.value === ""){
      setErrorDreamLink(false);
      setErrorDreamLinkMessage('');
      setDreamLink('');
    } else {
      setErrorDreamLink(true);
      setErrorDreamLinkMessage(translatedContext.errorDreamLinkMessage.invalidLink);
      setDreamLink('');
    }*/
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (img) {
      const userId = currentUser._id;
      const formData = new FormData();
      
      formData.append('userId', userId);
      formData.append('name', name);
      formData.append('image', img);
      formData.append('price', price);
      formData.append('dreamLink', dreamLink);
  
      onAddDream(formData);


      setName('')
      setImg(null)
      setPrice('')
      setDreamLink('')

      setErrorName(true)
      setErrorImg(true)
      setErrorPrice(true)
      setErrorDreamLink(true)
      onClose()
      handleFormReset()
      setIsValid(false)
    } else {
      console.log('Файл не выбран');
    }
  }

  const handleFormReset = () => {
    formRef.current.reset();
  };

  const handleNameChange = (e) => {
    /*const validName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u.test(
      e.target.value
    )
    if (!e.target.value.length) {
      setErrorNameMessage(translatedContext.errorNameMessage.nameFieldMustBeFilledIn)
      setErrorName(true);
      setIsValid(false)
     } else if (e.target.value.length < 2) {
      setErrorNameMessage(translatedContext.errorNameMessage.nameMustBeAtLeastCharactersLong)
      setErrorName(true);
      setIsValid(false)
     } else if (!validName) {
      setErrorNameMessage(translatedContext.errorNameMessage.nameShouldOnlyContainLatinLettersCyrillicLettersSpacesOrHyphens)
      setErrorName(true);
      setIsValid(false)
     } else if (e.target.value.length > 30) {
      setErrorNameMessage(translatedContext.errorNameMessage.nameShouldNotExceedCharacters)
      setErrorName(true);
      setIsValid(false)
     } else {
      setErrorNameMessage('')
      setErrorName(false);
     }
     setName(e.target.value[0].toUpperCase() + e.target.value.slice(1));*/
  }

  const handlePriceChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = Number(inputValue);
  
    if (isNaN(numericValue) || inputValue.includes(' ')) {
      setErrorPriceMessage(translatedContext.errorPriceMessage.OnlyNumericInputIsAllowed);
      setErrorPrice(true);
      setIsValid(false)
    } else if (inputValue < 0 || inputValue === '-0') {
      setErrorPriceMessage(translatedContext.errorPriceMessage.PriceCannotBeNegative);
      setErrorPrice(true);
      setIsValid(false)
    } else if (inputValue.startsWith('0')) {
      setErrorPriceMessage(translatedContext.errorPriceMessage.PriceCannotStartWith);
      setErrorPrice(true);
      setIsValid(false)
    } else if (inputValue.length > 15) {
      setErrorPriceMessage(translatedContext.errorPriceMessage.FieldCannotExceedCharacters);
      setErrorPrice(true);
      setIsValid(false)
    } else if (e.target.value.length < 1) {
      setErrorPriceMessage(translatedContext.errorPriceMessage.FieldMustBeFilledIn);
      setErrorPrice(true);
      setIsValid(false)
    } else {
      setErrorPriceMessage('');
      setErrorPrice(false);
      setPrice(e.target.value.replaceAll(' ', '')) //чтобы создать расстояние между цифрами- 20 000
    }
  };

  function checkValid(img) {
  /*if (!img) {
    return setIsValid(false)
    //setImg(null)
    
  }

  const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
  const isValidExtension = allowedExtensions.test(img.name);

  if (!isValidExtension) {
    setImg(null)
    setErrorImg(true);
    setErrorImgMessage(translatedContext.img.errorImgMessage);
    setButtonText(translatedContext.img.buttonTextUploadPictureOfYourDream)
    //setIsValid(false);
  } else {
    setErrorImg(false);
    setErrorImgMessage('');
    setButtonText(translatedContext.img.buttonTextUploaded)
  }*/
}

React.useEffect(() => {
  checkValid(img)
}, [img]);

React.useEffect(() => {
  if (errorName || errorImg || errorPrice) {
    setIsValid(false)
  } else {
    setIsValid(true)
  }
}, [errorPrice, errorName, errorImg])

return (
    
    <div className={`add-dream-popup ${isOpen && 'add-dream-popup__opened'}`}>

    <div className="add-dream-popup__container">
    <button 
      className="add-dream-popup__close-button" 
      type="button" 
      onClick={onClose}>
    </button>
    <h2 className="add-dream-popup__title">{translatedContext.popupName}</h2>
      <form 
        ref={formRef}
        className='add-dream-popup__form'
        onSubmit={handleSubmit}
        encType="multipart/form-data">
        <label className='add-dream-popup__inputname'>{translatedContext.nameOfDream}<span className='add-dream-popup__inputname-span'>*</span>  
          <input
            className='add-dream-popup__input'
            name='name'
            type='text'
            onInput={handleNameChange}
            onChange={handleNameChange}
          ></input>
        </label>
        <span className='add-dream-popup__inputmistake'>{errorNameMessage}</span>
        <label className='add-dream-popup__inputname'>{translatedContext.linkToDream}
          <input
            className='add-dream-popup__input'
            name='dreamLink'
            type='url'
            onInput={handleDreamLinkChange}
            onChange={handleDreamLinkChange}
          ></input>
         </label>
        <span className='add-dream-popup__inputmistake'>{errorDreamLinkMessage}</span>
        <label className='add-dream-popup__inputname'>{translatedContext.priceOfDream}<span className='add-dream-popup__inputname-span'>*</span>
          <input
            className='add-dream-popup__input'
            name='price'
            type='text'
            onInput={handlePriceChange}
            onChange={handlePriceChange}
          ></input>
        </label>
        <span className='add-dream-popup__inputmistake'>{errorPriceMessage}</span>
        <label className='add-dream-popup__inputname'>{translatedContext.pictureOfDream}<span className='add-dream-popup__inputname-span'>*</span>
        <button 
          onClick={() => addDreamRef.current.click()}
          className='add-dream-popup__input-btn'
          type="button">
            {buttonText}
        </button> 
        
        <input
          ref={addDreamRef}
          className='add-dream-popup__input'
          name='image'
          type="file"
          onChange={handleImgLinkChange}
          hidden
        ></input>

        </label>
        <span className='add-dream-popup__inputmistake'>{errorImgMessage}</span>
        <button 
          className={`${isValid? 'add-dream-popup__btn_active': 'add-dream-popup__btn'}`}
          type='submit'
          disabled={!isValid}  
          >
            {translatedContext.createButton}
        </button>
      </form>  
    </div>
    </div>
  )
}

export default AddAdPopup;