export const BASE_URL = '//localhost:3001';
//export const BASE_URL = '//personal-goods-marketplace-api.onrender.com'

export const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    } else {
        return Promise.reject(res.status);
      //return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
};

export const register = ( {username, email, password} ) => {
  return fetch(`${BASE_URL}/users/signup`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password
      })
  }).then((res) => {
    return checkResponse(res);
  });
}; 

export const authorize = ( {email, password} ) => {
  return fetch(`${BASE_URL}/users/signin`, {
      credentials: 'include',
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        email: email, 
        password: password,
      })
  })
      .then(checkResponse)
};
///не использую?
export const getContent = () => {
    return fetch(`${BASE_URL}/items`, {
        credentials: 'include',
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(checkResponse)
        
};

export const getCategory = () => {
    return fetch(`${BASE_URL}/category`, {
        credentials: 'include',
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(checkResponse) 
};

export const createItem = (otherData) => {
  return fetch(`${BASE_URL}/items`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      category_id: otherData.category_id,
      title: otherData.title,
      owner_id: otherData.owner_id,
      city: otherData.city,
      price: otherData.price,
      description: otherData.description,
      size: otherData.size,
      color: otherData.color, 
      condition: otherData.condition,        
    })
  })
    .then(checkResponse);
}

export const getUserItems = (owner_id) => {
  return fetch(`${BASE_URL}/items/userId/${owner_id}`, {
      credentials: 'include',
      method: "GET",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
  })
      .then(checkResponse) 
};

export const getItemsByCategory = (category_id) => {
  return fetch(`${BASE_URL}/items/categoryId/${category_id}`, {
      credentials: 'include',
      method: "GET",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
  })
      .then(checkResponse) 
};

//получение айтемов при первом нажатии на родительскую категорию
export const getItemsBySubCategoriesByParentId = (parent_id) => {
    return fetch(`${BASE_URL}/items/getItemsBySubCategoriesByParentId/${parent_id}`, {
        credentials: 'include',
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(checkResponse) 
  };

export const getItemById = (item_id) => {
  return fetch(`${BASE_URL}/items/all/${item_id}`, {
      credentials: 'include',
      method: "GET",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
  })
      .then(checkResponse) 
};

export const getUserById = (user_id) => {
  return fetch(`${BASE_URL}/users/${user_id}`, {
      credentials: 'include',
      method: "GET",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
  })
      .then(checkResponse) 
};

export const getAllItems = () => {
  return fetch(`${BASE_URL}/items/all`, {
      credentials: 'include',
      method: "GET",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
  })
      .then(checkResponse) 
};

export const deleteItem = (item_id) => {
  return fetch(`${BASE_URL}/items/${item_id}`, {
      credentials: 'include',
      method: "PATCH",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
  })
      .then(checkResponse) 
};

export const deleteFromFavoritesServer = (item_id) => {
  return fetch(`${BASE_URL}/favoriteItems/${item_id}`, {
      credentials: 'include',
      method: "DELETE",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
  })
      .then(checkResponse) 
};

export const addToFavoritesServer = ( {favorite_collector_id, item_id} ) => {
  return fetch(`${BASE_URL}/favoriteItems`, {
      credentials: 'include',
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        favorite_collector_id,
        item_id
      })
  })
      .then(checkResponse)
};

export const getMyFavorites = (favorite_collector_id) => {
  return fetch(`${BASE_URL}/favoriteItems/${favorite_collector_id}`, {
      credentials: 'include',
      method: "GET",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
  })
      .then(checkResponse) 
};

export const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
      credentials: 'include',
      method: "GET",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
  })
      .then(checkResponse) 
};

export const uploadFile = (formData) => {
  return fetch(`${BASE_URL}/files/upload-single`, {
    credentials: 'include',
    method: "POST",
    body: formData
  })
  .then(checkResponse);
};

export const uploadMultipleFiles = (formData) => {
    return fetch(`${BASE_URL}/files/uploadMultipleFiles`, {
      credentials: 'include',
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Fetch error:', error);
      throw error;
    });
  };

export const deleteImage = (item_id) => {
  return fetch(`${BASE_URL}/files/images/${item_id}`, {
      credentials: 'include',
      method: "DELETE",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
  })
      .then(checkResponse) 
};

