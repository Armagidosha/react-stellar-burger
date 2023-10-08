import { createSlice } from "@reduxjs/toolkit"
import { utils } from "../../utils/utils";

const initialState = { 
  isConnected: false,
  isConnecting: false,
  ordersFeedAll: {},
  ordersFeedProfile: {},
  connectingError: '',
  isItems: false
}

export const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {
    wsConnecting: (state) => {
      state.isConnecting = true;
    },
    wsOpen: (state) => {
      state.isConnected = true;
      state.isConnecting = false;
      state.connectingError = '';
    },
    wsClose: (state) => {
      state.isConnected = false;
      state.isConnecting = false;
      state.isItems = false;
    },
    wsMessage: (state, action) => {
      if (action.payload.currentUrl !== `${utils.orders}/all`) {
        state.ordersFeedProfile = action.payload.data;
      } else {
        state.ordersFeedAll = action.payload.data;
      }
      state.isItems = true;
    },
    wsError: (state, action) => {
      state.connectingError = action.payload;
    }
  }
})

export const { 
  wsConnecting, 
  wsOpen, 
  wsClose,
  wsMessage, 
  wsError 
} = webSocketSlice.actions
export default webSocketSlice.reducer