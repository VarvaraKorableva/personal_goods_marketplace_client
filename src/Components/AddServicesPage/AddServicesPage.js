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

  const [firstFile, setFirstFile] = React.useState(null);
  const [secondFile, setSecondFile] = React.useState(null);
  const [thirdFile, setThirdFile] = React.useState(null);
  const [fourthFile, setFourthFile] = React.useState(null);

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

  const addFirstPicRef = React.useRef(null);
  const addSecondPicRef = React.useRef(null);
  const addThirdPicRef = React.useRef(null);
  const addFourthPicRef = React.useRef(null);
  const [files, setFiles] = React.useState([firstFile, secondFile, thirdFile, fourthFile])

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

  const handleImgFirstLinkChange = async (event) => {
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
                setFirstFile(compressedImage);
                
                closeLoading()

            } catch (error) {
                console.error('Ошибка при сжатии изображения:', error);
                closeLoading()
            }
        }
  };

  const handleImgSecondLinkChange = async (event) => {
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
                setSecondFile(compressedImage);
                
                closeLoading()

            } catch (error) {
                console.error('Ошибка при сжатии изображения:', error);
                closeLoading()
            }
        }
  };

  const handleImgThirdLinkChange = async (event) => {
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
                setThirdFile(compressedImage);
                
                closeLoading()

            } catch (error) {
                console.error('Ошибка при сжатии изображения:', error);
                closeLoading()
            }
        }
  };

  const handleImgFourthLinkChange = async (event) => {
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
                setFourthFile(compressedImage);
                
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
    
    if (firstFile || secondFile || thirdFile || fourthFile) {
      const formData = new FormData()
      formData.append('firstFile', firstFile); //, secondFile, thirdFile, fourthFile
      formData.append('secondFile', secondFile);
      formData.append('thirdFile', thirdFile);
      formData.append('fourthFile', fourthFile);

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

      setFirstFile(null)
      setSecondFile(null)
      setThirdFile(null)
      setFourthFile(null)
  }

  const handleTitleChange = (e) => {
    if(e.target.value.length > 40) {
      setIsTitleSelected(false)
      setTitleErrorMessage(`${translatedContext.errors.titleErrorMessage.errorMessageToLong}`)
      setTitle(e.target.value)
    } else if (e.target.value.length < 3) {
      setTitleErrorMessage(`${translatedContext.errors.titleErrorMessage.errorMessageToSmall}`)
      setIsTitleSelected(false)
      setTitle(e.target.value)
    } else if(!e.target.value) {
      setIsTitleSelected(false)
      setTitleErrorMessage(`${translatedContext.errors.titleErrorMessage.errorMessage}`)
      setTitle(e.target.value)
    } else {
      setIsTitleSelected(true)
      setTitleErrorMessage('')
      setTitle(e.target.value[0].toUpperCase() + e.target.value.slice(1))
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
      setPriceErrorMessage(`${translatedContext.errors.priceErrorMessage.errorMessageToLongs}`)
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

  function deleteAddedFile(numberOfPic) {
    if(numberOfPic == 1){
      setFirstFile(null)
    }if(numberOfPic == 2) {
      setSecondFile(null)
    }if(numberOfPic == 3) {
      setThirdFile(null)
    }if(numberOfPic == 4) {
      setFourthFile(null)
    }
  }

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
        <textarea
          className='popup__input-description'
          name='description'
          type='text'
          value={description}
          onChange={handledesDriptionChange}
        ></textarea>
       
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

      
<span className='popup__inputmistake'>{errorImgMessage}</span>

<div className='popup__files-container'>
{firstFile? 
  <div className='popup__compressed-pic-wrapper'>
    <img src={URL.createObjectURL(firstFile)} alt="Compressed" className='popup__compressed-pic'/>
    <button className='popup__compressed-pic-delete-btn' onClick={() => deleteAddedFile(1)} type='button'></button>
  </div>
  : 
  <>
    <button 
      onClick={() => addFirstPicRef.current.click()}
      className='popup__input-btn'
      type="button">
        {translatedContext.uploadPictureBtn}
    </button> 

    <input
      ref={addFirstPicRef}
      className='popup__input-pic'
      name='firstFile'
      type="file"
      onChange={handleImgFirstLinkChange}
      hidden
    ></input>
  </>
}

{secondFile? 
  <div className='popup__compressed-pic-wrapper'>
    <img src={URL.createObjectURL(secondFile)} alt="Compressed" className='popup__compressed-pic'/>
    <button className='popup__compressed-pic-delete-btn' onClick={() => deleteAddedFile(2)} type='button'></button>
  </div>
  : 
  <>
    <button 
      onClick={() => addSecondPicRef.current.click()}
      className='popup__input-btn'
      type="button">
        {translatedContext.uploadPictureBtn}
    </button> 

    <input
      ref={addSecondPicRef}
      className='popup__input-pic'
      name='secondFile'
      type="file"
      onChange={handleImgSecondLinkChange}
      hidden
    ></input>
  </>
}

{thirdFile? 
  <div className='popup__compressed-pic-wrapper'>
    <img src={URL.createObjectURL(thirdFile)} alt="Compressed" className='popup__compressed-pic'/>
    <button className='popup__compressed-pic-delete-btn' onClick={() => deleteAddedFile(3)} type='button'></button>
  </div>
  : 
  <>
    <button 
      onClick={() => addThirdPicRef.current.click()}
      className='popup__input-btn'
      type="button">
        {translatedContext.uploadPictureBtn}
    </button> 

    <input
      ref={addThirdPicRef}
      className='popup__input-pic'
      name='thirdFile'
      type="file"
      onChange={handleImgThirdLinkChange}
      hidden
    ></input>
  </>
}

{fourthFile? 
  <div className='popup__compressed-pic-wrapper'>
    <img src={URL.createObjectURL(fourthFile)} alt="Compressed" className='popup__compressed-pic'/>
    <button className='popup__compressed-pic-delete-btn' onClick={() => deleteAddedFile(4)} type='button'></button>
  </div>
  : 
  <>
    <button 
      onClick={() => addFourthPicRef.current.click()}
      className='popup__input-btn'
      type="button">
        {translatedContext.uploadPictureBtn}
    </button> 

    <input
      ref={addFourthPicRef}
      className='popup__input-pic'
      name='fourthFile'
      type="file"
      onChange={handleImgFourthLinkChange}
      hidden
    ></input>
  </>
}
</div>

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