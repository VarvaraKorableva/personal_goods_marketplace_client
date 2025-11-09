import React, {useState} from 'react'
import './AddAdPage.css'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/AddAdPageData'
import BackBtn from '../../UK-kit/BackBtn'
import CityInput from '../../Components/Forms/CityInput/CityInput'
import TitletInputField from '../../Components/Forms/TitletInputField/TextInputField'
import DiscriptionField from '../../Components/Forms/DiscriptionField/DiscriptionField'
import PriceInputField from '../../Components/Forms/PriceInputField/PriceInputField'
import Container from '../../UK-kit/Container/Container'
import ConditionSelect from '../../Components/Forms/ConditionSelect/ConditionSelect'
import ImagesUpload from '../../Components/Forms/ImagesUpload/ImagesUpload'
import CategorySelect from '../../Components/Forms/CategorySelect/CategorySelect'
import { conditions } from '../../const/Сonditions/Сonditions'

function AddAdPage({onAddAd, openLoading, closeLoading}) {
  const currentUser = React.useContext(CurrentUserContext)
  const owner_id = currentUser.user_id
  const isGood = true
  const [categories, setCategories] = React.useState(() => {
    const saved = localStorage.getItem('category');
    return saved ? JSON.parse(saved) : [];
  });
  const [firstFile, setFirstFile] = React.useState(null);
  const [secondFile, setSecondFile] = React.useState(null);
  const [thirdFile, setThirdFile] = React.useState(null);
  const [fourthFile, setFourthFile] = React.useState(null);
  
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

  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [categoryLevels, setCategoryLevels] = useState([])

  const handleCategorySelect = (id, levels) => {
    setSelectedCategoryId(id)
    setCategoryLevels(levels)
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

  const formRef = React.useRef(null);

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
        category_id: Number(selectedCategoryId),
        city,
        price,
        description,
        size, 
        color, 
        condition,
        isRealEstate,
        isRent,
        formData,
      });
    } else {
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
        isRealEstate,
        isRent,
      });

    }
      setSelectedCategoryId(null)
      setTitle('')
      setCity('')
      setPrice('')
      setDescription('')
      setSize('')
      setColor('')
      setCondition('')
      setIsRealEstate(false)
      setIsRent(false)
      setFirstFile(null)
      setSecondFile(null)
      setThirdFile(null)
      setFourthFile(null)
  }

  React.useEffect(() => {
    if (isGood === false) {
        setSelectedCategoryId(categories.filter((category) => category.is_good === false))
    } 
  }, [])

  React.useEffect(() => {
    const requiredFieldsFilled = [
      isTitleSelected,
      isConditionSelected,
      isPriceSelected,
      isCitySelected,
      //isDescriptionSelected,
    ].every(Boolean);

    const allCategoryLevelsSelected =
      categoryLevels.length > 0 &&
      categoryLevels.every((level) => Boolean(level.selectedId));

    const isFormValid = requiredFieldsFilled && allCategoryLevelsSelected;
    setIsValid(isFormValid);
  }, [
    categoryLevels,
    isTitleSelected,
    isConditionSelected,
    isPriceSelected,
    isCitySelected,
    //isDescriptionSelected,
  ]);

return (
    <Container as='section' baseClassName='wrapper' className="addAdPage__wrapper">
    <Container as='div' baseClassName='container' className='addAdPage__container'>
      <BackBtn className='backBtn_margin-top'/>
      <h2 className="addAdPage__title">{translatedContext.adANewGood}</h2>
      <form 
        ref={formRef}
        className='addAdPage__form'
        encType="multipart/form-data"
        onSubmit={handleSubmit}>

        <CategorySelect
          categories={categories}
          language={language}
          translatedContext={translatedContext}
          onCategorySelect={handleCategorySelect}
          isGood={true}
        />
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
          label={translatedContext.condition}
          conditions={conditions}
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
          label={translatedContext.place}
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

export default AddAdPage;