import { createSlice } from "@reduxjs/toolkit";
import { postOrder } from "../actions/order";

const initialState = {
  items: '',
  orderRequest: false,
  orderFailed: false,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.items = action.payload.order.number;
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