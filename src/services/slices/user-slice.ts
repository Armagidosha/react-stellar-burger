import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { postLogin, postLogout, postRegistration } from "../actions/user";

type TUser = {
  email: string
  name: string
}

type InitialState = {
  user: TUser | null
  isAuthChecked: boolean
}

type User = {
  user: TUser
  accessToken: string
  refreshToken: string
  success: boolean
}

const initialState: InitialState = {
  user: null,
  isAuthChecked: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{user: TUser | null}>) => {
      state.user = action.payload ? action.payload.user : null;
    },
    isAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(postRegistration.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(postLogout.fulfilled, (state) => {
        state.user = null
      })
  }
});

export const { setUser, isAuthChecked } = userSlice.actions;
export default userSlice.reducer;