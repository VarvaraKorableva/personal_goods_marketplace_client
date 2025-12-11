import React, {useEffect} from 'react'
import './Registration.css'
import { Link, useNavigate } from 'react-router-dom'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/RegistrationPageLanguage'
import Preloader from '../Preloader/Preloader'
import Heading from '../../UK-kit/Heading/Heading'
import { FaCheckCircle } from "react-icons/fa";

function RegistrationFirstStage({onRegister, onSendBtn, isRegError, isLoading, isVerificationCodeSentMessage, isVerificationCodeSent, verifyCode, isEmailConfirmed, isLoggin}){
  const navigate = useNavigate()
  const [email, setEmail] = React.useState('')
  const [code, setCode] = React.useState('')
  const [username, setName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [telegram, setTelegram] = React.useState('')

const [isAgreement, setIsAgreement] = React.useState(false)
const [isPolicyAgreement, setIsPolicyAgreement] = React.useState(false)

const [errorEmailMessage, setErrorEmailMessage] = React.useState('')
const [errorCodeMessage, setErrorCodeMessage] = React.useState('')
const [errorPasswordMessage, setErrorPasswordMessage] = React.useState('')
const [errorNameMessage, setErrorNameMessage] = React.useState('')
const [errorAgreementMessage, setErrorAgreementMessage] = React.useState('')
const [errorPolicyAgreementMessage, setErrorPolicyAgreementMessage] = React.useState('')

const [errorEmail, setErrorEmail] = React.useState(true)
const [errorCode, setErrorCode] = React.useState(true)
const [errorName, setErrorName] = React.useState(true)
const [errorPassword, setErrorPassword] = React.useState(true)
const [errorAgreement, setErrorAgreement] = React.useState(true)
const [errorPolicyAgreement, setErrorPolicyAgreement] = React.useState(true)

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

//регистрация 
function handleRegSubmit(e) {
  e.preventDefault()

  onRegister({
    username,
    email,
    password,
    telegram,
  })

  setIsRegErrorEmailChanging(false)
  setEmail('')
  setCode('')
  setPassword('')
  setName('')
  setTelegram('')

  setErrorEmailMessage('')
  setErrorCodeMessage('')
  setErrorPasswordMessage('')
  setErrorNameMessage('')
  setErrorAgreementMessage('')
  setErrorPolicyAgreementMessage('')

  setErrorEmail(true)
  setErrorCode(true)
  setErrorName(true)
  setErrorPassword(true) 
  setErrorAgreement(true)
  setErrorPolicyAgreement(true)

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

  const handleTelegramChange = (e) => {
      setTelegram(e.target.value);
  };

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
/*
  const handleAgreementChange = (e) => {
  if(e.target.checked) {
    setIsAgreement(e.target.checked) 
    setErrorAgreement(false)
    setErrorAgreementMessage("")
  } else {
    setIsAgreement(e.target.checked) 
    setErrorAgreement(true)
    setErrorAgreementMessage("Укажите, что вы согласны с правилами размещения объявлений и политикой обработки персональных данных")
  }
  }

  const handlePolicyAgreementChange = (e) => {
    if(e.target.checked) {
      setIsPolicyAgreement(e.target.checked) 
      setErrorPolicyAgreement(false)
      setErrorAgreement(false)
      setErrorAgreementMessage("")
    } else {
      setIsPolicyAgreement(e.target.checked) 
      setErrorPolicyAgreement(true)
      setErrorAgreement(true)
      setErrorAgreementMessage("Укажите, что вы согласны с правилами размещения объявлений и политикой обработки персональных данных")
    }
    }
*/
  React.useEffect(() => {
    if (errorEmail || errorCode) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [errorEmail, errorCode])


  React.useEffect(() => {
    if (errorName || errorPassword) { //|| errorAgreement || errorPolicyAgreement
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [errorName, errorPassword])// errorAgreement, errorPolicyAgreement

  return (
    <section className='register'>
      {isLoading? 
        <Preloader/>
      :
      <>
        {isEmailConfirmed?
          <form 
                className='form'
                onSubmit={handleRegSubmit}
              >
                <Heading>{translatedContext.greetings}</Heading>
                <p className='register__title-stage'>{translatedContext.secondStepTitle}</p>
                <p className='register__title-stage'>{translatedContext.emailIsConfirmTitle}</p>
                <fieldset className='fieldset'>
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

                  <label className='register__inputname'>{translatedContext.telegram}
                    <input className='register__input'
                      
                      name="name"
                      type="text"
                      autoComplete="on"
                      defaultValue=""
                      onChange={handleTelegramChange}
                    />
                  </label>
                  
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

                  <div className="register__agreement">
                    <FaCheckCircle className="register__agreement__input"></FaCheckCircle>
                    <Link to="/publication-rules" target="_blank" className="register__agreement__link">Согласие с правилами размещения объявлений</Link>
                  </div>

                  <div className="register__agreement">
                    <FaCheckCircle className="register__agreement__input"></FaCheckCircle>
                    <Link to="/privacy-policy" target="_blank" className="register__agreement__link">Согласие с политикой обработки персональных данных</Link>
                  </div>

                  
                {/** 
                  <div className="register__agreement">
                      <input
                        type="checkbox"
                        name="termsAgreement"
                        required
                        className="register__agreement__input"
                        onChange={handleAgreementChange}
                      />
                         
                      <Link to="/publication-rules" target="_blank" className="register__agreement__link">Согласие с правилами размещения объявлений</Link>
                      
                  </div>

                  <div className="register__agreement">
                      <input
                        type="checkbox"
                        name="termsAgreement"
                        required
                        className="register__agreement__input"
                        onChange={handlePolicyAgreementChange}
                      />
                         
                      <Link to="/privacy-policy" target="_blank" className="register__agreement__link">Согласие с политикой обработки персональных данных</Link>
                      
                  </div>
                  <span className='register__inputmistake'>{errorAgreementMessage}</span>

                */}  
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
            {/*<Heading>{translatedContext.greetings}</Heading>
            <p className='register__title-stage'>{translatedContext.firstStepTitle}</p>*/}

            {
              isVerificationCodeSent || isRegError?
                <form 
                  className='form'
                  onSubmit={onVerifyCode}
                >
                  <Heading>{translatedContext.greetings}</Heading>
                  <p className='register__title-stage'>{translatedContext.firstStepTitle}</p>

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
                  onSubmit={handleSubmit}
                >
                  <Heading>{translatedContext.greetings}</Heading>
                  <p className='register__title-stage'>{translatedContext.firstStepTitle}</p>

                  <fieldset className='fieldset'>
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
                    <p className='register__btnText'>
                      {translatedContext.verificationEmailButton} {email}
                    </p>
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