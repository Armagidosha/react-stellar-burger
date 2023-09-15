import { combineReducers } from "redux"
import { ingredientsReducer, } from "./ingredients";
import { burgerReducer } from "./burgerReducer";
import { orderReducer } from "./order";
import { userReducer } from "./userReducer";
import { webSocketReducer } from "./webSocket";

export const rootReducer = combineReducers({
  burgerState: burgerReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer,
  ws: webSocketReducer
})