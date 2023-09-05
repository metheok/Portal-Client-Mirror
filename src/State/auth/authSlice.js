import { createSlice } from "@reduxjs/toolkit";
import { registerUser, updatePassword, userLogin } from "./authActions";
import { clearUser } from "../user/userSlice";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userToken,
  loginError: null,
  signupError: null,

  success: false,
  signupSuccess: false,

  updatePasswordLoading: false,
  updatePasswordError: null,
  updatePasswordSuccess: false,

  profileUpdateLoading: false,
  profileUpdateSuccess: false,
  profileUpdateError: null,
  profilePicture: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.loading = false;
    },

    clearErrors: (state) => {
      state.loading = false;

      state.loginError = null;
      state.signupError = null;

      state.loginSuccess = false;
      state.signupSuccess = false;

      state.updatePasswordLoading = false;
      state.updatePasswordError = null;
      state.updatePasswordSuccess = false;
      state.profileUpdateError = null;
      state.profileUpdateSuccess = false;
      state.profileUpdateLoading = false;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.loginError = null;

      state.loginSuccess = false;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.loginSuccess = true;
      state.userToken = payload.userToken;
      state.loginError = null;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.loginError = payload;
      state.loginSuccess = false;
    },

    // update password
    [updatePassword.pending]: (state) => {
      state.updatePasswordLoading = true;
      state.updatePasswordError = null;
      state.updatePasswordSuccess = false;
    },
    [updatePassword.fulfilled]: (state, { payload }) => {
      state.updatePasswordLoading = false;
      state.updatePasswordError = null;
      state.updatePasswordSuccess = true;
    },
    [updatePassword.rejected]: (state, { payload }) => {
      state.updatePasswordLoading = false;
      state.updatePasswordError = payload;
      state.updatePasswordSuccess = false;
    },
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.signupSuccess = false;
      state.signupError = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.signupSuccess = true;
      state.signupError = null;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.signupError = payload;
      state.signupSuccess = false;
    },
  },
});

export const { logout, clearErrors } = authSlice.actions;
export const logoutAndClearUser = () => (dispatch) => {
  dispatch(logout());
  dispatch(clearUser());
};
//selectors
export const isLoading = (state) =>
  state.auth.loading || state.auth.updatePasswordLoading;

export default authSlice.reducer;
