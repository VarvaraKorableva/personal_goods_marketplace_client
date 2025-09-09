import { useState } from "react";
import * as Api from '../Api/Api'

export default function useMessages({ userId, openLoading, closeLoading, closeAllPopups, setPopupMessage, openSuccessfulActionPopup }) {
  const [conversations, setConversations] = useState([]);
  const [unreadbleMessages, setUnreadbleMessages] = useState([]);
  const [userNameForOneConversationPopup, setUserNameForOneConversationPopup] = useState({});
  const [itemTitleForOneConversationPopup, setItemTitleForOneConversationPopup] = useState({});
  const [receiver_idForOneConversationPopup, setReceiver_idForOneConversationPopup] = useState("");
  const [sender_idForOneConversationPopup, setSender_idForOneConversationPopup] = useState("");
  const [item_idForOneConversationPopup, setItem_idForOneConversationPopup] = useState("");
  const [isReserved, setIsReserved] = useState(false);

  // создать новое сообщение (новая переписка)
  const addNewMessage = (message_text, receiverId, itemId) => {
    openLoading();
    Api.createConversation({ conversation_owner_id: userId, item_owner_id: receiverId, item_id: itemId })
      .then((res) => {
        return Api.addMessage({ receiver_id: receiverId, sender_id: userId, item_id: itemId, message_text, conversation_id: res.conversation_id });
      })
      .then(() => {
        closeAllPopups();
        closeLoading();
        setPopupMessage("Сообщение отправлено");
        openSuccessfulActionPopup();
      })
      .catch(() => {
        closeAllPopups();
        closeLoading();
        setPopupMessage("Что-то пошло не так :(");
        openSuccessfulActionPopup();
      });
  };

  // добавить сообщение в существующую переписку
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

  // получить одну переписку
  const getOneConversation = (r_id, s_id, i_id) => {
    openLoading();
    Api.getOneConversation(r_id, s_id, i_id, userId)
      .then((res) => {
        setConversations(res.messages);
        setUserNameForOneConversationPopup(res.user);
        setItemTitleForOneConversationPopup(res.item);
        setIsReserved(res.item.reserved);
        closeLoading();
      })
      .catch(() => {
        closeLoading();
        closeAllPopups();
        setPopupMessage("Something wrong, please try again");
        openSuccessfulActionPopup();
      });
  };

  // удалить сообщение
  const deleteOneMessage = (message_id) => {
    openLoading();
    Api.deleteMessage(message_id)
      .then(() => {
        setConversations((state) => state.filter((item) => item.message_id !== message_id));
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

  const handleUpdateIsReserved = (item_id) => {
    Api.updateIsReserved(item_id, userId)
      .then(() => setIsReserved((prev) => !prev))
      .catch(() => setPopupMessage("Something wrong, please try again"));
  };

  return {
    conversations,
    unreadbleMessages,
    userNameForOneConversationPopup,
    itemTitleForOneConversationPopup,
    receiver_idForOneConversationPopup,
    sender_idForOneConversationPopup,
    item_idForOneConversationPopup,
    isReserved,
    addNewMessage,
    createNewMessageFromConversationPopup,
    getOneConversation,
    deleteOneMessage,
    markMessagesAsRead,
    getUnreadbleMessages,
    selectConversation,
    handleUpdateIsReserved,
  };
}
