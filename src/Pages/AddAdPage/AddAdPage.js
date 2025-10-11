import React from 'react'
import { useNavigate } from 'react-router-dom'
import imageCompression from 'browser-image-compression';
import './AddAdPage.css'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/AddAdPageData'
import { conditions } from '../../const/Сonditions/Сonditions'
import BackBtn from '../../UK-kit/BackBtn'
import CityInput from '../../Components/Forms/CityInput/CityInput'
import TitletInputField from '../../Components/Forms/TitletInputField/TextInputField'
import DiscriptionField from '../../Components/Forms/DiscriptionField/DiscriptionField'
import PriceInputField from '../../Components/Forms/PriceInputField/PriceInputField'

function AddAdPage({onAddAd, categories, isGood, openLoading, closeLoading}) {
  const currentUser = React.useContext(CurrentUserContext)
  const owner_id = currentUser.user_id
  const navigate = useNavigate()

  const [firstFile, setFirstFile] = React.useState(null);
  const [secondFile, setSecondFile] = React.useState(null);
  const [thirdFile, setThirdFile] = React.useState(null);
  const [fourthFile, setFourthFile] = React.useState(null);

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

  const [isConditionSelected, setIsConditionSelected] = React.useState(false)
  const [conditionErrorMessage, setConditionErrorMessage] = React.useState('')


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
                maxSizeMB: 0.3,
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
                maxSizeMB: 0.3,
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
                maxSizeMB: 0.3,
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
                maxSizeMB: 0.3,
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

  function handleSubmit(e) {
    e.preventDefault();
    let id = null
    if((selectedSubCategoryId === null || selectedSubCategoryId === "") && (selectedThirdSubCategoryId === null || selectedThirdSubCategoryId === '')){
      id = Number(selectedCategoryId)
    } 
    if(selectedSubCategoryId && (selectedThirdSubCategoryId === null || selectedThirdSubCategoryId === '')){
      id = Number(selectedSubCategoryId)
    }
    if(selectedThirdSubCategoryId) {
      id = Number(selectedThirdSubCategoryId)
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

      setTitle('')
      setCity('')
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

  const handleConditionChange = (e) => {
    if(e.target.value){
      setCondition(e.target.value)
      setIsConditionSelected(true)
      setConditionErrorMessage('')
    } else {
      setCondition('')
      setIsConditionSelected(false)
      setConditionErrorMessage(`${translatedContext.errors.conditionErrorMessage.errorMessage}`)
    }
  }

  const handleSelectChange = (e) => {
    setSelectedCategoryId(e.target.value)
    
    setSubCategory(categories.filter((category) => category.parent_id == e.target.value))

    categories.filter((category) => category.parent_id == e.target.value).length ?
      setHaveSubCategory(true)
    :
      setHaveSubCategory(false)
      setHaveSecondSubCategory(false)

    if(e.target.value) {
      setIsCategorySelected(true)
      setIsSecondCategorySelected(false)
      setCategoryErrorMessage('')
    } else {
      setIsCategorySelected(false)
      setIsSecondCategorySelected(false)
      setCategoryErrorMessage(`${translatedContext.errors.categoryErrorMessage.errorMessage}`)
    }
  };

  const handleSubCategoryChange = (e) => {
    if(e.target.value) {
      setIsSecondCategorySelected(true)
      setSelectedSubCategoryId(e.target.value)
    
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

  const handleSecondSubCategoryChange = (e) => {
    if (e.target.value) {
      setIsThirdSubCategorySelected(true)
      setSelectedThirdSubCategoryId(e.target.value)
      setThirdSubCategoryErrorMessage('')
    } else {
      setIsThirdSubCategorySelected(false)
      setThirdSubCategoryErrorMessage(`${translatedContext.errors.thirdSubCategoryErrorMessage.errorMessage}`)
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

            (isCategorySelected && isTitleSelected && isConditionSelected && isPriceSelected && isCitySelected && isSecondCategorySelected && isThirdSubCategorySelected && isDescriptionSelected)?
              setIsValid(true)
            :
              setIsValid(false)
        :
            (isCategorySelected && isTitleSelected && isConditionSelected && isPriceSelected && isCitySelected && isSecondCategorySelected && isDescriptionSelected)?
              setIsValid(true)
            :
              setIsValid(false)      
    :
      (isCategorySelected && isTitleSelected && isConditionSelected && isPriceSelected && isCitySelected && isDescriptionSelected)?
        setIsValid(true)
      :
        setIsValid(false) 

  }, [haveSubCategory, haveSecondSubCategory, isCategorySelected, isTitleSelected, isConditionSelected, isPriceSelected, isCitySelected, isSecondCategorySelected, isThirdSubCategorySelected, isDescriptionSelected])
  
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
      <BackBtn/>
      <h2 className="addAdPage__title">{translatedContext.adANewGood}</h2>
      <form 
        ref={formRef}
        className='addAdPage__form'
        encType="multipart/form-data"
        onSubmit={handleSubmit}>

        <label className='popup__inputname'>{translatedContext.choiseACategory}<span className='popup__inputname-span'>*</span></label> 
        <select 
          className='addAdPage__select' 
          onChange={handleSelectChange}
          //value={selectedCategoryId}
          >
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

        {isCategorySelected?
        <span className='popup__mistake-msg'></span>
      : 
        <span className='popup__mistake-msg'>{categoryErrorMessage}</span>
      }

      {isCategorySelected && haveSubCategory?
      <>
      <label className='popup__inputname'>{translatedContext.choiseASubCategory}</label>
      <select className='addAdPage__select' onChange={handleSubCategoryChange}>
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

      {isSecondCategorySelected?
        <span className='popup__mistake-msg'></span>
      : 
        <span className='popup__mistake-msg'>{secondCategoryErrorMessage}</span>
      }
      </>
      :
      <></>
      }  

      {isSecondCategorySelected && haveSecondSubCategory?
      <>
      <label className='popup__inputname'>{translatedContext.choiseASecondSubCategoryGoods}</label>
      <select className='addAdPage__select' onChange={handleSecondSubCategoryChange}>
        <option value="">{translatedContext.choiseASecondSubCategoryGoods}</option>
        {language === 'rus' ?
            secondSubCategory
            .filter((category) => category.is_good && category.parent_id !== null) // Фильтруем по is_good и наличию родительской категории
            .map((item) => (
              <option key={item.category_id} value={item.category_id}>{item.name_rus}</option>
            ))
          :
            secondSubCategory
            .filter((category) => category.is_good && category.parent_id !== null) // Фильтруем по is_good и наличию родительской категории
            .map((item) => (
              <option key={item.category_id} value={item.category_id}>{item.name}</option>
            ))
        } 
      </select>

      {isThirdSubCategorySelected?
        <span className='popup__mistake-msg'></span>
      : 
        <span className='popup__mistake-msg'>{thirdSubCategoryErrorMessage}</span>
      }

      </>
      :
      <></>
      }  

      <TitletInputField
        label={translatedContext.name}
        name="title"
        value={title}
        isValid={isTitleSelected}
        errorMessage={titleErrorMessage}
        required={true}
        setIsTitleSelected={setIsTitleSelected}
        setTitleErrorMessage={setTitleErrorMessage}
        setTitle={setTitle}
        translatedContext={translatedContext}
      />

      <select 
        className='addAdPage__select margin' 
        onChange={handleConditionChange}
        value={condition}
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

      {isConditionSelected?
        <span className='popup__mistake-msg margin'></span>
      : 
        <span className='popup__mistake-msg margin'>{conditionErrorMessage}</span>
      }

      <DiscriptionField
        label={translatedContext.description}
        name="description"
        value={description}
        isValid={isDescriptionSelected}
        errorMessage={descriptionErrorMessage}
        required={false}
        setIsValid={setIsDescriptionSelected}
        setErrorMessage={setDescriptionErrorMessage}
        setValue={setDescription}
        translatedContext={translatedContext}
      />

      <PriceInputField
        label={translatedContext.price}
        name="price"
        value={price}
        isValid={isPriceSelected}
        errorMessage={priceErrorMessage}
        setIsValid={setIsPriceSelected}
        setErrorMessage={setPriceErrorMessage}
        setValue={setPrice}
        translatedContext={translatedContext}
      />

      <CityInput
        language={language} 
        translatedContext={translatedContext}
        city={city} 
        setCity={setCity} 
        isCitySelected={isCitySelected} 
        setIsCitySelected={setIsCitySelected} 
        cityErrorMessage={cityErrorMessage} 
        setCityErrorMessage={setCityErrorMessage}
        good={true}
      />

      <label className='popup__inputname margin'>{translatedContext.picture}</label>
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

export default AddAdPage;