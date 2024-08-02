import '../Popups.css'
import React, { useEffect, useState } from 'react'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'

function OneConversationPopup({onClose, isOpen, getOneConversation, receiver_id, sender_id, item_id, coversations, createNewMessage, deleteOneMessage}) {
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

        receiver_id === userId?
            createNewMessage(sender_id, item_id, messageText)
        :
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

    function handleMessageDelete(message_id) {
        deleteOneMessage(message_id)
    }

    useEffect(()=>{
        if(isMessageText) {
            setIsValid(true)
        }else {
            setIsValid(false)
        }
    },[isMessageText])
/*
    console.log(coversations)
    const revConv = coversations.reverse()
    console.log(revConv)*/

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
                            key={message.message_id}
                            >
                            <p>{message.message_text}</p>

                            {message.sender_id == userId? 
                                <button 
                                    className='oneConversationPopup__deleteBtn'
                                    onClick={() => handleMessageDelete(message.message_id)}
                                >
                                    Удалить
                                </button>
                            :
                                <></>
                        }
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