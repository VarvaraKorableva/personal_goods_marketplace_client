export const BASE_URL = '//localhost:3001';

export const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
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
    console.log(res);
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

export const getContent = () => {
    return fetch(`${BASE_URL}/users/me`, {
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
