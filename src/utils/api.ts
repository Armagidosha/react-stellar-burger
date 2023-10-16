import type { OrderData, RequestOptions, UserData } from "../types/types";
import { setLocalStorage, utils } from "./utils";

const checkResponse = (res: Response) => {
return res.ok ? res.json() : res.json().then(error => Promise.reject(error))
}
export const fetchIngredientsFromAPI = async () => {
  const response = await fetch(`${utils.url}ingredients`);
  return checkResponse(response);
}

export const postOrderDataToAPI = async (postData: OrderData) => {
  const accessToken = localStorage.getItem("accessToken") || "";
  const response = await fetchWithRefresh(`${utils.url}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken
    },
    body: JSON.stringify(postData)
  });
  return response.order.number;
}


export const getOrderPage = async (data: string) => {
  const response = await fetch(`${utils.url}orders/${data}`)
  return await checkResponse(response)
}

export const refreshToken = async () => {
    const response = await fetch(`${utils.url}auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    });
    const checkedResponse = await checkResponse(response);
    setLocalStorage(checkedResponse)
    return checkedResponse
};

export const fetchWithRefresh = async (url: string, options: RequestOptions) => {
  try {
    const response = await fetch(url, options);
    return await checkResponse(response);
  } catch (error) {
    if ((error as Error).message === "jwt expired") {
      const refreshData = await refreshToken();
      options.headers.authorization = refreshData.accessToken;
      const response = await fetch(url, options);
      return await checkResponse(response);
    }
    return Promise.reject(`Error: ${error}`)
  }
};

export const getUser = async () => {
  const accessToken = localStorage.getItem('accessToken') || "";
  return fetchWithRefresh(`${utils.url}auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'authorization': accessToken
    }
  });
}


export const registration = async (regData: UserData) => {
  const response = await fetch(`${utils.url}auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(regData)
  })
  return checkResponse(response)
}

export const login = async (logData: UserData) => {
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

export const patchUserData = (userData: UserData) => {
  const accessToken = localStorage.getItem("accessToken") || ''
  return fetchWithRefresh(`${utils.url}auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken,
    },
    body: JSON.stringify(userData)
  })
}

export const resetForgotPassword = async (userData: UserData) => {
  const response = await fetch(`${utils.url}password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(userData)
  })
  return checkResponse(response);
}

export const recoverForgotPassword = async (userData: UserData) => {
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
