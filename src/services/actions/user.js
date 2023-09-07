import { getUser, login, logout, registration } from "../../utils/api";
import { setLocalStorage, clearLocalStorage } from "../../utils/utils";

export const SET_USER = 'SET_USER';
export const IS_AUTH_CHECKED = 'IS_AUTH_CHECKED';
export const REG_SUCCESS = 'REG_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const setUser = (userData) => ({
  type: SET_USER,
  payload: userData
})

export const postRegistration = (user) => {
  return async function (dispatch) {
    try {
      const data = await registration(user);
      dispatch({ type: REG_SUCCESS })
      dispatch(setUser(data))
      setLocalStorage(data)
      dispatch({ 
        type: IS_AUTH_CHECKED,
        payload: true 
      })
    } catch (error) {
      console.error(`Ошибка: ${error}`)
    }
  }
}

export const postLogin = (user) => {
  return async function (dispatch) {
    try {
      const data = await login(user);
      dispatch({ type: LOGIN_SUCCESS });
      dispatch(setUser(data));
      setLocalStorage(data);
      dispatch({ 
        type: IS_AUTH_CHECKED,
        payload: true 
      })
    } catch (error) {
      console.error(`Ошибка: ${error}`);
    }
  }
}

export const postLogout = () => {
  return async function (dispatch) {
    try {
      await logout();
      clearLocalStorage();
      dispatch({ type: LOGOUT_SUCCESS })
    } catch (error) {
      console.error(`Ошибка: ${error}`)
    }
  }
}

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
        dispatch({
          type: IS_AUTH_CHECKED,
          payload: true
        });
      }
    } else {
      dispatch(dispatch({
        type: IS_AUTH_CHECKED,
        payload: true
      }));
    }
  };
};

