import React from 'react'
import '../Popups.css'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/Popups/addAdPopup'

function AddAdPopup({onClose, isOpen, onAddAd, categories}) {
  const currentUser = React.useContext(CurrentUserContext)
  const owner_id = currentUser.user_id

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
  
  const [selectedCategoryId, setSelectedCategoryId] = React.useState()
  const [title, setTitle] = React.useState('')
  const [city, setCity] = React.useState('')
  const [img, setImg] = React.useState(null)
  const [price, setPrice] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [size, setSize] = React.useState('')
  const [color, setColor] = React.useState('')
  const [condition, setCondition] = React.useState('')
  //const [owner_id, setOwner_id] = React.useState(currentUser.user_id)

  const [buttonText, setButtonText] = React.useState('Upload picture');

  const addDreamRef = React.useRef(null);

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
/*
  React.useEffect(() => {
    setButtonText(translatedContext.img.buttonTextUploadPictureOfYourDream);
  }, [isOpen]);

  const formRef = React.useRef(null);*/

  function handleImgLinkChange(e) {
    setImg(e.target.files[0]);
  }

  function handledesDriptionChange(e) {
    setDescription(e.target.value)
  }
 
  function handleSubmit(e) {

    e.preventDefault();
      onAddAd({
        title,
        owner_id,
        category_id: Number(selectedCategoryId),
        city,
        price,
        description,
        size, 
        color, 
        condition,
      });
  }
/*
  const handleFormReset = () => {
    formRef.current.reset();
  };*/

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handlePriceChange = (e) => {
    setPrice(e.target.value)
    /*const inputValue = e.target.value;
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
    }*/
  };

  const handleCityChange = (e) => {
    setCity(e.target.value)
  }

  const handleSelectChange = (e) => {
    setSelectedCategoryId(e.target.value)
  };

  function checkValid(img) {
}
/*
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
*/
return (
    
    <div className={`popup ${isOpen && 'popup__opened'}`}>

    <div className="popup__container">
    <button 
      className="popup__close-button" 
      type="button" 
      onClick={onClose}>
    </button>
    <h2 className="popup__title">{translatedContext.popupName}</h2>
      <form 
        className='popup__form'
        onSubmit={handleSubmit}>
        <label className='popup__inputname'>Choise category<span className='popup__inputname-span'>*</span></label> 

        <select className='popup__select' onChange={handleSelectChange}>
          {categories.filter((category) => (category.is_good)).map((item) => (
            <option key={item.category_id} value={item.category_id}>{item.name}</option>
          ))}
        </select>

        <label className='popup__inputname'>{translatedContext.nameOfDream}<span className='popup__inputname-span'>*</span>  
          <input
            className='popup__input'
            name='title'
            type='text'
            value={title}
            //onInput={handleTitleChange}
            onChange={handleTitleChange}
          ></input>
        </label>
        <span className='popup__inputmistake'>{errorNameMessage}</span>

        <label className='popup__inputname'>Add a description here</label>
          <input
            className='popup__input'
            name='description'
            type='text'
            value={description}
            //onInput={handledesDriptionChange}
            onChange={handledesDriptionChange}
          ></input>
         
        <span className='popup__inputmistake'>{errorDreamLinkMessage}</span>

        <label className='popup__inputname'>Price<span className='popup__inputname-span'>*</span>
          <input
            className='popup__input'
            name='price'
            type='text'
            value={price}
            //onInput={handlePriceChange}
            onChange={handlePriceChange}
          ></input>
        </label>
        <span className='popup__inputmistake'>{errorPriceMessage}</span>

        <label className='popup__inputname'>Where can you give the goods (city)<span className='popup__inputname-span'>*</span>
          <input
            className='popup__input'
            name='city'
            type='text'
            value={city}
            //onInput={handleCityChange}
            onChange={handleCityChange}
          ></input>
        </label>
        <span className='popup__inputmistake'>{errorPriceMessage}</span>

        <label className='popup__inputname'>Add pictures</label>
        <button 
          onClick={() => addDreamRef.current.click()}
          className='popup__input-btn'
          type="button">
            {buttonText}
        </button> 
        
        <input
          ref={addDreamRef}
          className='popup__input'
          name='image'
          type="file"
          onChange={handleImgLinkChange}
          hidden
        ></input>

        <span className='popup__inputmistake'>{errorImgMessage}</span>
        <button 
          className= 'popup__btn_active'
          type='submit'
          >
            {translatedContext.createButton}
        </button>
      </form>  
    </div>
    </div>
  )
}

export default AddAdPopup;

//disabled={!isValid}
//className={`${isValid? 'add-ad-popup__btn_active': 'add-ad-popup__btn'}`}