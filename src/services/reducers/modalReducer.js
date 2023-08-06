import { CLOSE, OPEN_INGREDIENT_MODAL, OPEN_ORDER_MODAL } from "../actions/modal"

const initialState = {
  isOpened: false,
  currentModal: '',
  currentIngredient: {},
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT_MODAL: {
      return {
        ...state,
        isOpened: true,
        currentIngredient: action.item,
        currentModal: 'ingredient'
      }
    }
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        isOpened: true,
        currentModal: 'order',
      }
    }
    case CLOSE: {
      return {
        ...state,
        isOpened: false
      }
    }
    default: {
      return state;
    }
  }
}