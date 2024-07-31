import './MyMessages.css'

function Message({message}) {
    return(
        <li className="message__container">
            <div>
                <div className="message__item-pic"></div>
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