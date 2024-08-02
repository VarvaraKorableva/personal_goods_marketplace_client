import { useParams } from 'react-router-dom'
import { useEffect } from "react";
import Message from './Message'
import './MyMessages.css'

function MyMessages({getLastMessageFromEveryConversation, lastMessages, getOneConversation, openOneConversationPopup}) {
    
    const userId = useParams()

    useEffect(()=>{
        getLastMessageFromEveryConversation(userId.userId)
    },[])

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