import { combineReducers } from "redux"
import orderSlice from "./order-slice";
import ingredientsSlice from "./ingredients-slice";
import userSlice from "./user-slice";
import burgerSlice from "./burger-slice";
import webSocketSlice from "./webSocket-slice";

export const rootReducer = combineReducers({
  burgerState: burgerSlice,
  ingredients: ingredientsSlice,
  order: orderSlice,
  user: userSlice,
  ws: webSocketSlice
})