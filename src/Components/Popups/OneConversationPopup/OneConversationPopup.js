import '../Popups.css'
import React, { useEffect, useState } from 'react'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'

function OneConversationPopup({onClose, isOpen, getOneConversation, receiver_id, sender_id, item_id, coversations, createNewMessage}) {
    const currentUser = React.useContext(CurrentUserContext)
    const userId = currentUser.user_id


    const [messageText, setMessageText] = useState('')
    const [isMessageText, setIsMessageText] = useState(false)
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        getOneConversation(receiver_id, sender_id, item_id)
    }, [receiver_id, sender_id, item_id])


    function handleCreateNewMessage(e) {
        e.preventDefault()
        createNewMessage(receiver_id, item_id, messageText)
        setMessageText('')
    }

    function handleTextChanged(e) {
        if(e.target.value) {
            setMessageText(e.target.value)
            setIsMessageText(true)
        } else {
            setIsMessageText(false)
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
                    
                    <li 
                        className={message.sender_id == userId? "oneConversationPopup__oneMessage_user" : "oneConversationPopup__oneMessage"}
                        key={message.message_id}>
                        {message.message_text}
                    </li>
                ))}
            </ul> 

            <form onSubmit={handleCreateNewMessage} className="oneConversationPopup__form">
                <textarea onChange={handleTextChanged} className="oneConversationPopup__textarea"></textarea>
                <button type='submit' className={isValid?"oneConversationPopup__submit-btn_active":"oneConversationPopup__submit-btn"} disabled={!isValid}>Ответить</button>
            </form>
            </div>
        </div>
        </div>
    )
}

export default OneConversationPopup;