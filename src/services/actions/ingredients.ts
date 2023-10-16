import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchIngredientsFromAPI } from "../../utils/api";

export const getIngredients = createAsyncThunk(
  'ingredients/get',
  async () => {
    return fetchIngredientsFromAPI()
  }
)