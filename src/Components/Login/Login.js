import React from 'react'
import './Login.css'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/Login'
import { Link } from 'react-router-dom'
import Preloader from '../../Components/Preloader/Preloader'

function Login({ isLoginError, onLogin, isLoading }) {

const [isValid, setIsValid] = React.useState(false)

const [email, setEmail] = React.useState('')
const [password, setPassword] = React.useState('')

const [errorEmailMessage, setErrorEmailMessage] = React.useState('')
const [errorPasswordMessage, setErrorPasswordMessage] = React.useState('')

const [errorEmail, setErrorEmail] = React.useState(true)
const [errorPassword, setErrorPassword] = React.useState(true)

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
    onLogin({
      password,
      email
    });
  }
  
  const handlePasswordChange = (e) => {
    if (!e.target.value.length) {
      setErrorPasswordMessage(translatedContext.errors.passwordMessage.passwordMustBeFilledIn);
      setErrorPassword(true);
    } else if (e.target.value.length < 5) {
      setErrorPasswordMessage(translatedContext.errors.passwordMessage.passwordMustContainAtLeastCharacters);
      setErrorPassword(true);
    } else if (e.target.value.length > 8) {
      setErrorPasswordMessage(translatedContext.errors.passwordMessage.passwordMustNotExceedCharacters);
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
      setErrorEmailMessage(translatedContext.errors.emailMessage.emailMustBeFilledIn)
      setErrorEmail(true)
    } else if (!validEmail) {
      setErrorEmailMessage(translatedContext.errors.emailMessage.invalidEmailFormat)
      setErrorEmail(true)
    } else {
      setErrorEmailMessage('')
      setErrorEmail(false)
    }
    setEmail(e.target.value)
  }
  
  React.useEffect(() => {
    if (errorEmail || errorPassword) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [errorEmail, errorPassword])  

  return (
    <section className='login'>
      {isLoading? 
        <Preloader/>
      :
      <form className='login__form' onSubmit={handleSubmit}>
        <h2 className='login__title'>{translatedContext.title}</h2>

        <fieldset className='login__fieldset'>
          <label  className='login__inputname'>{translatedContext.email}
            <input className='login__input'
                 pattern="^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$"
                 type="email"
                 name="email"
                 autoComplete="on"
                 defaultValue=""
                 onChange={handleEmailChange}
            />
          </label>
          <span className='login__inputmistake'>{errorEmailMessage}</span>

          <label className='login__inputname'>{translatedContext.password}
            <input className='login__input'
                 maxLength="8"
                 name="password"
                 type="password"
                 autoComplete="on"
                 defaultValue=""
                 onChange={handlePasswordChange}
            />
          </label>
          <span className='login__inputmistake'>{errorPasswordMessage}</span>
          
        </fieldset>

        {isLoginError?
          <span className='login__inputmistake'>
            {translatedContext.errors.authenticationError}
          </span>
          :
          <></>
        }

        <button className={`'login__btn' ${isValid? 'login__btn_active': 'login__btn'}`} type='submit' disabled={!isValid}>{translatedContext.button}</button>
          <div className='login__wrapper'>
            <p className='login__subtitle'>{translatedContext.notRegisteredYet}
              <Link className='login__entrylink' to="/signup-first-stage"> {translatedContext.signUp}</Link>
            </p>
          </div>
          <div className='login__wrapper'>
            <p className='login__subtitle'>Забыли пароль?
              <Link className='login__entrylink' to="/recover-password">Восстановить пароль</Link>
            </p>
          </div>
        </form>
      }
    </section>
  )
}

export default Login;