import { createAsyncThunk } from "@reduxjs/toolkit";
import { postOrderDataToAPI } from "../../utils/api";

export const postOrder = createAsyncThunk(
  'order/post',
  async (orderData, thunkAPI) => {
    try { 
      return postOrderDataToAPI(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(`Ошибка: ${error}`)
    }
  }
)