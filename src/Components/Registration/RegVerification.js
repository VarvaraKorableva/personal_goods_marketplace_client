import React from 'react'
import './Registration.css'
import { Link } from 'react-router-dom'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/RegistrationPageLanguage'
import Preloader from '../../Components/Preloader/Preloader'

function Registration({onRegister, isRegError, isLoading}){

const [username, setName] = React.useState('')
const [email, setEmail] = React.useState('')
const [password, setPassword] = React.useState('')

const [errorNameMessage, setErrorNameMessage] = React.useState('')
const [errorEmailMessage, setErrorEmailMessage] = React.useState('')
const [errorPasswordMessage, setErrorPasswordMessage] = React.useState('')

const [errorName, setErrorName] = React.useState(true)
const [errorEmail, setErrorEmail] = React.useState(true)
const [errorPassword, setErrorPassword] = React.useState(true)

const [isValid, setIsValid] = React.useState(false);

const [isRegErrorEmailChanging, setIsRegErrorEmailChanging] = React.useState(false);

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

const [errorRegMessage, setErrorRegMessage] = React.useState(translatedContext.alreadyRegisteredError)  

  function handleSubmit(e) {
    e.preventDefault();
    console.log(username)
    onRegister({
      username,
      email,
      password
    });
    setIsRegErrorEmailChanging(false)
  }

  const handleNameChange = (e) => {

    if (!e.target.value.length) {
      setErrorNameMessage(translatedContext.mistakesName.theUsernameFieldMustBeFilledIn)
      setErrorName(true);

     } else if (e.target.value.length < 2) {
      setErrorNameMessage(translatedContext.mistakesName.theUsernameMustBeAtLeastCharactersLong)
      setErrorName(true);

     } else if (!e.target.value) {
      setErrorNameMessage(translatedContext.mistakesName.theUsernameShouldOnlyContainLatinLettersCyrillicLetters)
      setErrorName(true);

     } else if (e.target.value.length > 30) {
      setErrorNameMessage(translatedContext.mistakesName.usernameMustBeNoMoreThan)
      setErrorName(true);

     } else {
      setErrorNameMessage('')
      setErrorName(false);
      setName(e.target.value[0].toUpperCase() + e.target.value.slice(1));
     }
     
  }

  const handlePasswordChange = (e) => {
    if (!e.target.value.length) {
      setErrorPasswordMessage(translatedContext.mistakesPassword.passwordMustBeFilledIn);
      setErrorPassword(true);
    } else if (e.target.value.length < 5) {
      setErrorPasswordMessage(translatedContext.mistakesPassword.passwordMustContainAtLeast);
      setErrorPassword(true);
    } else if (e.target.value.length > 8) {
      setErrorPasswordMessage(translatedContext.mistakesPassword.passwordMustNotExceed);
      setErrorPassword(true);
    } else {
      setErrorPasswordMessage('');
      setErrorPassword(false);
    }
    setPassword(e.target.value);
  };
  
  const handleEmailChange = (e) => {
    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      e.target.value
    )
    if (!e.target.value.length) {
      setErrorEmailMessage(translatedContext.mistakesEmail.emailMustBeFilledIn)
      setErrorEmail(true)
      setIsRegErrorEmailChanging(true)
 
    } else if (!validEmail) {
      setErrorEmailMessage(translatedContext.mistakesEmail.invalidEmailFormat)
      setErrorEmail(true)
      setIsRegErrorEmailChanging(true)
    } else {
      setErrorEmailMessage('')
      setErrorEmail(false)
      setIsRegErrorEmailChanging(true)
    }
    setEmail(e.target.value)
  }

  React.useEffect(() => {
    if (errorEmail) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [errorEmail])

  return (
    <section className='register'>
      {isLoading? 
        <Preloader/>
      :
      <form 
        className='register__form'
        //onSubmit={handleSubmit}
      >
        <h2 className='register__title'>{translatedContext.greetings}</h2>
        <h3 className='register__subtitle'>{translatedContext.firstStepTitle}</h3>

        <fieldset className='register__fieldset'>
          <label className='register__inputname'>{translatedContext.verificationEmailLabel}
            <input className='register__input'
              required
              name="email"
              type="email"
              autoComplete="on"
              defaultValue=""
              onChange={handleEmailChange}
            />  
          </label>
          <span className='register__inputmistake'>{errorEmailMessage}</span>
        </fieldset>

        <button
          type="submit"
          className={`'register__verification-btn' ${isValid? 'register__btn_active': 'register__btn'}`}
          disabled={!isValid}
        >
            {translatedContext.verificationEmailButton} {email}
        </button>

        <div className='register__wrapper'>
          <p className='register__subtitle'>{translatedContext.question}
          <Link className='register__entrylink' to="/signin"> {translatedContext.signin}</Link></p>
        </div>
    </form>
}
    </section>
  );
}

export default Registration;