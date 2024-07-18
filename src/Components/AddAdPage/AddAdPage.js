import React from 'react'
import './AddAdPage.css'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/AddAdPageData'

function AddAdPage({onAddAd, categories, isGood, isLoggin}) {
  const currentUser = React.useContext(CurrentUserContext)
  const owner_id = currentUser.user_id
  
  const [file, setFile] = React.useState(null);
  const [fileData, setFileData] = React.useState(null);
  const [myUploads, setMyUploads] = React.useState([]);
  const [showInputFields, setShowInputFields] = React.useState(true);
  const [errorNameMessage, setErrorNameMessage] = React.useState('')
  const [errorImgMessage, setErrorImgMessage] = React.useState('')
  const [errorPriceMessage, setErrorPriceMessage] = React.useState('')
  const [errorDreamLinkMessage, setErrorDreamLinkMessage] = React.useState('')
  
  const [luckyMessage, setLuckyMessage] = React.useState('')
  
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

  const addItemRef = React.useRef(null);

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

  const formRef = React.useRef(null);

  function handleImgLinkChange(e) {
    setFile(e.target.files[0]);
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

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      onAddAd({
        title,
        owner_id: owner_id,
        category_id: Number(id),//selectedCategoryId
        city,
        price,
        description,
        size, 
        color, 
        condition,
        formData,
      });
    } else {
      onAddAd({
        title,
        owner_id: owner_id,
        category_id: Number(id),//selectedCategoryId
        city,
        price,
        description,
        size, 
        color, 
        condition,
      });

    }
      setSelectedCategoryId(null)
      setSelectedSubCategoryId(null)
      setTitle('')
      setCity('')
      setFile(null)
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

    
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      onAddAd({
        title,
        owner_id: owner_id,
        category_id: Number(id),
        city,
        price,
        description,
        size, 
        color, 
        condition,
        formData,
      });
    } else {
      onAddAd({
        title,
        owner_id: owner_id,
        category_id: Number(id), //thirdSubCategoryId),
        city,
        price,
        description,
        size, 
        color, 
        condition,
      });
    }

      setSelectedCategoryId(null)
      setSelectedSubCategoryId(null)
      setThirdSubCategoryId(null)
      setThirdCategoryId(null)
      setTitle('')
      setCity('')
      setFile(null)
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
    } 
  }, [])

