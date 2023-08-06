import { utils } from "./utils";

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