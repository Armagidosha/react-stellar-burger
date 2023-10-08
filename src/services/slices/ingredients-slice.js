import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "../actions/ingredients";

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.itemsRequest = false;
        state.items = action.payload.data;
      })
      .addCase(getIngredients.pending, (state) => {
        state.itemsRequest = true;
        state.itemsFailed = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.itemsRequest = false;
        state.itemsFailed = true;
      })
  }
})

export default ingredientsSlice.reducer