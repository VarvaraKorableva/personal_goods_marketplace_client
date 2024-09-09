import './MyMessages.css'
import { Link } from 'react-router-dom'
import React from 'react'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'
import noPictures from '../../../images/nopictures.png'

function Message({message, markMessagesAsRead, onConversation}) {

    const currentUser = React.useContext(CurrentUserContext)
    const userId = currentUser.user_id

    function handleConversationClick(){
        onConversation(message.receiver_id, message.sender_id, message.item_id)
        markMessagesAsRead(message.receiver_id, message.sender_id, message.item_id)
    }

    console.log(message.read)

    return(
        <li className="message__container">

            <div className="message__item-info-wrapper">
                <Link to={`/items/${message.item_id}`} className="message__main-pic-wrapper" >
                    {message.image_location?
                        <img className="message__item-pic" alt = {message.item_title} src={message.image_location}></img>
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

                        {/*{message.read? <></> : <div className="message__unread-message-badge"></div>}*/}
                    
                   </div>
                </Link>
            </div>
            
        </li>
    )
}

export default Message;