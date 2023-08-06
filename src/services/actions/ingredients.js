import { fetchIngredientsFromAPI } from "../../utils/api";

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const getIngredients = () => {
  return async function (dispatch) {
    try {
      dispatch({
        type: GET_ITEMS_REQUEST
      });

      const data = await fetchIngredientsFromAPI();

      dispatch({
        type: GET_ITEMS_SUCCESS,
        items: data.data
      });

    } catch (error) {
      console.error(`Ошибка: ${error}`);

      dispatch({
        type: GET_ITEMS_FAILED
      });
    }
  };
};