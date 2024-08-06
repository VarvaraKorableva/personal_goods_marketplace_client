import React from 'react'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'

function OneMyMessage({message, deleteOneMessage, userName}) {

    const currentUser = React.useContext(CurrentUserContext)
    const userId = currentUser.user_id

    function onMessagesDelete() {
        deleteOneMessage(message.message_id)
    }

    return(
        <li 
          className={message.sender_id === userId? "oneConversationPopup__oneMessage_user" : "oneConversationPopup__oneMessage"}
        >

          {message.sender_id === userId? 
            <></>
          :
            <p className='oneConversationPopup__userName'>{userName} :</p>
          }

          <p>{message.message_text}</p>

          {message.sender_id === userId? 
            <button 
                className='oneConversationPopup__deleteBtn'
                onClick={onMessagesDelete}
            >
                Удалить
            </button>
          :
            <></>
          }
        </li>
    )
}

export default OneMyMessage