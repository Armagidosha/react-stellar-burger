import { combineReducers } from "redux"
import { ingredientsReducer, } from "./ingredients";
import { burgerReducer } from "./burgerReducer";
import { orderReducer } from "./order";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  burgerState: burgerReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer
})