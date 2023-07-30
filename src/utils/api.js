import { utils } from "./utils";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const fetchIngredients = async setData => {
try {
  setData(prevData => ({
    ...prevData,
    isLoading: true
  }))
  
  const response = await fetch(`${utils.url}/ingredients`);
  const data = await checkResponse(response);

  setData(prevData => ({
    ...prevData,
    isLoading: false,
    hasError: false,
    data: data.data
  }))
} catch (error) {
  console.error(`Ошибка: ${error}`);

  setData(prevData => ({
    ...prevData,
    isLoading: false,
    hasError: true
  }))
}
}