import React from 'react'

import { Link } from 'react-router-dom'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/RegistrationPageLanguage'
import Preloader from '../../Components/Preloader/Preloader'
import Heading from '../../UK-kit/Heading/Heading'

function PasswordRecoveryCodeRequestPage({updatePassword, onSendBtn, isRegError, isLoading, isVerificationCodeSentMessage, isVerificationCodeSent, verifyCode, isEmailConfirmed, handleLogout}){

const [email, setEmail] = React.useState('')
const [code, setCode] = React.useState('')
const [newPassword, setPassword] = React.useState('')

const [errorEmailMessage, setErrorEmailMessage] = React.useState('')
const [errorCodeMessage, setErrorCodeMessage] = React.useState('')
const [errorPasswordMessage, setErrorPasswordMessage] = React.useState('')

const [errorEmail, setErrorEmail] = React.useState(true)
const [errorCode, setErrorCode] = React.useState(true)
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
function fake(e) {
  e.preventDefault()
  //создать функцию смены пароля

  updatePassword({
    email, newPassword
  })

  setIsRegErrorEmailChanging(false)
  setEmail('')
  setCode('')
  setPassword('')

  setErrorEmailMessage('')
  setErrorCodeMessage('')
  setErrorPasswordMessage('')

  setErrorEmail(true)
  setErrorCode(true)
  setErrorPassword(true) 

  setIsValid(false)
}

  function handleSubmit(e) {
    e.preventDefault();
    onSendBtn(email);
    setIsRegErrorEmailChanging(false)
    setIsValid(false)
    setErrorCode(true)
    //handleLogout()
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
    if (errorPassword) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [errorPassword])

  return (
    <section className='register'>
      {isLoading? 
        <Preloader/>
      :
      <>
        {isEmailConfirmed?
              <form 
                className='form'
                onSubmit={fake}
              >
                <Heading>Восстановление пароля</Heading>
                
                <fieldset className='fieldset'>
                  <label className='register__inputname'>{translatedContext.email}
                    <div className='register__input-email'>{email}</div>
                  </label>
                  <span className='register__inputmistake'></span> 


                  <p className='register__title-stage'>Введите новый пароль</p>
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
                    Изменить пароль
                </button>

                <div className='register__wrapper'>
                  <p className='register__subtitle'>{translatedContext.question}
                  <Link className='register__entrylink' to="/signin"> {translatedContext.signin}</Link></p>
                </div>
            </form>
        :
          <>
            
            {
              isVerificationCodeSent?
                <form 
                  className='form'
                  onSubmit={onVerifyCode}>
                  <Heading>Восстановление пароля</Heading>
                  <fieldset className='fieldset'>
                    <p>Код отправлен на электронную почту {email}</p>
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
                    <p className='register__inputmistake'>{isVerificationCodeSentMessage}</p>
                    {/*<span className='register__inputmistake'></span>  Нужно передавать сообщение которое придет с бекенда истек срок кода или неверный код*/}
                  </fieldset>

                  {/*<p>ТАЙМЕР</p>*/}

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
                  className='form' 
                  onSubmit={handleSubmit}>
                  <Heading>Восстановление пароля</Heading>

                  <fieldset className='fieldset'>
                    <label className='register__inputname'>Введите email, на него будет отправлен код для восстановления пароля
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


          </>
        }
      </>
      }
    </section>
  );
}

export default PasswordRecoveryCodeRequestPage