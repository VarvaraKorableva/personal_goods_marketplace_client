import React from 'react'
import './AddAdPage.css'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/Popups/addAdPopup'

function AddAdPage({onAddAd, categories, isGood, isLoggin}) {
  const currentUser = React.useContext(CurrentUserContext)
  const owner_id = currentUser.user_id
  
  //const [isValid, setIsValid] = React.useState(false)
  const [errorNameMessage, setErrorNameMessage] = React.useState('')
  const [errorImgMessage, setErrorImgMessage] = React.useState('')
  const [errorPriceMessage, setErrorPriceMessage] = React.useState('')
  const [errorDreamLinkMessage, setErrorDreamLinkMessage] = React.useState('')
  
  const [luckyMessage, setLuckyMessage] = React.useState('')

  const [errorName, setErrorName] = React.useState(true)
  const [errorImg, setErrorImg] = React.useState(true)
  const [errorPrice, setErrorPrice] = React.useState(true)
  const [errorDreamLink, setErrorDreamLink] = React.useState(true)
  
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(null)
  const [selectedSubCategoryId, setSelectedSubCategoryId] = React.useState(null)

  const [subCategory, setSubCategory] = React.useState([])

  const [thirdSubCategory, setThirdSubCategory] = React.useState([])
  const [thirdSubCategoryId, setThirdSubCategoryId] = React.useState(null)
  const [thirdCategoryId, setThirdCategoryId] = React.useState(null)

  const [title, setTitle] = React.useState('')
  const [city, setCity] = React.useState('')
  const [img, setImg] = React.useState(null)
  const [price, setPrice] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [size, setSize] = React.useState('')
  const [color, setColor] = React.useState('')
  const [condition, setCondition] = React.useState('')

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

  function handleImgLinkChange(e) {
    setImg(e.target.files[0]);
  }

  function handledesDriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    let id = null
    if(selectedSubCategoryId === null || selectedSubCategoryId === ""){
      id = Number(selectedCategoryId)
    } 
    else 
    {id = Number(selectedSubCategoryId)}

      onAddAd({
        title,
        owner_id: owner_id,
        category_id: Number(selectedCategoryId),
        city,
        price,
        description,
        size, 
        color, 
        condition,
      });

      setSelectedCategoryId(null)
      setSelectedSubCategoryId(null)
      setTitle('')
      setCity('')
      setImg(null)
      setPrice('')
      setDescription('')
      setSize('')
      setColor('')
      setCondition('')
  }

  function handleServicesSubmit(e) {
    e.preventDefault();
    let id = null
    if(thirdCategoryId === null || thirdCategoryId === ""){
      id = Number(thirdSubCategoryId)
    } 
    else 
    {id = Number(thirdCategoryId)}

      onAddAd({
        title,
        owner_id: owner_id,
        category_id: Number(thirdSubCategoryId),
        city,
        price,
        description,
        size, 
        color, 
        condition,
      });

      setSelectedCategoryId(null)
      setSelectedSubCategoryId(null)
      setThirdSubCategoryId(null)
      setThirdCategoryId(null)
      setTitle('')
      setCity('')
      setImg(null)
      setPrice('')
      setDescription('')
      setSize('')
      setColor('')
      setCondition('')
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handlePriceChange = (e) => {
    setPrice(e.target.value)
  };

  const handleCityChange = (e) => {
    setCity(e.target.value)
  }

  const handleSelectChange = (e) => {
    setSelectedCategoryId(e.target.value)
    setSubCategory(categories.filter((category) => category.parent_id == e.target.value))
  };

  const handleSelectServicesChange = (e) => {
    setThirdSubCategoryId(e.target.value)
    setThirdSubCategory(categories.filter((category) => category.parent_id == e.target.value))
  };

  const handleThirdCategoryIdChange = (e) => {
    setThirdCategoryId(e.target.value)
  }

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategoryId(e.target.value)
  }

  React.useEffect(() => {
    if (isGood === false) {
        setSelectedCategoryId(categories.filter((category) => category.is_good === false))
        console.log(categories.filter((category) => category.is_good === false))
        //setSubCategory(categories.filter((category) => category.parent_id == e.target.value))
    } 
  }, [])

return (
    
    <section className="addAdPage__section">
    {isGood?
    <>
    <h2 className="addAdPage__title">Ad new good</h2>
    <form 
      className='addAdPage__form'
      onSubmit={handleSubmit}>
      <label className='popup__inputname'>Choise a category<span className='popup__inputname-span'>*</span></label> 

      <select className='popup__select' onChange={handleSelectChange}>
        <option value="">Select a category</option>
          {categories.filter((category) => (category.is_good && (category.parent_id === null))).map((item) => (
            <option key={item.category_id} value={item.category_id}>{item.name}</option>
          ))}
      </select>

      <label className='popup__inputname'>Choise a sub category</label>
      <select className='popup__select' onChange={handleSubCategoryChange}>
        <option value="">Select a sub category</option>
          {subCategory
            .filter((category) => category.is_good && category.parent_id !== null) // Фильтруем по is_good и наличию родительской категории
            .map((item) => (
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
    </>
    :
    <>
    <h2 className="addAdPage__title">Ad new service</h2>
    <form 
      className='addAdPage__form'
      onSubmit={handleServicesSubmit}>
      <label className='popup__inputname'>Choise a category<span className='popup__inputname-span'>*</span></label> 

      <select className='popup__select' onChange={handleSelectServicesChange}>
        <option value="">Select a category</option>
          {categories.filter((category) => (category.is_good === false && (category.parent_id == 31))).map((item) => (
            <option key={item.category_id} value={item.category_id}>{item.name}</option>
          ))}
      </select>

      <label className='popup__inputname'>Choise a sub category</label>
      <select className='popup__select' onChange={handleThirdCategoryIdChange}>
        <option value="">Select a sub category</option>
          {thirdSubCategory
            .filter((category) => category.is_good === false && category.parent_id !== null) // Фильтруем по is_good и наличию родительской категории
            .map((item) => (
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
    </>}
      
    
    </section>
  )
}

export default AddAdPage;