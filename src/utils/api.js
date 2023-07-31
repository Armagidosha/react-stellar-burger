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

    const response = await fetch(`${utils.url}ingredients`);
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
//
//
export const postOrderData = async (postData, setOrderId) => {
  try {
    setOrderId(prevOrderId => ({
      ...prevOrderId,
      isLoading: true
    }))

    const response = await fetch(`${utils.url}orders`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      }
    );

    const data = await checkResponse(response);
    setOrderId(prevOrderId => ({
      ...prevOrderId,
      isLoading: false,
      hasError: false,
      data: data.order.number.toString()
    })
    )
  } catch (error) {
    console.error(`Ошибка: ${error}`);

    setOrderId(prevOrderId => ({
      ...prevOrderId,
      isLoading: false,
      hasError: true
    }))
  }
}