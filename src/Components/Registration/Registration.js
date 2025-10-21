import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Registration.css'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/RegistrationPageLanguage'
import Preloader from '../../Components/Preloader/Preloader'
import Heading from '../../UK-kit/Heading/Heading'


function Registration({onRegister, isRegError, isLoading, isLoggin}){
  const navigate = useNavigate()
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

  useEffect(() => {
    if (isLoggin) {
      navigate('/')
    }
  }, [isLoggin, navigate])

const [errorRegMessage, setErrorRegMessage] = React.useState(translatedContext.alreadyRegisteredError)  

  function handleSubmit(e) {
    e.preventDefault();
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
    if (errorName || errorEmail || errorPassword) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [errorEmail, errorName, errorPassword])

  return (
    <section className='register'>
      {isLoading? 
        <Preloader/>
      :
      <form 
        className='form'
       // onSubmit={handleSubmit}
      >
        <Heading>{translatedContext.greetings}</Heading>
        <p className='register__title-stage'>{translatedContext.emailIsConfirmTitle}</p>
        <p className='register__title-stage'>{translatedContext.secondStepTitle}</p>
        <fieldset className='fieldset'>
          <label className='register__inputname'>{translatedContext.name}<span className='register__inputname-span'>*</span>
            <input className='register__input'
              required
              name="name"
              type="text"
              autoComplete="on"
              defaultValue=""
              //onChange={handleNameChange}
            />
            </label>
            <span className='register__inputmistake'>{errorNameMessage}
            </span>  
    
          <label className='register__inputname'>{translatedContext.email}<span className='register__inputname-span'>*</span>
            <input className='register__input'
              required
              name="email"
              type="email"
              autoComplete="on"
              defaultValue=""
              //onChange={handleEmailChange}
            />  
          </label>
          <span className='register__inputmistake'>{errorEmailMessage}
          </span>

          <label className='register__inputname'>{translatedContext.password}<span className='register__inputname-span'>*</span>
            <input className='register__input'
              required
              name="password"
              type="password"
              maxLength="8"
              minLength="5"
              autoComplete="on"
              defaultValue=""
              //onChange={handlePasswordChange}
            />
          </label>
          <span className='register__inputmistake'>{errorPasswordMessage}
          </span>
        </fieldset>

        {isRegError && !isRegErrorEmailChanging?
            <span className='register__inputmistake'>{errorRegMessage}</span>
          : 
            <></>
        }

        <button
          type="submit"
          className={`'register__btn' ${isValid? 'register__btn_active': 'register__btn'}`}
          disabled={!isValid}>
            {translatedContext.button}
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