//AddRealEstatePage
import React from 'react'
import { useNavigate } from 'react-router-dom'
import imageCompression from 'browser-image-compression';
import './AddRealEstatePage.css'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/AddAdPageData'
import { propertyCondition } from '../../const/Сonditions/PropertyCondition'
import BackBtn from '../../UK-kit/BackBtn'
import CityInput from '../../Components/Forms/CityInput/CityInput'
import TitletInputField from '../../Components/Forms/TitletInputField/TextInputField'
import DiscriptionField from '../../Components/Forms/DiscriptionField/DiscriptionField'
import PriceInputField from '../../Components/Forms/PriceInputField/PriceInputField'
import Container from '../../UK-kit/Container/Container'

function AddRealEstatePage({onAddAd, categories, isGood, openLoading, closeLoading}) {
  const currentUser = React.useContext(CurrentUserContext)
  const owner_id = currentUser.user_id

  const [firstFile, setFirstFile] = React.useState(null);
  const [secondFile, setSecondFile] = React.useState(null);
  const [thirdFile, setThirdFile] = React.useState(null);
  const [fourthFile, setFourthFile] = React.useState(null);

  const [selectedCategory, setSelectedCategory] = React.useState(null);

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
  const [isRealEstate, setIsRealEstate] = React.useState(false) ////////не работаю с этим (на потом) в базе есть
  const [isRent, setIsRent] = React.useState(false)

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

  const options = {
    maxSizeMB: 1.0,
    maxWidthOrHeight: 1600,
    useWebWorker: true,
    initialQuality: 0.9,
    fileType: "image/webp",
};

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
      formData.append('firstFile', firstFile);
      formData.append('secondFile', secondFile);
      formData.append('thirdFile', thirdFile);
      formData.append('fourthFile', fourthFile);

      onAddAd({ 
        title,
        owner_id: owner_id,
        category_id: Number(selectedCategory.category_id),
        city,
        price,
        description,
        size, 
        color, 
        condition,
        isRealEstate: true,
        isRent,
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
        isRealEstate: true,
        isRent,
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

      setIsRealEstate(false)
      setIsRent(false)
      setSelectedCategory(null)
      setIsCategorySelected(false)
      setIsSecondCategorySelected(false)

      setFirstFile(null)
      setSecondFile(null)
      setThirdFile(null)
      setFourthFile(null)
  }

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


  React.useEffect(() => {
    if (isGood === false) {
        setSelectedCategoryId(categories.filter((category) => category.is_good === false))
    } 
  }, [])

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

  function handleCategorySelect(item) {
    console.log('Selected category:', item);
    setSelectedCategory(item); // или setFormData(prev => ({...prev, category_id: item.category_id}))
  }

  console.log('categories:', categories);
  
return (
    <Container as='section' baseClassName='wrapper' className="addAdPage__wrapper">
    <Container as='div' baseClassName='container' className='addAdPage__container'>
      <BackBtn className='backBtn_margin-top'/>
      <h2 className="addAdPage__title">Добавить объявление о недвижимости</h2>
      <form 
        ref={formRef}
        className='addAdPage__form'
        encType="multipart/form-data"
        onSubmit={handleSubmit}>

        <label className='popup__inputname'>
          {translatedContext.choiseACategory}
          <span className='popup__inputname-span'>*</span>
        </label> 

        <div className='realEstate__btn-container'>

        {categories
          .filter(c => c.is_real_estate && c.parent_id)
          .map(item => (
            <button
              key={item.category_id}
              type="button"
              className={selectedCategory?.category_id === item.category_id ? 'realEstate__btn_active' : 'realEstate__btn'}
              onClick={() => handleCategorySelect(item)}
            >
              {language === 'rus' ? item.name_rus : item.name}
            </button>
        ))}
        </div>
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
        <option value="">{translatedContext.propertyCondition}</option>

          {language === 'rus' ?
            propertyCondition.rus.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))
            
            :
            propertyCondition.en.map((item) => (
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
        realEstate={true}
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
    </Container>
    </Container>
  )
}

export default AddRealEstatePage;