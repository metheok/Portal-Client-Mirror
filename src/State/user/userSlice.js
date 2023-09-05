import { createSlice } from "@reduxjs/toolkit";
import { userFetch } from "./userActions";
import {
  employerProfileUpdate,
  employerProfileFetch,
} from "../employerProfile/employerProfileActions";
import {
  recruiterProfileUpdate,
  recruiterProfileFetch,
} from "../recruiterProfile/recruiterProfileActions";

import {
  jobseekerProfileUpdate,
  jobseekerProfileFetch,
} from "../jobseekerProfile/jobseekerProfileActions";

import {
  jobseekerSettingUpdate,
  jobseekerSettingFetch,
} from "../jobseekerSettings/jobseekerSettingActions";
import { userLogin } from "../auth/authActions";

const initialState = {
  user: null,
  userError: null,
  userSuccess: false,
  userLoading: true,

  profileLoading: false,
  profileError: null,
  profileSuccess: false,

  profileUpdateSuccess: false,
  profileUpdateError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.profileLoading = false;
      state.profileError = null;
      state.profileSuccess = false;

      state.profileUpdateError = null;
      state.profileUpdateSuccess = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.userError = null;
      state.userSuccess = false;
      state.userLoading = false;

      state.profileLoading = false;
      state.profileError = null;
      state.profileSuccess = false;

      state.profileUpdateSuccess = false;
      state.profileUpdateError = null;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.userLoading = true;
      state.userError = null;
      state.userSuccess = false;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.userLoading = false;
      state.user = payload;
      state.userSuccess = true;

      state.signupSuccess = false;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.userLoading = false;
      state.userError = payload;
      state.user = null;
    },

    [userFetch.pending]: (state) => {
      state.userLoading = true;
      state.userError = null;
      state.userSuccess = false;
    },
    [userFetch.fulfilled]: (state, { payload }) => {
      state.userLoading = false;
      state.user = payload;
      state.userSuccess = true;
    },
    [userFetch.rejected]: (state, { payload }) => {
      state.userLoading = false;
      state.userError = payload;
    },

    // fetch employer user

    [employerProfileFetch.pending]: (state) => {
      state.profileLoading = true;
      state.profileError = null;
      state.profileSuccess = false;
    },
    [employerProfileFetch.fulfilled]: (state, { payload }) => {
      state.profileLoading = false;
      state.user = payload;
      state.profileSuccess = true;
      state.profileError = null;
    },
    [employerProfileFetch.rejected]: (state, { payload }) => {
      state.profileLoading = false;
      state.profileError = payload;
      state.profileSuccess = false;
    },
    // update employer user
    [employerProfileUpdate.pending]: (state) => {
      state.profileLoading = true;
      state.profileUpdateError = null;
      state.profileUpdateSuccess = false;
    },
    [employerProfileUpdate.fulfilled]: (state, { payload }) => {
      state.profileLoading = false;
      state.user = payload;
      state.profileUpdateSuccess = true;
      state.profileUpdateError = null;
    },
    [employerProfileUpdate.rejected]: (state, { payload }) => {
      state.profileLoading = false;
      state.profileUpdateError = payload;
      state.profileUpdateSuccess = false;
    },

    // fetch recruiter user
    [recruiterProfileFetch.pending]: (state) => {
      state.profileLoading = true;
      state.profileError = null;
      state.profileSuccess = false;
    },
    [recruiterProfileFetch.fulfilled]: (state, { payload }) => {
      state.profileLoading = false;
      state.user = payload;
      state.profileSuccess = true;
      state.profileError = null;
    },
    [recruiterProfileFetch.rejected]: (state, { payload }) => {
      state.profileLoading = false;
      state.profileError = payload;
      state.profileSuccess = false;
    },
    // update recruiter user
    [recruiterProfileUpdate.pending]: (state) => {
      state.profileLoading = true;
      state.profileUpdateError = null;
      state.profileUpdateSuccess = false;
    },
    [recruiterProfileUpdate.fulfilled]: (state, { payload }) => {
      state.profileLoading = false;
      state.user = payload;
      state.profileUpdateSuccess = true;
      state.profileUpdateError = null;
    },
    [recruiterProfileUpdate.rejected]: (state, { payload }) => {
      state.profileLoading = false;
      state.profileUpdateError = payload;
      state.profileUpdateSuccess = false;
    },
    // fetch jobseeker user
    [jobseekerProfileFetch.pending]: (state) => {
      state.profileLoading = true;
      state.profileError = null;
      state.profileSuccess = false;
    },
    [jobseekerProfileFetch.fulfilled]: (state, { payload }) => {
      state.profileLoading = false;
      state.user = payload;
      state.profileSuccess = true;
      state.profileError = null;
    },
    [jobseekerProfileFetch.rejected]: (state, { payload }) => {
      state.profileLoading = false;
      state.profileError = payload;
      state.profileSuccess = false;
    },

    // update jobseeker user
    [jobseekerProfileUpdate.pending]: (state) => {
      state.profileUpdateLoading = true;
      state.profileUpdateError = null;
      state.profileUpdateSuccess = false;
    },
    [jobseekerProfileUpdate.fulfilled]: (state, { payload }) => {
      state.profileUpdateLoading = false;
      state.user = payload;
      state.profileUpdateSuccess = true;
      state.profileUpdateError = null;
    },
    [jobseekerProfileUpdate.rejected]: (state, { payload }) => {
      state.profileUpdateLoading = false;
      state.profileUpdateError = payload;
      state.profileUpdateSuccess = false;
    },

    // fetch jobseeker setting user
    [jobseekerSettingFetch.pending]: (state) => {
      state.profileLoading = true;
      state.profileError = null;
      state.profileSuccess = false;
    },
    [jobseekerSettingFetch.fulfilled]: (state, { payload }) => {
      state.profileLoading = false;
      state.user = payload;
      state.profileSuccess = true;
      state.profileError = null;
    },
    [jobseekerSettingFetch.rejected]: (state, { payload }) => {
      state.profileLoading = false;
      state.profileError = payload;
      state.profileSuccess = false;
    },

    // update jobseeker setting user
    [jobseekerSettingUpdate.pending]: (state) => {
      state.profileUpdateLoading = true;
      state.profileUpdateError = null;
      state.profileUpdateSuccess = false;
    },
    [jobseekerSettingUpdate.fulfilled]: (state, { payload }) => {
      state.profileUpdateLoading = false;
      state.user = payload;
      state.profileUpdateSuccess = true;
      state.profileUpdateError = null;
    },
    [jobseekerSettingUpdate.rejected]: (state, { payload }) => {
      state.profileUpdateLoading = false;
      state.profileUpdateError = payload;
      state.profileUpdateSuccess = false;
    },
  },
});

export const { clearErrors, clearUser } = userSlice.actions;

//selectors
export const isLoading = (state) =>
  state.user.profileLoading ||
  state.user.loading ||
  state.user.updatePasswordLoading;

export default userSlice.reducer;
