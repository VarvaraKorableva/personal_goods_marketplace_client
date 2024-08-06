import '../Popups.css'
import React, { useEffect, useState, useRef } from 'react'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'
import OneMyMessage from './OneMyMessage'

function OneConversationPopup({onClose, isOpen, getOneConversation, receiver_id, sender_id, item_id, coversations, createNewMessage, deleteOneMessage, userName}) {
    const currentUser = React.useContext(CurrentUserContext)
    const userId = currentUser.user_id

    const [messageText, setMessageText] = useState('')
    const [isMessageText, setIsMessageText] = useState(false)
    const [messageTextErrorMessage, setMessageTextErrorMessage] = useState('')
    const [isValid, setIsValid] = useState(false)

    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Прокрутка контейнера до самого низа при открытии попапа
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [coversations]);


    useEffect(() => {
        getOneConversation(receiver_id, sender_id, item_id)
    }, [receiver_id, sender_id, item_id])


    function handleCreateNewMessage(e) {
        e.preventDefault()

        receiver_id === userId?
            createNewMessage(sender_id, item_id, messageText)
        :
            createNewMessage(receiver_id, item_id, messageText)

        setMessageText('')
        setIsMessageText(false)
    }

    function handleTextChanged(e) {
        if(e.target.value.length > 400){
            setIsMessageText(false)
            setMessageText(e.target.value)
            setMessageTextErrorMessage('Максимально количество символов 400')

        } else if(e.target.value) {
            setMessageText(e.target.value)
            setIsMessageText(true)
            setMessageTextErrorMessage('')
        } else {
            setIsMessageText(false)
            setMessageText(e.target.value)
        }
    }

    useEffect(()=>{
        if(isMessageText) {
            setIsValid(true)
        }else {
            setIsValid(false)
        }
    },[isMessageText])

    return(
        <div className={`popup ${isOpen && 'popup__opened'}`}>
        <div className="popup__container">
            <button 
              className="popup__close-button" 
              type="button" 
              onClick={onClose}>
            </button>
    
            <div className="oneConversationPopup__wrapper">
                
            <ul className="oneConversationPopup__messages-container">
                {coversations.map((message) =>(
                    
                  <OneMyMessage 
                    key={message.message_id}
                    message={message}
                    deleteOneMessage={deleteOneMessage}
                    userName={userName}
                  />
                        
                ))}

                <div ref={messagesEndRef} />
            </ul> 

            <form onSubmit={handleCreateNewMessage} className="oneConversationPopup__form">
                <textarea 
                    onChange={handleTextChanged} 
                    className="oneConversationPopup__textarea"
                    value={messageText}
                >
                </textarea>

                {isMessageText?
                    <span className='popup__mistake-msg'></span>
                : 
                    <span className='popup__mistake-msg'>{messageTextErrorMessage}</span>
                }

                <button type='submit' className={isValid?"oneConversationPopup__submit-btn_active":"oneConversationPopup__submit-btn"} disabled={!isValid}>Ответить</button>
            </form>

            </div>
        </div>
        </div>
    )
}

export default OneConversationPopup;