return (
    
    <section className="addAdPage__section">
    {isGood?
    <>
    <h2 className="addAdPage__title">{translatedContext.adANewGood}</h2>
    <form 
      ref={formRef}
      className='addAdPage__form'
      encType="multipart/form-data"
      onSubmit={handleSubmit}>
      <label className='popup__inputname'>{translatedContext.choiseACategory}<span className='popup__inputname-span'>*</span></label> 

      <select className='popup__select' onChange={handleSelectChange}>
        <option value="">{translatedContext.choiseACategory}</option>

          {language === 'rus' ?
            categories.filter((category) => (category.is_good && (category.parent_id === null))).map((item) => (
              <option key={item.category_id} value={item.category_id}>{item.name_rus}</option>
            ))
            
            :
            categories.filter((category) => (category.is_good && (category.parent_id === null))).map((item) => (
              <option key={item.category_id} value={item.category_id}>{item.name}</option>
            ))
          }

      </select>

      <label className='popup__inputname'>{translatedContext.choiseASubCategory}</label>
      <select className='popup__select' onChange={handleSubCategoryChange}>
        <option value="">{translatedContext.choiseASubCategory}</option>
        {language === 'rus' ?
            subCategory
            .filter((category) => category.is_good && category.parent_id !== null) // Фильтруем по is_good и наличию родительской категории
            .map((item) => (
              <option key={item.category_id} value={item.category_id}>{item.name_rus}</option>
            ))
          :
            subCategory
            .filter((category) => category.is_good && category.parent_id !== null) // Фильтруем по is_good и наличию родительской категории
            .map((item) => (
              <option key={item.category_id} value={item.category_id}>{item.name}</option>
            ))
        } 


      </select>

      <label className='popup__inputname'>{translatedContext.name}<span className='popup__inputname-span'>*</span>  
        <input
          className='popup__input'
          name='title'
          type='text'
          value={title}
          onChange={handleTitleChange}
        ></input>
      </label>
      <span className='popup__inputmistake'>{errorNameMessage}</span>

      <label className='popup__inputname'>{translatedContext.description}</label>
        <input
          className='popup__input'
          name='description'
          type='text'
          value={description}
          onChange={handledesDriptionChange}
        ></input>
       
      <span className='popup__inputmistake'>{errorDreamLinkMessage}</span>

      <label className='popup__inputname'>{translatedContext.price}<span className='popup__inputname-span'>*</span>
        <input
          className='popup__input'
          name='price'
          type='text'
          value={price}
          onChange={handlePriceChange}
        ></input>
      </label>
      <span className='popup__inputmistake'>{errorPriceMessage}</span>

      <label className='popup__inputname'>{translatedContext.place}<span className='popup__inputname-span'>*</span>
        <input
          className='popup__input'
          name='city'
          type='text'
          value={city}
          onChange={handleCityChange}
        ></input>
      </label>
      <span className='popup__inputmistake'>{errorPriceMessage}</span>

      <label className='popup__inputname'>{translatedContext.picture}</label>
      <button 
        onClick={() => addItemRef.current.click()}
        className='popup__input-btn'
        type="button">
          {translatedContext.uploadPictureBtn}
      </button> 
      
      <input
        ref={addItemRef}
        className='popup__input'
        name='file'
        type="file"
        onChange={handleImgLinkChange}
        hidden
      ></input>

      <span className='popup__inputmistake'>{errorImgMessage}</span>
      <button 
        className= 'popup__btn_active'
        type='submit'
        >
          {translatedContext.addBtn}
      </button>
    </form>
    </>



    :

//services//
    <>
    <h2 className="addAdPage__title">{translatedContext.adANewService}</h2>
    <form 
      ref={formRef}
      className='addAdPage__form'
      encType="multipart/form-data"
      onSubmit={handleServicesSubmit}>
      <label className='popup__inputname'>{translatedContext.choiseAServices}<span className='popup__inputname-span'>*</span></label> 

      <select className='popup__select' onChange={handleSelectServicesChange}>
        <option value="">{translatedContext.choiseAServices}</option>
          {language === 'rus' ?
            categories.filter((category) => (category.is_good === false && (category.parent_id == 31))).map((item) => (
              <option key={item.category_id} value={item.category_id}>{item.name_rus}</option>
            ))
          :
            categories.filter((category) => (category.is_good === false && (category.parent_id == 31))).map((item) => (
              <option key={item.category_id} value={item.category_id}>{item.name}</option>
            ))
          }
      </select>

      <label className='popup__inputname'>{translatedContext.choiseASubCategoryOfServices}</label>
      <select className='popup__select' onChange={handleThirdCategoryIdChange}>
        <option value="">{translatedContext.choiseASubCategoryOfServices}</option>
        {language === 'rus' ?
          thirdSubCategory
            .filter((category) => category.is_good === false && category.parent_id !== null) // Фильтруем по is_good и наличию родительской категории
            .map((item) => (
              <option key={item.category_id} value={item.category_id}>{item.name_rus}</option>
          ))
          :
          thirdSubCategory
          .filter((category) => category.is_good === false && category.parent_id !== null) // Фильтруем по is_good и наличию родительской категории
          .map((item) => (
            <option key={item.category_id} value={item.category_id}>{item.name}</option>
        ))
        }
      </select>

      <label className='popup__inputname'>{translatedContext.serviceName}<span className='popup__inputname-span'>*</span>  
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

      <label className='popup__inputname'>{translatedContext.serviceDescription}</label>
        <input
          className='popup__input'
          name='description'
          type='text'
          value={description}
          //onInput={handledesDriptionChange}
          onChange={handledesDriptionChange}
        ></input>
       
      <span className='popup__inputmistake'>{errorDreamLinkMessage}</span>

      <label className='popup__inputname'>{translatedContext.servicePrice}<span className='popup__inputname-span'>*</span>
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

      <label className='popup__inputname'>{translatedContext.cityServices}<span className='popup__inputname-span'>*</span>
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

      <label className='popup__inputname'>{translatedContext.picture}</label>
      <button 
        onClick={() => addItemRef.current.click()}
        className='popup__input-btn'
        type="button">
          {translatedContext.uploadPictureBtn}
      </button> 
      
      <input
        ref={addItemRef}
        className='popup__input'
        name='file'
        type="file"
        accept="*/*"
        onChange={handleImgLinkChange}
        hidden
      ></input>

      <span className='popup__inputmistake'>{errorImgMessage}</span>
      <button 
        className= 'popup__btn_active'
        type='submit'
      >
          {translatedContext.addBtn}
      </button>
    </form>
    </>}
      
    
    </section>
  )
}

export default AddAdPage;