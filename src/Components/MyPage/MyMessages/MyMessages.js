import { useParams } from 'react-router-dom'
import { useEffect } from "react";
import {LanguageContext} from '../../../contexts/TranslationContext'
import choose from '../../../const/MessagesData'
import Message from './Message'
import './MyMessages.css'
import * as Api from '../../../Api/Api'
import React from 'react'
import BackBtn from '../../../UK-kit/BackBtn'


function MyMessages({ getOneConversation, markMessagesAsRead, onConversation }) {
    const { language } = React.useContext(LanguageContext)
    const [lastMessages, setLastMessages] = React.useState({})
    const userId = useParams()

    const { en, rus, hebrew } = choose;

    let translatedContext = '';
      if (language === 'en') {
        translatedContext = en;
      } else if (language === 'rus') {
        translatedContext = rus;
      } else if (language === 'hebrew') {
        translatedContext = hebrew;
    }
    
    useEffect(()=>{
        getLastMessageFromEveryConversation(userId.userId)
    },[])

    function getLastMessageFromEveryConversation(userId) {
        Api.getLastMessageFromEveryConversation(userId)
        .then((res) => {
          setLastMessages(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    async function updateConversationIsDeleted(user_id, conversation_id) {
        try {
          const res = await Api.updateConversationIsDeleted(user_id, conversation_id)
          setLastMessages((state) => state.filter((m) => m.conversation_id !== conversation_id))
        } catch (err) {
          console.log(err);
        }
      }
    
    return(
        <section className="my-messages__section">
            <BackBtn className='backBtn_margin-left'/>
            {lastMessages.length?  
                <ul className="message__wrapper">
                
                    {lastMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((item) => (  ///.reverse()
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
                    <p className="my-messages__no-length-text">{translatedContext.noMessages}</p>
                </div>
            } 
        </section>
    )
}

export default MyMessages;