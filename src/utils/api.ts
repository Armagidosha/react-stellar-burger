import type { OrderData, UserData } from "../types/types";
import { setLocalStorage, utils } from "./utils";

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const fetchIngredientsFromAPI = async () => {
  const response = await fetch(`${utils.url}ingredients`);
  return checkResponse(response);
}

export const postOrderDataToAPI = async (postData: OrderData) => {
  const accessToken = localStorage.getItem("accessToken") || "";
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: accessToken
  };

  const response = await fetchWithRefresh(`${utils.url}orders`, {
    method: 'POST',
    headers,
    body: JSON.stringify(postData)
  });
  return response.order.number;
}


export const getOrderImage = async (data: string) => {
  const response = await fetch(`${utils.url}orders/${data}`)
  return checkResponse(response)
}

export const refreshToken = async () => {
  try {
    const response = await fetch(`${utils.url}auth/token`, {
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

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (error) {
    if ((error as Error).message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setLocalStorage(refreshData)
      if (options.headers instanceof Headers) {
        options.headers.set("Authorization", refreshData.accessToken)
      }
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(error);
    }
  }
};

export const getUser = async () => {
  const accessToken = localStorage.getItem('accessToken') || "";
  const headers: HeadersInit = ({
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: accessToken
  });

  return fetchWithRefresh(`${utils.url}auth/user`, {
    method: 'GET',
    headers
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
  const headers: HeadersInit = ({
    'Content-Type': 'application/json',
    Authorization: accessToken,
  })
  
  return fetchWithRefresh(`${utils.url}auth/user`, {
    method: 'PATCH',
    headers,
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
