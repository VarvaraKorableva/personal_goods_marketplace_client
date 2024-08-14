import { useParams } from 'react-router-dom'
import { useEffect } from "react";
import Message from './Message'
import './MyMessages.css'
import * as Api from '../../../Api/Api'
import React from 'react'

function MyMessages({ getOneConversation, openOneConversationPopup, markMessagesAsRead, onConversation }) {
    const [lastMessages, setLastMessages] = React.useState({})
    const userId = useParams()
    
    useEffect(()=>{
        getLastMessageFromEveryConversation(userId.userId)
    },[])

    function getLastMessageFromEveryConversation(userId) {
        Api.getLastMessageFromEveryConversation(userId)
        .then((res) => {
          setLastMessages(res)
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
      }

    return(
        <section className="my-messages__section">
            {lastMessages.length?  
                <ul className="message__wrapper">
                
                    {lastMessages.map((item) => (
                        <Message
                            key={item.message_id}
                            message={item}
                            getOneConversation={getOneConversation}
                            openOneConversationPopup={openOneConversationPopup}
                            onConversation={onConversation}
                            markMessagesAsRead={markMessagesAsRead}
                        />
                    ))}
      
                </ul>
            :
                <div className="my-messages__no-length-text-container">
                    <p className="my-messages__no-length-text">У вас нет сообщений</p>
                </div>
            } 
        </section>
    )
}

export default MyMessages;