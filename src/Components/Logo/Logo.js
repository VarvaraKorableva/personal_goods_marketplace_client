import React from 'react'
import './Logo.css'
import { Link } from 'react-router-dom'

function Logo() {

    return (
        <Link to={`/`} className='logo-container'>
            {/*<h1 className='logo'>Personal</h1>*/}
            <div className='logo-img'></div>
            <h1 className='logo'>Marketplace</h1>
        </Link> 

    )
}

export default Logo;
