import React from 'react'
import {CurrentUserContext} from '../../contexts/CurrentUserContext'

function OneMyMessage({message, deleteOneMessage, userName}) {

    const currentUser = React.useContext(CurrentUserContext)
    const userId = currentUser.user_id

    const isMyMessage = message.sender_id === userId;

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
          {userName.user.user_id === userId?
            <p className='oneConversationPopup__userName'>{userName.userSecond.username}:</p>
            :
            <p className='oneConversationPopup__userName'>{userName.user.username}:</p>
        }
          
          <p className='oneConversationPopup__text'>{message.message_text}</p>
        </li>
        }
        </>
    )
}

export default OneMyMessage