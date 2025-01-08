import React from 'react'
import {LanguageContext} from '../../contexts/TranslationContext'
import choose from '../../const/Login'
import { Link } from 'react-router-dom'


function RecoverPasswordPage({isLoginError, onSendBtn, isLoading}) {
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
    onSendBtn(email);
  }

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
    if (errorEmail) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [errorEmail]) 
  return (
    <section>
      {isLoading? 
        <></>
      :
      <form className='login__form' onSubmit={handleSubmit}>
        <h2 className='login__title'>Получить код для восстановления пароля</h2>

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
        </fieldset>

        {isLoginError?
          <span className='login__inputmistake'>
            {translatedContext.errors.authenticationError}
          </span>
          :
          <></>
        }

        <button className={`'login__btn' ${isValid? 'login__btn_active': 'login__btn'}`} type='submit' disabled={!isValid}>Отправить код на почту {email}</button>
      </form>
      }
    </section>
  )
}

export default RecoverPasswordPage;