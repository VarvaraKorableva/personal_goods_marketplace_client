import './MyMessages.css'
import { Link } from 'react-router-dom'

function Message({message, openOneConversationPopup}) {
/*
    function handleGetOneConversation() {
        getOneConversation(message.receiver_id, message.sender_id, message.item_id)
    }*/

    function handleopenOneConversationPopup(){
        openOneConversationPopup(message.receiver_id, message.sender_id, message.item_id)
    }

    return(
        <li className="message__container" onClick={handleopenOneConversationPopup}>

            <div>
                <div className="message__item-pic">{message.message_id}</div>
                <div>
                    <p className="message__sender-name"></p>
                    <p className="message__item-name"></p>
                    <p className="message__item-name"></p>
                    <p className="message__item-price"></p>
                </div>
            </div>
            
            <p>{message.message_text}</p>
        </li>
    )
}

export default Message;