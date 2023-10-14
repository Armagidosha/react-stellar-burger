import { createSlice } from "@reduxjs/toolkit"
import { utils } from "../../utils/utils";
import { WSFeedOrders } from "../../types/types";
import { wsConnecting, wsOpen, wsClose, wsMessage, wsError } from "../actions/webSocket";

type InitialState = {
  isConnected: boolean
  isConnecting: boolean
  ordersFeedAll: WSFeedOrders | null
  ordersFeedProfile: WSFeedOrders | null
  connectingError: string
  isItems: boolean
}

const initialState: InitialState = {
  isConnected: false,
  isConnecting: false,
  ordersFeedAll: null,
  ordersFeedProfile: null,
  connectingError: '',
  isItems: false
}

export const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(wsConnecting, (state) => {
        state.isConnecting = true;
      })
      .addCase(wsOpen, (state) => {
        state.isConnected = true;
        state.isConnecting = false;
        state.connectingError = '';
      })
      .addCase(wsClose, (state) => {
        state.isConnected = false;
        state.isConnecting = false;
        state.isItems = false;
      })
      .addCase(wsMessage, (state, action) => {
        if (action.payload.currentUrl !== `${utils.orders}/all`) {
          state.ordersFeedProfile = action.payload.data;
        } else {
          state.ordersFeedAll = action.payload.data;
        }
        state.isItems = true;
      })
      .addCase(wsError, (state, action) => {
        state.connectingError = action.payload;
      })
  }
})

export default webSocketSlice.reducer