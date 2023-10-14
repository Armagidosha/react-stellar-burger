import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { postOrder } from "../actions/order";

type InitialState = {
  orderNumber: string
  orderRequest: boolean
  orderFailed: boolean
}

type OrderNumber = {
  number: string
}


const initialState: InitialState = {
  orderNumber: '',
  orderRequest: false,
  orderFailed: false,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.fulfilled, (state, action: PayloadAction<OrderNumber>) => {
        state.orderRequest = false;
        state.orderNumber = action.payload.toString();
      })
      .addCase(postOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderFailed = false;
      })
      .addCase(postOrder.rejected, (state) => {
        state.orderRequest = false;
        state.orderFailed = true;
      })
  }
})

export default orderSlice.reducer