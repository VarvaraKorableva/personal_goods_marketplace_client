import React from 'react'
import {CurrentUserContext} from '../../../contexts/CurrentUserContext'

function OneMyMessage({message, deleteOneMessage, userName}) {

    const currentUser = React.useContext(CurrentUserContext)
    const userId = currentUser.user_id

    function onMessagesDelete() {
        deleteOneMessage(message.message_id)
    }

    return(
        <>
        {message.sender_id === userId?

        <li className='oneConversationPopup__oneMessage_user'>
          <p className='oneConversationPopup__text'>{message.message_text}</p>
          <button 
            className='oneConversationPopup__deleteBtn'
            onClick={onMessagesDelete}
          >
            Удалить
          </button>
        </li>
        :
        <li className='oneConversationPopup__oneMessage'>
          <p className='oneConversationPopup__userName'>{userName} :</p>
          <p className='oneConversationPopup__text'>{message.message_text}</p>
        </li>
        }
        </>
    )
}

export default OneMyMessage