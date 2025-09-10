import './MyMessages.css'
import { Link } from 'react-router-dom'
import React from 'react'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'
import noPictures from '../../../images/nopictures.png'

function Message({message, markMessagesAsRead, onConversation, updateConversationIsDeleted, getOneConversation}) {

    const currentUser = React.useContext(CurrentUserContext)
    const userId = currentUser.user_id

    function handleConversationClick(){
        onConversation(message.receiver_id, message.sender_id, message.item_id)
        markMessagesAsRead(message.conversation_id)
    }

    function onDelete() {
        updateConversationIsDeleted(userId, message.conversation_id)
    }

    return(
        <li className={`message__container ${message.deleted ? 'message__container_deleted' : ''}`}>

            <div className="message__item-info-wrapper">
                <Link to={`/items/${message.item_id}`} className="message__main-pic-wrapper" >
                    {message.images?
                        <img className="message__item-pic" alt = {message.item_title} src={message.images[0]}></img>
                        :
                        <div className="message__no-pic-container">
                            <img className="message__no-pic" alt = 'no pic' src={noPictures}></img>
                        </div>
                    }
                </Link>
                <Link 
                    to={`/users/conversation-page/${message.conversation_id}`} 
                    onClick={handleConversationClick}
                    className="message__container-link"
                >
                    <div className="one-message__wrapper">
                        <div className="message__item-info-container">
                            {message.item_owner_id === userId && message.receiver_id === userId? 
                                <p className="message__sender-name">{message.sender_username}</p> 
                            : 
                                <p className="message__sender-name">{message.receiver_username}</p>
                            }
                            <p className="message__item-name">{message.item_title}</p>
                            <p className="message__item-price">{message.item_price} ₪</p>
                        </div>
                    
                        <p className="message__text">{message.message_text}</p>

                        
                   </div>
                </Link>
                <div className="message__btn-container">
                    {message.read ? (
                        <></>
                    ) : message.sender_id === userId ? (
                        <></>
                    ) : (
                        <div className="message__unread-message-badge"></div>
                    )}
                    <button onClick={onDelete} className="message__delete_btn">X</button>
                </div>
            </div>
            
        </li>
    )
}

export default Message;