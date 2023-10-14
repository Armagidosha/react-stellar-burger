import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "../actions/ingredients";
import type { Ingredients } from "../../types/types";

type InitialState = {
  items: Ingredients[]
  itemsRequest: boolean
  itemsFailed: boolean
}

type IngredientsFulfilled = {
  success: boolean,
  data: Ingredients[]
}

const initialState: InitialState = {
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
      .addCase(getIngredients.fulfilled, (state, action: PayloadAction<IngredientsFulfilled>) => {
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