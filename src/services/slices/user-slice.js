import { createSlice } from "@reduxjs/toolkit"
import { postLogin, postLogout, postRegistration } from "../actions/user";

const initialState = {
  user: null,
  isAuthChecked: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload ? action.payload.user : null;
    },
    isAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(postRegistration.fulfilled, (state, action) => {
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