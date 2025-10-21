import React from 'react'
import './AuthenticatedHeader.css'
import { Link } from 'react-router-dom'

function AuthenticatedHeader({ handleAddAdClick, handleGetUnreadbleMessages, unreadbleMessages, userId, translatedContext}) {

    return (
        <div className='AuthenticatedHeader__wrapper'>
            <button className='AuthenticatedHeader__add-announcement-btn' onClick={handleAddAdClick}>{translatedContext.addNewAddBtnName}</button>
              
            <Link to={`/users/${userId}`} className='AuthenticatedHeader__link' onClick={handleGetUnreadbleMessages}>
                <button className='AuthenticatedHeader__add-announcement-btn'>{translatedContext.mypage}</button>
            </Link>

            <Link  to={`/my_favorites`} className='AuthenticatedHeader__link' onClick={handleGetUnreadbleMessages}>
                <button className='AuthenticatedHeader__favorite-btn'></button>
            </Link>

            <Link to={`/users/${userId}/messages`} className='AuthenticatedHeader__link header_link-message-container'>
                <button className='AuthenticatedHeader__message-pic'></button>
                {unreadbleMessages.length > 0? 
                    <div className='AuthenticatedHeader__messages-badge'>{unreadbleMessages.length}</div>
                    :
                    <></>
                }     
            </Link>
        </div> 

    )
}

export default AuthenticatedHeader;