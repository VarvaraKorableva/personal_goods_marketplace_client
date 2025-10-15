//export const BASE_URL = '//localhost:3001';
export const BASE_URL = '//personal-goods-marketplace-api.onrender.com'
//const BASE_UR = process.env.REACT_APP_BASE_URL_LOCAL;
//const BASE_URL = process.env.REACT_APP_BASE_URL;

export const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    } else {
        return Promise.reject(res.status);
      //return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
};

export const register = ( {username, email, password, telegram = null} ) => {
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
      password: password,
      telegram: telegram,
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
export const getItems = async ({ page = 1, limit = 20, filters = {}, categoryId, recursive } = {}) => {
    const query = new URLSearchParams();
  
    // пагинация
    query.append("page", page);
    query.append("limit", limit);
  
    // категории
    if (categoryId) query.append("categoryId", categoryId);
    if (recursive) query.append("recursive", "true");
  
    // фильтры — отдельно каждый ключ
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.append(key, value);
      }
    });
  
    const res = await fetch(`${BASE_URL}/items/all/getItems?${query.toString()}`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    });
  
    return checkResponse(res);
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
//не исп
export const getAllItems = ({ page = 1, limit = 20 }) => {
    return fetch(`${BASE_URL}/items/all/test/${page}/${limit}`, {
      credentials: 'include',
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
    .then(checkResponse);
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

export const updateItemCity = (item_id, city) => {
    return fetch(`${BASE_URL}/items/updateCity/${item_id}`, {
        credentials: 'include',
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ city }),
    })
    .then(checkResponse);
};
export const updatePrice = (item_id, price) => {
    return fetch(`${BASE_URL}/items/updatePrice/${item_id}`, {
        credentials: 'include',
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
    })
    .then(checkResponse);
};
export const updateDescription = (item_id, description) => {
    return fetch(`${BASE_URL}/items/updateDescription/${item_id}`, {
        credentials: 'include',
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ description }),
    })
    .then(checkResponse);
};
export const updateCondition = (item_id, condition) => {
    return fetch(`${BASE_URL}/items/updateCondition/${item_id}`, {
        credentials: 'include',
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ condition }),
    })
    .then(checkResponse);
};

export const updatePassword = (email, newPassword) => {
    return fetch(`${BASE_URL}/users/updatepassword`, {
        credentials: 'include',
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
    })
    .then(checkResponse);
};

//////создание категорий админом

export const createCategory = (data) => {
    return fetch(`${BASE_URL}/category/create`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        is_good: data.is_good,
        parent_id: data.parent_id,
        image_url: data.image_url,
        slug: data.slug,
        name_rus: data.name_rus,        
      })
    })
      .then(checkResponse);
  }

  export const deleteCategory = (category_id) => {
    return fetch(`${BASE_URL}/category/${category_id}`, {
        credentials: 'include',
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(checkResponse) 
  };

  export const getUsers = () => {
    return fetch(`${BASE_URL}/users/`, {
        credentials: 'include',
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
        .then(checkResponse)
        
};

export const updateCategorySlug = (category_id, slug) => {
    return fetch(`${BASE_URL}/category/updatecategoryslug`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ category_id, slug }),
    })
      .then(checkResponse);
  }

export const updateCategoryImg = (category_id, image_url) => {
    return fetch(`${BASE_URL}/category/updateimg`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ category_id, image_url }),
    })
      .then(checkResponse);
  }

  export const updateCategoryNameEng = (category_id, name) => {
      
    return fetch(`${BASE_URL}/category/updatenameeng`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ category_id, name }),
    })
      .then(checkResponse);
} 

export const updateCategoryNameRus = (category_id, name_rus) => {
    return fetch(`${BASE_URL}/category/updatename`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ category_id, name_rus }),
    })
      .then(checkResponse);
}  

export const updateTelegram = (user_id, telegram) => {
    return fetch(`${BASE_URL}/users/updatetelegram`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_id, telegram }),
    })
      .then(checkResponse);
}  
