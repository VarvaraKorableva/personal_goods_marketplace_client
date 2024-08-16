import React from 'react'
import imageCompression from 'browser-image-compression';
import '../AddAdPage/AddAdPage.css'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/AddAdPageData'
import {cities} from '../../const/Cities/cities'

function AddServicesPage({onAddAd, categories, isGood, isLoggin, openLoading, closeLoading}) {
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
  
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(null)
  const [selectedSubCategoryId, setSelectedSubCategoryId] = React.useState(null)
  
  const [selectedThirdSubCategoryId, setSelectedThirdSubCategoryId] = React.useState(null) //third

  const [subCategory, setSubCategory] = React.useState([])
  const [secondSubCategory, setSecondSubCategory] = React.useState([])

  const [thirdSubCategory, setThirdSubCategory] = React.useState([])
  const [thirdSubCategoryId, setThirdSubCategoryId] = React.useState(null)
  const [thirdCategoryId, setThirdCategoryId] = React.useState(null)

  const [haveSubCategory, setHaveSubCategory] = React.useState(false)
  const [haveSecondSubCategory, setHaveSecondSubCategory] = React.useState(false)
  

  const [title, setTitle] = React.useState('')
  const [city, setCity] = React.useState('')
  const [img, setImg] = React.useState(null)
  const [price, setPrice] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [size, setSize] = React.useState('')
  const [color, setColor] = React.useState('')
  const [condition, setCondition] = React.useState('')

  const [isValid, setIsValid] = React.useState(false)

  const [isCategorySelected, setIsCategorySelected] = React.useState(false)
  const [categoryErrorMessage, setCategoryErrorMessage] = React.useState('')
  
  const [isSecondCategorySelected, setIsSecondCategorySelected] = React.useState(false)
  const [secondCategoryErrorMessage, setSecondCategoryErrorMessage] = React.useState('')

  const [isThirdSubCategorySelected, setIsThirdSubCategorySelected] = React.useState(false)
  const [thirdSubCategoryErrorMessage, setThirdSubCategoryErrorMessage] = React.useState('')

  const [isTitleSelected, setIsTitleSelected] = React.useState(false)
  const [titleErrorMessage, setTitleErrorMessage] = React.useState('')

  const [isPriceSelected, setIsPriceSelected] = React.useState(false)
  const [priceErrorMessage, setPriceErrorMessage] = React.useState('')

  const [isCitySelected, setIsCitySelected] = React.useState(false)
  const [cityErrorMessage, setCityErrorMessage] = React.useState('')

  const [isDescriptionSelected, setIsDescriptionSelected] = React.useState(true)
  const [descriptionErrorMessage, setDescriptionErrorMessage] = React.useState('')

  const [initiatorKeyWord, setInitiatorKeyWord] = React.useState('')

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

  const handleImgLinkChange = async (event) => {
    openLoading()
        const file = event.target.files[0];
        if (file) {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 400, 
                useWebWorker: true,     
            };

            try {
                const compressedImage = await imageCompression(file, options);
                setFile(compressedImage);
                console.log(compressedImage)
                closeLoading()

            } catch (error) {
                console.error('Ошибка при сжатии изображения:', error);
                closeLoading()
            }
        }
  };

  function handledesDriptionChange(e) {
    if(e.target.value.length > 900) {
      setIsDescriptionSelected(false)
      setDescriptionErrorMessage('Длинна описания не может превышать 900 символов')
    } else if(e.target.value) {
      console.log(e.target.value.length)
      setIsDescriptionSelected(true)
      setDescriptionErrorMessage('')
      setDescription(e.target.value)
    } else {
      setIsDescriptionSelected(true)
      setDescriptionErrorMessage('')
      setDescription('')
    }
  }

  function handleServicesSubmit(e) {
    e.preventDefault();
    let id = null

    if((selectedSubCategoryId === null || selectedSubCategoryId === "") && (thirdSubCategoryId === null || thirdSubCategoryId === '')){
      id = Number(selectedCategoryId)
    } 
    if(selectedSubCategoryId && (thirdSubCategoryId === null || thirdSubCategoryId === '')){
      id = Number(selectedSubCategoryId)
    }
    if(thirdSubCategoryId) {
      id = Number(thirdSubCategoryId)
    }
    
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
        category_id: Number(id),
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
      setSelectedThirdSubCategoryId(null)
      
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

      setIsCategorySelected(false)
      setIsSecondCategorySelected(false)
  }

  const handleTitleChange = (e) => {
    if(!e.target.value) {
      setIsTitleSelected(false)
      setTitleErrorMessage(`${translatedContext.errors.titleErrorMessage.errorMessage}`)
      setTitle('')
    }else {
      const str = e.target.value
      setTitle(e.target.value)
      setIsTitleSelected(true)
      setTitleErrorMessage(`${translatedContext.errors.titleErrorMessage.errorMessage}`)
    }
  }

  const handlePriceChange = (e) => {
    if (!e.target.value) {
      setIsPriceSelected(false)
      setPriceErrorMessage(`${translatedContext.errors.priceErrorMessage.errorMessage}`)
      setPrice('')
    } else if(!(/^\d*$/.test(e.target.value))) {
      setIsPriceSelected(false)
      setPriceErrorMessage(`${translatedContext.errors.priceErrorMessage.errorMessageOnlyNumbers}`)
    } else if (e.target.value.length > 10) {
      setIsPriceSelected(false)
      setPriceErrorMessage(`Цена не может содержать более 10 цифр`)
    } else {
      setIsPriceSelected(true)
      setPrice(e.target.value)
      setPriceErrorMessage('')
    }
  };

  const handleCityChange = (e) => {
    if(e.target.value){
      setCity(e.target.value)
      setIsCitySelected(true)
      setCityErrorMessage('')
    } else {
      setCity('')
      setIsCitySelected(false)
      setCityErrorMessage(`${translatedContext.errors.cityErrorMessage.errorMessage}`)
    }
  }

  const handleSelectServicesChange = (e) => {
    if(e.target.value !== "") {
      setIsCategorySelected(true)
      setThirdSubCategoryId(e.target.value)
      
      setThirdSubCategory(categories.filter((category) => category.parent_id == e.target.value))

      categories.filter((category) => category.parent_id == e.target.value).length ?
        setHaveSubCategory(true)
      :
        setHaveSubCategory(false)
        setHaveSecondSubCategory(false)
  
    } else {
      setIsCategorySelected(false)
      setIsSecondCategorySelected(false)
      setCategoryErrorMessage(`${translatedContext.errors.categoryErrorMessage.errorMessage}`)
    }
  };

  const handleThirdCategoryIdChange = (e) => {
    if(e.target.value) {
      setIsSecondCategorySelected(true)
      setThirdCategoryId(e.target.value)
    
      setSecondSubCategory(categories.filter((category) => category.parent_id == e.target.value))

      setSecondCategoryErrorMessage('')
  
      categories.filter((category) => category.parent_id == e.target.value).length ?
        setHaveSecondSubCategory(true)
      :
        setHaveSecondSubCategory(false)

    } else {
      setIsSecondCategorySelected(false)
      setSecondCategoryErrorMessage(`${translatedContext.errors.secondCategoryErrorMessage.errorMessage}`)
    }
    
  }

  React.useEffect(() => {
    if (isGood === false) {
        setSelectedCategoryId(categories.filter((category) => category.is_good === false))
    } 
  }, [])

  React.useEffect(() => {
    haveSubCategory?

        haveSecondSubCategory?

            (isCategorySelected && isTitleSelected && isPriceSelected && isCitySelected && isSecondCategorySelected && isThirdSubCategorySelected)?
              setIsValid(true)
            :
              setIsValid(false)
        :
            (isCategorySelected && isTitleSelected && isPriceSelected && isCitySelected && isSecondCategorySelected)?
              setIsValid(true)
            :
              setIsValid(false)      
    :
      (isCategorySelected && isTitleSelected && isPriceSelected && isCitySelected)?
        setIsValid(true)
      :
        setIsValid(false) 

  }, [haveSubCategory, haveSecondSubCategory, isCategorySelected, isTitleSelected, isPriceSelected, isCitySelected, isSecondCategorySelected, isThirdSubCategorySelected])

