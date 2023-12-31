import { createAsyncThunk } from "@reduxjs/toolkit";
import { postOrderDataToAPI } from "../../utils/api";
import type { OrderData } from "../../types/types";

export const postOrder = createAsyncThunk(
  'order/post',
  async (orderData: OrderData) => {
    return await postOrderDataToAPI(orderData);
  }
)