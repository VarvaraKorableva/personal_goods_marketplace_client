import React from 'react'
import './NotAuthenticatedHeader.css'
import { Link, useLocation } from 'react-router-dom'

function NotAuthenticatedHeader({ translatedContext }) {
  const location = useLocation();

  if (location.pathname === '/signup-first-stage') {
    return (
      <Link to="/signin" className='header_login-link'>
        {translatedContext.login}
      </Link>
    )
  }

  if (location.pathname === '/signin') {
    return (
      <Link to="/signup-first-stage" className='header_registraion-link'>
        {translatedContext.registraion}
      </Link>
    )
  }

  return (
    <div className='header__links-container'>
      <Link to="/signin" className='header_login-link'>
        {translatedContext.login}
      </Link>
      <Link to="/signup-first-stage" className='header_registraion-link'>
        {translatedContext.registraion}
      </Link>
    </div>
  )
}

export default NotAuthenticatedHeader
