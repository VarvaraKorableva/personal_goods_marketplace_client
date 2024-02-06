import React from 'react'
import './Registration.css'
import { Link } from 'react-router-dom'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/RegistrationPageLanguage'

function Registration({onRegister, errorMessage, isError}){

/*
username VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
phone VARCHAR(15) NOT NULL
*/    

const [name, setName] = React.useState('')
const [email, setEmail] = React.useState('')
const [password, setPassword] = React.useState('')
const [phone, setPhone] = React.useState('')

const [errorNameMessage, setErrorNameMessage] = React.useState('')
const [errorEmailMessage, setErrorEmailMessage] = React.useState('')
const [errorPasswordMessage, setErrorPasswordMessage] = React.useState('')
const [errorTelMessage, setErrorTelMessage] = React.useState('')

const [errorName, setErrorName] = React.useState(true)
const [errorEmail, setErrorEmail] = React.useState(true)
const [errorPassword, setErrorPassword] = React.useState(true)
const [errorTel, setErrorTel] = React.useState(false)

const [isValid, setIsValid] = React.useState(false);

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
    onRegister({
      password,
      email,
      name
    });
  }

  const handleNameChange = (e) => {
    const validName = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u.test(
      e.target.value
    )

    if (!e.target.value.length) {
      setErrorNameMessage(translatedContext.mistakesName.theUsernameFieldMustBeFilledIn)
      setErrorName(true);
     } else if (e.target.value.length < 2) {
      setErrorNameMessage(translatedContext.mistakesName.theUsernameMustBeAtLeastCharactersLong)
      setErrorName(true);
     } else if (!validName) {
      setErrorNameMessage(translatedContext.mistakesName.theUsernameShouldOnlyContainLatinLettersCyrillicLetters)
      setErrorName(true);
     } else if (validName) {
      setErrorNameMessage('')
      setErrorName(false);
     } else if (e.target.value.length > 30) {
      setErrorNameMessage(translatedContext.mistakesName.usernameMustBeNoMoreThan)
      setErrorName(true);
     } else {
      setErrorNameMessage('')
      setErrorName(false);
     }
     //setName(e.target.value)
     setName(e.target.value[0].toUpperCase() + e.target.value.slice(1));
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

  const handlePhoneChange = (e) => {
    setErrorTel(false)
    if (e.target.value.slice(0,2) === '+7') {
        setPhone(e.target.value.replace(/\D$/, ''))
    const letter = /\D/
      if (letter.test(e.nativeEvent.data) && e.nativeEvent.data) {
        setPhone(e.target.value.replace(/.{0,}/, '+7'))
        setErrorTel(true)
        setErrorTelMessage('Вводите только цифры, без букв и знаков')
        setTimeout(function(){
          setErrorTelMessage('');
        }, 2000)
     }
     
    } else {
      //setTel(e.target.value.replace(/.{0,}/, '+7'))
    } 

    if (phone.length > 11 && e.nativeEvent.data) {
      setErrorTel(true)
      setErrorTelMessage('Вы ввели более 12 символов, введите не более 12 символов')
      console.log('Введите числа, без пробелов или буквенных значений')
    } 
  }
  
  const handleEmailChange = (e) => {
    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      e.target.value
    )
    if (!e.target.value.length) {
      setErrorEmailMessage(translatedContext.mistakesEmail.emailMustBeFilledIn)
      setErrorEmail(true)
    } else if (!validEmail) {
      setErrorEmailMessage(translatedContext.mistakesEmail.invalidEmailFormat)
      setErrorEmail(true)
    } else {
      setErrorEmailMessage('')
      setErrorEmail(false)
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
      <form 
        className='register__form'
        onSubmit={handleSubmit}>
        <h2 className='register__title'>{translatedContext.greetings}</h2>
        <h3 className='register__greetingsText'>{translatedContext.greetingsText}</h3>
        <fieldset className='register__fieldset'>
          <label className='register__inputname'>{translatedContext.name}<span className='register__inputname-span'>*</span>
            <input className='register__input'
              required
              name="name"
              type="text"
              autoComplete="on"
              defaultValue=""
              onChange={handleNameChange}
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
              onChange={handleEmailChange}
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
              onChange={handlePasswordChange}
            />
          </label>
          <span className='register__inputmistake'>{errorPasswordMessage}
          </span>

          <label className='register__inputname'>{translatedContext.password}<span className='register__inputname-span'>*</span>
            <input className='register__input'
              required
              name="phone"
              type="text"
              maxLength="12"
              minLength="10"
              autoComplete="on"
              defaultValue=""
              onChange={handlePhoneChange}
            />
          </label>
          <span className='register__inputmistake'>{errorPasswordMessage}
          </span>

          <span className={`${isError?'register__inputmistake' : ''}`}>{errorMessage}</span>
      </fieldset>
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
    </section>
  );
}

export default Registration;