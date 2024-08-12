import React from 'react'
import './Registration.css'
import { Link } from 'react-router-dom'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/RegistrationPageLanguage'
import Preloader from '../Preloader/Preloader'

function RegistrationFirstStage({onRegister, onSendBtn, isRegError, isLoading, isVerificationCodeSentMessage, isVerificationCodeSent, verifyCode, isEmailConfirmed}){

const [email, setEmail] = React.useState('')
const [code, setCode] = React.useState('')
const [username, setName] = React.useState('')
const [password, setPassword] = React.useState('')

const [errorEmailMessage, setErrorEmailMessage] = React.useState('')
const [errorCodeMessage, setErrorCodeMessage] = React.useState('')
const [errorPasswordMessage, setErrorPasswordMessage] = React.useState('')
const [errorNameMessage, setErrorNameMessage] = React.useState('')

const [errorEmail, setErrorEmail] = React.useState(true)
const [errorCode, setErrorCode] = React.useState(true)
const [errorName, setErrorName] = React.useState(true)
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

//регистрация 
function handleRegSubmit(e) {
  e.preventDefault()

  onRegister({
    username,
    email,
    password
  })

  setIsRegErrorEmailChanging(false)
  setEmail('')
  setCode('')
  setPassword('')
  setName('')

  setErrorEmailMessage('')
  setErrorCodeMessage('')
  setErrorPasswordMessage('')
  setErrorNameMessage('')

  setErrorEmail(true)
  setErrorCode(true)
  setErrorName(true)
  setErrorPassword(true) 

  setIsValid(false)
}

  function handleSubmit(e) {
    e.preventDefault();
    onSendBtn(email);
    setIsRegErrorEmailChanging(false)
    setIsValid(false)
    setErrorCode(true)
  }

  function onVerifyCode(e) {
    e.preventDefault();
    verifyCode(email, code)
    setIsRegErrorEmailChanging(false)
    setIsValid(false)
    setErrorCode(true) 
  }

  const handleCodeChange = (e) => {
    if (!e.target.value.length) {
      setErrorCodeMessage(translatedContext.mistakesPassword.passwordMustBeFilledIn);
      setErrorCode(true);
    } else {
      setErrorCodeMessage('');
      setErrorCode(false);
      setCode(e.target.value);
      setErrorEmail(false)
    }
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
      setErrorCode(false)
    }
    setEmail(e.target.value)
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

  React.useEffect(() => {
    if (errorEmail || errorCode) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [errorEmail, errorCode])


  React.useEffect(() => {
    if (errorName || errorPassword) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [errorName, errorPassword])

  return (
    <section className='register'>
      {isLoading? 
        <Preloader/>
      :
      <>
        {isEmailConfirmed?
              <form 
                className='register__form'
                onSubmit={handleRegSubmit}
              >
                <h2 className='registrationFirstStage__title'>{translatedContext.greetings}</h2>
                <p className='register__title-stage'>{translatedContext.emailIsConfirmTitle}</p>
                <p className='register__title-stage'>{translatedContext.secondStepTitle}</p>
                <fieldset className='register__fieldset'>
                  <label className='register__inputname'>{translatedContext.email}
                    <div className='register__input-email'>{email}</div>
                  </label>
                  <span className='register__inputmistake'></span> 

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
                  <span className='register__inputmistake'>{errorNameMessage}</span>  
        
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
                  <span className='register__inputmistake'>{errorPasswordMessage}</span>
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
        :
          <>
            <h2 className='registrationFirstStage__title'>{translatedContext.greetings}</h2>
            <p className='register__title-stage'>{translatedContext.firstStepTitle}</p>

            {
              isVerificationCodeSent?
                <form 
                  className='registrationFirstStage__form'
                  onSubmit={onVerifyCode}>

                  <fieldset className='register__fieldset'>
                    <h3>Код отправлен на электронную почту {email}</h3>
                    <label className='register__inputname'>{translatedContext.verificationCodeLabel}
                    <input 
                      className='register__input' 
                      required
                      name="text"
                      type="text"
                      defaultValue=""
                      onChange={handleCodeChange}
                    />
                    </label>
                    {/*<span className='register__inputmistake'></span>  Нужно передавать сообщение которое придет с бекенда истек срок кода или неверный код*/}
                  </fieldset>

                  <button
                    type="submit"
                    className={`'register__verification-btn' ${isValid? 'register-verification__btn_active': 'register-verification__btn'}`}
                    disabled={!isValid}
                  >
                    Подтвердить
                  </button>

                </form>

              :

                <form 
                  className='registrationFirstStage__form' 
                  onSubmit={handleSubmit}>

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
                    className={`'register__verification-btn' ${isValid? 'register-verification__btn_active': 'register-verification__btn'}`}
                    disabled={!isValid}
                  >
                    {translatedContext.verificationEmailButton} {email}
                  </button>

                </form>
            }

          <div className='register__wrapper'>
            <p className='register__subtitle'>{translatedContext.question}
            <Link className='register__entrylink' to="/signin"> {translatedContext.signin}</Link></p>
          </div>

          </>
        }
      </>
      }
    </section>
  );
}

export default RegistrationFirstStage;