//conversations
export const createConversation = ( {conversation_owner_id, item_owner_id, item_id} ) => {
    return fetch(`${BASE_URL}/conversations/create_conversation`, {
        credentials: 'include',
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            conversation_owner_id,
            item_owner_id,
            item_id
        })
    })
        .then(checkResponse)
};
//получение всех посл сообщений из всех конв по 1 юзеру
/*
never use
export const getLastMessagesFromEveryConversationForUser = (user_id) => {
    return fetch(`${BASE_URL}/conversations/getLastMessagesForUser/${user_id}`, {
        credentials: 'include',
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(checkResponse) 
  }; */
//getLastMessagesForUser


//never use
/*
export const getAllUserConversations = (user_id) => {
    return fetch(`${BASE_URL}/conversations/get_all_user_conversations/${user_id}`, {
        credentials: 'include',
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(checkResponse) 
  };  */



///messages
export const getLastMessageFromEveryConversation = ( user_id ) => {
    return fetch(`${BASE_URL}/messages/getLastMessageFromEveryConversation/${user_id}`, {
        credentials: 'include',
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(checkResponse)
};

export const getOneConversation = ( receiver_id, sender_id, item_id, my_user_id ) => {
    return fetch(`${BASE_URL}/messages/getOneConversation/${receiver_id}/${sender_id}/${item_id}/${my_user_id}`, {
        credentials: 'include',
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(checkResponse)
};

export const getUnreadbleMessages = ( user_id ) => {
    return fetch(`${BASE_URL}/messages/getUnreadbleMessages/${user_id}`, {
        credentials: 'include',
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(checkResponse)
};

export const addMessage = ( {receiver_id, sender_id, item_id, message_text, conversation_id} ) => {
    return fetch(`${BASE_URL}/messages`, {
        credentials: 'include',
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            receiver_id,
            sender_id,
            item_id,
            message_text,
            conversation_id,
        })
    })
        .then(checkResponse)
  };  

  export const deleteMessage = (message_id) => {
    return fetch(`${BASE_URL}/messages/${message_id}`, {
        credentials: 'include',
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(checkResponse) 
  };

  export const markMessagesAsRead = ( conversation_id, user_id ) => {
      
    return fetch(`${BASE_URL}/messages/markMessagesAsRead/${conversation_id}/${user_id}`, {
        credentials: 'include',
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(checkResponse)
};

export const adCountIncrement = ( user_id ) => {

    return fetch(`${BASE_URL}/users/adCountIncrement/${user_id}`, {
        credentials: 'include',
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(checkResponse)
};

export const adCountDecrement = ( user_id ) => {
      
    return fetch(`${BASE_URL}/users/adCountDecrement/${user_id}`, {
        credentials: 'include',
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(checkResponse)
};

export const sendVerificationCode = ( email ) => {
    return fetch(`${BASE_URL}/verification/sendVerificationCode`, {
        credentials: 'include',
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            email,
        })
    })
        .then(checkResponse)
  };

export const verifyCode = ( email, code ) => {
    return fetch(`${BASE_URL}/verification/verifyCode`, {
        credentials: 'include',
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            email,
            code
        })
    })
        .then(checkResponse)
  };  


export const updateIsReserved = ( item_id, user_id ) => { 
    return fetch(`${BASE_URL}/items/updateIsReserved/${item_id}/${user_id}`, {
        credentials: 'include',
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(checkResponse)
};  

export const getItemsByFilter = (filters) => {
    console.log(filters)
    const queryString = new URLSearchParams(filters).toString();
    return fetch(`${BASE_URL}/items/getItemsByFilter?${queryString}`, {
        credentials: 'include',
        method: "GET",
        headers: {
            "Accept": "application/json",
             "Content-Type": "application/json",
        },
    })
        .then(checkResponse) 
};    


///deleteConversation

export const updateConversationIsDeleted = ( user_id, conversation_id ) => {
      
    return fetch(`${BASE_URL}/conversations/deleteConversation`, {
        credentials: 'include',
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            user_id, conversation_id
        })
    })
        .then(checkResponse)
};  