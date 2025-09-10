import { useState } from "react";
import * as Api from '../Api/Api'

export default function useMessages( 
  
    userId, {
    openLoading, closeLoading, closeAllPopups, setPopupMessage, openSuccessfulActionPopup, setReceiverId, 
    setItemId, setSuccessfulActionPopup, receiverId, itemId, setIsReserved,
  }) {

  const [conversations, setConversations] = useState([]);
  const [unreadbleMessages, setUnreadbleMessages] = useState([]);
  const [userNameForOneConversationPopup, setUserNameForOneConversationPopup] = useState({});
  const [itemTitleForOneConversationPopup, setItemTitleForOneConversationPopup] = useState({});
  const [receiver_idForOneConversationPopup, setReceiver_idForOneConversationPopup] = useState("");
  const [sender_idForOneConversationPopup, setSender_idForOneConversationPopup] = useState("");
  const [item_idForOneConversationPopup, setItem_idForOneConversationPopup] = useState("");


  // добавить сообщение в существующую переписку +++++++++++
  const createNewMessageFromConversationPopup = (receiver_id, item_id, message_text, conversation_id) => {
    openLoading();
    Api.addMessage({ receiver_id, sender_id: userId, item_id, message_text, conversation_id })
      .then(() => {
        getOneConversation(receiver_id, userId, item_id);
        closeLoading();
      })
      .catch(() => {
        closeLoading();
        closeAllPopups();
        setPopupMessage("Something wrong, please try again");
        openSuccessfulActionPopup();
      });
  };

  // отметить прочитанными
  const markMessagesAsRead = (conversation_id) => {
    Api.markMessagesAsRead(conversation_id, userId)
      .then(() => getUnreadbleMessages(userId))
      .catch(console.log);
  };

  // получить непрочитанные
  const getUnreadbleMessages = (userId) => {
    Api.getUnreadbleMessages(userId)
      .then((res) => setUnreadbleMessages(res))
      .catch(console.log);
  };
  // выбрать текущую переписку
  const selectConversation = (r_id, s_id, i_id) => {
    setReceiver_idForOneConversationPopup(r_id);
    setSender_idForOneConversationPopup(s_id);
    setItem_idForOneConversationPopup(i_id);
  };

    //createMessage create conversation and create first message popup
    const addNewMessage = (message_text) => {
      openLoading()
      Api.createConversation({conversation_owner_id: userId, item_owner_id: receiverId, item_id: itemId}) 
        .then((res)=> {
          
          Api.addMessage({receiver_id: receiverId, sender_id: userId, item_id: itemId, message_text, conversation_id: res.conversation_id}) 
          .then((res) => {
            
            closeAllPopups()
            //setConversations([res, ...conversations])
            setReceiverId('')
            setItemId('')
            closeLoading()
            setSuccessfulActionPopup(true)
            setPopupMessage('Сообщение отправлено')
          })
          .catch((err) => {
            closeLoading()
            closeAllPopups()
            setSuccessfulActionPopup(true)
            setPopupMessage('Что-то пошло не так :(')
          })
        })
      .catch((err) => {
        closeLoading()
        closeAllPopups()
        setSuccessfulActionPopup(true)
        setPopupMessage('Что-то пошло не так :(')
      })
    }


  const getOneConversation = (r_id, s_id, i_id) => {
    openLoading()
    Api.getOneConversation(r_id, s_id, i_id, userId)
    .then((res) => {
      setConversations(res.messages)
      setUserNameForOneConversationPopup(res)//.user.username
      setItemTitleForOneConversationPopup(res.item)
      setIsReserved(res.item.reserved)
      closeLoading()
    })
    .catch((err) => {
      console.log(err)
      closeLoading()
      closeAllPopups()
      setPopupMessage("Something wrong, plese try again")
      openSuccessfulActionPopup()
    })
  }
/*
    function deleteOneMessage(message_id) {
      openLoading()
      Api.deleteMessage(message_id)
      .then((res) => {
        setConversations((state) => state.filter((item) => item.message_id !== message_id))
        closeLoading()
      })
      .catch((err) => {
        console.log(err)
        closeLoading()
        closeAllPopups()
        setPopupMessage("Something wrong, plese try again")
        openSuccessfulActionPopup()
      })
    }  
*/
  return {
    createNewMessageFromConversationPopup,
    selectConversation,
    receiver_idForOneConversationPopup,
    sender_idForOneConversationPopup,
    item_idForOneConversationPopup,
    userNameForOneConversationPopup,
    itemTitleForOneConversationPopup,
    addNewMessage,
    getOneConversation,
    setConversations,
    conversations,
    
  };
}
