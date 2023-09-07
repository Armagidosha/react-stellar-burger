import {   
  SET_USER,
  IS_AUTH_CHECKED,
  REG_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,

} from '../actions/user'

const initialState = {
  user: null,
  isAuthChecked: false,
  isLoginSuccess: false,
  isLogoutSuccess: false,
  isRegSuccess: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload.user
      }
    }
    case IS_AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: action.payload
      }
    }
    case REG_SUCCESS: {
      return {
        ...state,
        isRegSuccess: action.payload
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoginSuccess: action.payload
      }
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isLogoutSuccess: action.payload,
        user: null
      }
    }
    default: {
      return state
    }
  }
}