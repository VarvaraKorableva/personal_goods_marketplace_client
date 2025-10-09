export const BASE_URL = '//localhost:3001';
//export const BASE_URL = '//personal-goods-marketplace-api.onrender.com'
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

export const getAllItemsAdmin = ({ page = 1, limit = 20 }) => {
    return fetch(`${BASE_URL}/itemsAdmin/admin/all/${page}/${limit}`, {
      credentials: 'include',
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
    .then(checkResponse);
  };

export const updateModeratedAdmin = (item_id,  moderated) => {
    return fetch(`${BASE_URL}/itemsAdmin/admin/updateModerated/${item_id}`, {
        credentials: 'include',
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ item_id, moderated }),
    })
    .then(checkResponse);
};