import '../../Components/Popups/Popups.css'
import './ConversationPage.css'
import React, { useEffect, useState, useRef } from 'react'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import OneMyMessage from './OneMyMessage'

function ConversationPage({ getOneConversation, receiver_id, sender_id, item_id, coversations, createNewMessage, deleteOneMessage, userName }) {
    const currentUser = React.useContext(CurrentUserContext)
    const userId = currentUser.user_id

    const [messageText, setMessageText] = useState('')
    const [isMessageText, setIsMessageText] = useState(false)
    const [messageTextErrorMessage, setMessageTextErrorMessage] = useState('')
    const [isValid, setIsValid] = useState(false)

    const messagesEndRef = useRef(null);

    useEffect(() => {
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
            createNewMessage(sender_id, item_id, messageText, coversations[0].conversation_id)
        :
            createNewMessage(receiver_id, item_id, messageText, coversations[0].conversation_id)

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
    //{userName.item.title? <h3>{userName.item[0].title}</h3> : <></>}
    //console.log('userName.item[0].title', userName.item[0].title)
    return(

        
        <div className="conversationPage__wrapper">
           
           {userName.item.title? <h3>{userName.item[0].title}</h3> : <></>}
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
    )
}

export default ConversationPage;