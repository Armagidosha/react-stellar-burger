import { postOrderDataToAPI } from "../../utils/api";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const postOrder = (postData) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: GET_ORDER_REQUEST
      });

      const data = await postOrderDataToAPI(postData);

      dispatch({
        type: GET_ORDER_SUCCESS,
        items: data.order.number.toString()
      });

    } catch (error) {
      console.error(`Ошибка: ${error}`);

      dispatch({
        type: GET_ORDER_FAILED
      });
    }
  };
};