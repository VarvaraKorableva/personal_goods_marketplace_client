export const BASE_URL = '//localhost:3001';
//https://personal-goods-marketplace-api.onrender.com
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
      method: "DELETE",
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

export const getAllImages = () => {
  return fetch(`${BASE_URL}/files/images/all`, {
      credentials: 'include',
      method: "GET",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
  })
      .then(checkResponse) 
};

export const getUserImagesById = (owner_id) => {
  return fetch(`${BASE_URL}/files/images/${owner_id}`, {
      credentials: 'include',
      method: "GET",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
  })
      .then(checkResponse) 
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

///

export const addMessage = ( {receiver_id, sender_id, item_id, message_text} ) => {
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

  export const markMessagesAsRead = ( receiver_id, sender_id, item_id, user_id ) => {
      
    return fetch(`${BASE_URL}/messages/markMessagesAsRead/${receiver_id}/${sender_id}/${item_id}/${user_id}`, {
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


/*
files_router.post("/upload-single", upload.single("file"), _uploadSingle);
files_router.get("/images/all", getAllImages);
files_router.get("/images/:owner_id", getAllImagesByUserId);
files_router.delete("/image/:item_id", deleteFavoriteItems);
*/