return (
    <section className="addAdPage__section">
    <h2 className="addAdPage__title">{translatedContext.adANewService}</h2>
    <form 
      ref={formRef}
      className='addAdPage__form'
      encType="multipart/form-data"
      onSubmit={handleServicesSubmit}>
      <label className='popup__inputname'>{translatedContext.choiseAServices}<span className='popup__inputname-span'>*</span></label> 

      <select 
        className='addAdPage__select' 
        onChange={handleSelectServicesChange}
        //value={}
      >
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

      {isCategorySelected?
        <span className='popup__mistake-msg'></span>
      : 
        <span className='popup__mistake-msg'>{categoryErrorMessage}</span>
      }

      {isCategorySelected && haveSubCategory?
      <>
      <label className='popup__inputname'>{translatedContext.choiseASubCategoryOfServices}</label>
      <select className='addAdPage__select' onChange={handleThirdCategoryIdChange}>
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
      {isSecondCategorySelected?
        <span className='popup__mistake-msg'></span>
      : 
        <span className='popup__mistake-msg'>{secondCategoryErrorMessage}</span>
      }
      </>
      :
      <></>
      }

      <label className='popup__inputname'>{translatedContext.serviceName}<span className='popup__inputname-span'>*</span>  
        <input
          className='popup__input'
          name='title'
          type='text'
          value={title}
          onChange={handleTitleChange}
        ></input>
      </label>

      {isTitleSelected?
        <span className='popup__mistake-msg'></span>
      : 
        <span className='popup__mistake-msg'>{titleErrorMessage}</span>
      }

      <label className='popup__inputname'>{translatedContext.serviceDescription}</label>
        <input
          className='popup__input'
          name='description'
          type='text'
          value={description}
          onChange={handledesDriptionChange}
        ></input>
       
       {isDescriptionSelected?
        <span className='popup__mistake-msg'></span>
      : 
        <span className='popup__mistake-msg'>{descriptionErrorMessage}</span>
      }

      <label className='popup__inputname'>{translatedContext.servicePrice}<span className='popup__inputname-span'>*</span>
        <input
          className='popup__input'
          name='price'
          type='text'
          value={price}
          onChange={handlePriceChange}
        ></input>
      </label>

      {isPriceSelected?
        <span className='popup__mistake-msg'></span>
      : 
        <span className='popup__mistake-msg'>{priceErrorMessage}</span>
      }

      <select 
        className='addAdPage__select' 
        onChange={handleCityChange}
        value={city}
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

      {isCitySelected?
        <span className='popup__mistake-msg'></span>
      : 
        <span className='popup__mistake-msg'>{cityErrorMessage}</span>
      }

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
        className= {isValid? 'popup__btn_active' : 'add-ad-popup__btn'}
        type='submit'
        disabled={!isValid}
      >
          {translatedContext.addBtn}
      </button>
    </form>
    </section>
)
}

export default AddServicesPage;