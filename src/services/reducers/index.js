import { combineReducers } from "redux"
import { ingredientsReducer, } from "./ingredients";
import { burgerReducer } from "./burgerReducer";
import { modalReducer } from "./modalReducer";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  burgerState: burgerReducer,
  ingredients: ingredientsReducer,
  modal: modalReducer,
  order: orderReducer
})