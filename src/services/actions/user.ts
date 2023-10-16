import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, login, logout, registration } from "../../utils/api";
import { setLocalStorage, clearLocalStorage } from "../../utils/utils";
import { isAuthChecked, setUser } from "../slices/user-slice";
import { AppDispatch } from "../..";
import { UserData } from "../../types/types";

export const postRegistration = createAsyncThunk(
  'user/registration',
  async (userData: UserData) => {
    const response = await registration(userData);
    setLocalStorage(response);
    return response;
  }
);

export const postLogin = createAsyncThunk(
  'user/login',
  async (userData: UserData) => {
    const response = await login(userData)
    setLocalStorage(response)
    return response
  }
);

export const postLogout = createAsyncThunk(
  'user/logout',
  async () => {
    await logout();
    clearLocalStorage();
  }
);

export const checkUserAuth = () => {
  return async (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      try {
        const response = await getUser();
        dispatch(setUser(response))
      } catch (error) {
        clearLocalStorage()
        dispatch(setUser({ user: null }));
      } finally {
        dispatch(isAuthChecked(true));
      }
    } else {
      dispatch(isAuthChecked(true));
    }
  }
};