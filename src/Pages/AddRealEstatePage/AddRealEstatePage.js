import React from 'react'
import './AddRealEstatePage.css'
import '../AddAdPage/AddAdPage.css'
import '../../Components/Forms/Forms.css'

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
import ImagesUpload from '../../Components/Forms/ImagesUpload/ImagesUpload'
import ConditionSelect from '../../Components/Forms/ConditionSelect/ConditionSelect'

function AddRealEstatePage({onAddAd, openLoading, closeLoading}) {
  const currentUser = React.useContext(CurrentUserContext)
  const owner_id = currentUser.user_id
  const [categories, setCategories] = React.useState(() => {
    const saved = localStorage.getItem('category');
    return saved ? JSON.parse(saved) : [];
  });
  const [firstFile, setFirstFile] = React.useState(null);
  const [secondFile, setSecondFile] = React.useState(null);
  const [thirdFile, setThirdFile] = React.useState(null);
  const [fourthFile, setFourthFile] = React.useState(null);

  const [selectedCategory, setSelectedCategory] = React.useState(null);

  const [errorImgMessage, setErrorImgMessage] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [city, setCity] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [size, setSize] = React.useState('')
  const [color, setColor] = React.useState('')
  const [condition, setCondition] = React.useState('') 
  const [isRealEstate, setIsRealEstate] = React.useState(false)
  const [isRent, setIsRent] = React.useState(false)
  const [isValid, setIsValid] = React.useState(false)
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
  const formRef = React.useRef(null);

  function handleCategorySelect(item) {
    setIsRent(item.is_rent)
    setSelectedCategory(item);
  }

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

  function handleSubmit(e) {
    e.preventDefault();

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
        category_id: Number(selectedCategory.category_id),
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
      setFirstFile(null)
      setSecondFile(null)
      setThirdFile(null)
      setFourthFile(null)
  }

  React.useEffect(() => {
    (selectedCategory && isTitleSelected && isConditionSelected && isPriceSelected && isCitySelected && isDescriptionSelected)?
      setIsValid(true)
    :
      setIsValid(false) 

}, [selectedCategory, isTitleSelected, isConditionSelected, isPriceSelected, isCitySelected, isDescriptionSelected])

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

        <label className='inputname'>
          {translatedContext.choiseACategory}
          <span className='inputname-span'>*</span>
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
        <ConditionSelect
          label={translatedContext.propertyCondition}
          conditions={propertyCondition}
          language={language}
          translatedContext={translatedContext}
          condition={condition}
          setCondition={setCondition}
          isConditionSelected={isConditionSelected}
          setIsConditionSelected={setIsConditionSelected}
          conditionErrorMessage={conditionErrorMessage}
          setConditionErrorMessage={setConditionErrorMessage}
        />
        <DiscriptionField
          label={translatedContext.propertyDescription}
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
          label={isRent? translatedContext.propertyRentPrice : translatedContext.propertyBuyPrice}
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
          label={translatedContext.placeRealEstate}
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
        <ImagesUpload
          translatedContext={translatedContext}
          openLoading={openLoading}
          closeLoading={closeLoading}
          errorImgMessage={errorImgMessage}
          setErrorImgMessage={setErrorImgMessage}
          firstFile={firstFile} setFirstFile={setFirstFile}
          secondFile={secondFile} setSecondFile={setSecondFile}
          thirdFile={thirdFile} setThirdFile={setThirdFile}
          fourthFile={fourthFile} setFourthFile={setFourthFile}
        />
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