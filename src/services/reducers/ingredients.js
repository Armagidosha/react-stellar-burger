import { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from "../actions/ingredients"

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
        itemsFailed: false
      }
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsRequest: false,
        items: action.items
      }
    }
    case GET_ITEMS_FAILED: {
      return {
        ...initialState,
        itemsRequest: false,
        itemsFailed: true,
      }
    }
    default: {
      return state;
    }
  }
}