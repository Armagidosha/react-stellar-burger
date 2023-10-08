import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, login, logout, registration } from "../../utils/api";
import { setLocalStorage, clearLocalStorage } from "../../utils/utils";
import { isAuthChecked, setUser } from "../slices/user-slice";

export const postRegistration = createAsyncThunk(
  'user/registration',
  async (userData, thunkAPI) => {
    try {
      const response = await registration(userData);
      setLocalStorage(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(`Ошибка: ${error}`)
    }
  }
);

export const postLogin = createAsyncThunk(
  'user/login',
  async (userData, thunkAPI) => {
    try {
      const response = await login(userData)
      setLocalStorage(response)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(`Ошибка: ${error}`)
    }
  }
);

export const postLogout = createAsyncThunk(
  'user/logout',
  async (thunkAPI) => {
    try {
      await logout();
      clearLocalStorage();
    } catch (error) {
      return thunkAPI.rejectWithValue(`Ошибка: ${error}`)
    }
  }
);

export const checkUserAuth = () => {
  return async (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      try {
        const response = await getUser();
        dispatch(setUser(response))
      } catch (error) {
        clearLocalStorage()
        dispatch(setUser(null));
      } finally {
        dispatch(isAuthChecked(true));
      }
    } else {
      dispatch(isAuthChecked(true));
    }
  }
};