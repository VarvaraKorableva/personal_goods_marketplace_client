//MyMessages
import {useParams} from 'react-router-dom'
import { useEffect } from "react";
import Message from './Message'
import './MyMessages.css'

function MyMessages({getLastMessageFromEveryConversation, lastMessages}) {
    
    const userId = useParams()


    useEffect(()=>{
        getLastMessageFromEveryConversation(userId.userId)
    },[])

    return(
        <section>
            <p>Messages</p>
            <ul className="message__wrapper">
                {lastMessages.map((item) => (
                    <Message
                        key={item.message_id}
                        message={item}
                    />
                ))}
            </ul>
        </section>
    )
}

export default MyMessages;