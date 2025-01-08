import '../../Components/Popups/Popups.css'
import './ConversationPage.css'
import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import OneMyMessage from './OneMyMessage'
import BackBtn from '../../UK-kit/BackBtn'

function ConversationPage({ isReserved, deleteMyAd, handleUpdateIsReserved, getOneConversation, receiver_id, sender_id, item_id, coversations, createNewMessage, deleteOneMessage, userName, itemTitle }) {
    const currentUser = React.useContext(CurrentUserContext)
    const userId = currentUser.user_id
    const navigate = useNavigate()
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

    function onDeleteMyAd() {
        deleteMyAd(item_id)
    }

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

    function onUpdateIsReserved() {
        handleUpdateIsReserved(itemTitle.item_id)
      }

    useEffect(()=>{
        if(isMessageText) {
            setIsValid(true)
        }else {
            setIsValid(false)
        }
    },[isMessageText])

    const goBack = () => {
        navigate(-1);
    }

    return(
        <section>
        
        <div className="conversationPage__wrapper">
            <BackBtn/>
           <div className="conversationPage__info-container">
               <div className="conversationPage__title-container">
                <h3 className="conversationPage__title">{itemTitle.title}</h3>
                <h3 className="conversationPage__title">{itemTitle.price} ₪</h3>
               </div>
              {currentUser.user_id !== itemTitle.owner_id ?
                <></>
                :
                <div>
                    {isReserved?
        
                    <button className="conversationPage__reserved-btn" onClick={onUpdateIsReserved}>Снять резервацию</button>
                    :
                    <button className="conversationPage__reserved-btn" onClick={onUpdateIsReserved}>Зарезервировать</button>
                    }
                    <button className="conversationPage__delete-btn" onClick={onDeleteMyAd}>Delete</button>
                </div>
              }
           </div>
            <ul className="conversationPage__messages-container">
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
        </section>
    )
}

export default ConversationPage;