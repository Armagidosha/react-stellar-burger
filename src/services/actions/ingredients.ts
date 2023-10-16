import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchIngredientsFromAPI } from "../../utils/api";

export const getIngredients = createAsyncThunk(
  'ingredients/get',
  async (_, thunkAPI) => {
    try {
      return fetchIngredientsFromAPI()
    } catch (error) {
      return thunkAPI.rejectWithValue(`Ошибка: ${error}`)
    }
  }
)