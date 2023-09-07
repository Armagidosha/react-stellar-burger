import { setLocalStorage, utils } from "./utils";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const fetchIngredientsFromAPI = async () => {
  const response = await fetch(`${utils.url}ingredients`);
  return checkResponse(response);
}

export const postOrderDataToAPI = async (postData) => {
  const response = await fetch(`${utils.url}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  });
  return checkResponse(response);
}

export const refreshToken = async () => {
  try {
    const response = await fetch(`${utils.url}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    });
    return checkResponse(response);
  } catch (error) {
    throw error;
  }
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setLocalStorage(refreshData)
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUser = async () => {
  return fetchWithRefresh(`${utils.url}auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: localStorage.getItem('accessToken')
    },
  })
}

export const registration = async (regData) => {
  const response = await fetch(`${utils.url}auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(regData)
  })
  return checkResponse(response)
}

export const login = async (logData) => {
  const response = await fetch(`${utils.url}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(logData)
  })
  return checkResponse(response)
}

export const logout = async () => {
  const response = await fetch(`${utils.url}auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      'token': localStorage.getItem('refreshToken')
    })
  })
  return checkResponse(response)
}

export const patchUserData = (userData) => {
  return fetchWithRefresh(`${utils.url}auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(userData)
  })
}

export const resetForgotPassword = async (userData) => {
  const response = await fetch(`${utils.url}password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userData)
  })
  return checkResponse(response);
}

export const recoverForgotPassword = async (userData) => {
  const response = await fetch(`${utils.url}password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      "password": userData.password,
      "token": userData.token
    })
  })
  return checkResponse(response)
}
