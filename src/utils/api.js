import { utils } from "./utils";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const fetchIngredients = () => {
  return async function (dispatch) {

    try {
      dispatch({
        type: 'GET_ITEMS_REQUEST'
      })

      const response = await fetch(`${utils.url}ingredients`);
      const data = await checkResponse(response);
      dispatch({
        type: 'GET_ITEMS_SUCCESS',
        items: data.data
      })

    } catch (error) {
      console.error(`Ошибка: ${error}`);

      dispatch({
        type: 'GET_ITEMS_FAILED'
      })
    }
  }
}

export const postOrderData = (postData) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: 'GET_ORDER_REQUEST'
      })

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

      dispatch({
        type: 'GET_ORDER_SUCCESS',
        items: data.order.number.toString()
      })

    } catch (error) {
      console.error(`Ошибка: ${error}`);

      dispatch({
        type: 'GET_ORDER_FAILED'
      })
    }
  }
}