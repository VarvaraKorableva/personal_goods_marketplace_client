import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import Message from './Message'
import './MyMessages.css'
import * as Api from '../../../Api/Api'
import React from 'react'
import BackBtn from '../../../UK-kit/BackBtn'

function MyMessages({ getOneConversation, markMessagesAsRead, onConversation }) {
    const [lastMessages, setLastMessages] = React.useState({})
    const userId = useParams()
    const navigate = useNavigate()

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

    async function updateConversationIsDeleted(user_id, conversation_id) {
        try {
          const res = await Api.updateConversationIsDeleted(user_id, conversation_id)
          setLastMessages((state) => state.filter((m) => m.conversation_id !== conversation_id))
          //console.log(res)
        } catch (err) {
          console.log(err);
        }
      }
  
    const goBack = () => {
        navigate(-1);
    }; 

    return(
        <section className="my-messages__section">
            <BackBtn/>
            {lastMessages.length?  
                <ul className="message__wrapper">
                
                    {lastMessages.map((item) => (  ///.reverse()
                        <Message
                            key={item.message_id}
                            message={item}
                            getOneConversation={getOneConversation}
                            onConversation={onConversation}
                            markMessagesAsRead={markMessagesAsRead}
                            updateConversationIsDeleted={updateConversationIsDeleted}
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