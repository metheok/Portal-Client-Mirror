import { createSlice } from "@reduxjs/toolkit";
import { recruiterApplicationCreate } from "./recruiterJobReferralActions";

const initialState = {
  createReferralLoading: false,
  createReferralError: null,
  createReferralSuccess: false,

  verifyEmailLoading: false,
  verifyEmailError: null,
  verifyEmailSuccess: false,

  resumeUploadLoading: false,
  resumeUploadError: null,
  resumeUploadSuccess: false,

  coverLetterUploadLoading: false,
  coverLetterUploadError: null,
  coverLetterUploadSuccess: false,
};

const recruiterJobReferralSlice = createSlice({
  name: "recruiterJobReferral",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.createReferralError = null;
      state.createReferralSuccess = false;
      state.verifyEmailError = null;
      state.verifyEmailSuccess = false;
      state.resumeUploadError = null;
      state.resumeUploadSuccess = false;
      state.coverLetterUploadError = null;
      state.coverLetterUploadSuccess = false;
    },
    setCreateReferralLoading: (state, action) => {
      state.createReferralLoading = true;
      state.createReferralError = null;
      state.createReferralSuccess = false;
    },
    setCreateReferralSuccess: (state, action) => {
      state.createReferralLoading = false;
      state.createReferralError = null;
      state.createReferralSuccess = true;
    },
    setCreateReferralError: (state, { payload }) => {
      state.createReferralLoading = false;
      state.createReferralError = payload;
      state.createReferralSuccess = false;
    },

    setVerifyEmailLoading: (state, action) => {
      state.verifyEmailLoading = true;
      state.verifyEmailError = null;
      state.verifyEmailSuccess = false;
    },

    setVerifyEmailSuccess: (state, action) => {
      state.verifyEmailLoading = false;
      state.verifyEmailError = null;
      state.verifyEmailSuccess = true;
    },

    setVerifyEmailError: (state, { payload }) => {
      state.verifyEmailLoading = false;
      state.verifyEmailError = payload;
      state.verifyEmailSuccess = false;
    },

    setResumeUploadLoading: (state, action) => {
      state.resumeUploadLoading = true;
      state.resumeUploadError = null;
      state.resumeUploadSuccess = false;
    },
    setResumeUploadSuccess: (state, action) => {
      state.resumeUploadLoading = false;
      state.resumeUploadError = null;
      state.resumeUploadSuccess = true;
    },
    setResumeUploadError: (state, { payload }) => {
      state.resumeUploadLoading = false;
      state.resumeUploadError = payload;
      state.resumeUploadSuccess = false;
    },

    setCoverLetterUploadLoading: (state, action) => {
      state.coverLetterUploadLoading = true;
      state.coverLetterUploadError = null;
      state.coverLetterUploadSuccess = false;
    },
    setCoverLetterUploadSuccess: (state, action) => {
      state.coverLetterUploadLoading = false;
      state.coverLetterUploadError = null;
      state.coverLetterUploadSuccess = true;
    },
    setCoverLetterUploadError: (state, { payload }) => {
      state.coverLetterUploadLoading = false;
      state.coverLetterUploadError = payload;
      state.coverLetterUploadSuccess = false;
    },
  },
  extraReducers: {
    [recruiterApplicationCreate.pending]: (state) => {
      state.createReferralLoading = true;
      state.createReferralError = null;
      state.createReferralSuccess = false;
    },
    [recruiterApplicationCreate.fulfilled]: (state) => {
      state.createReferralLoading = false;
      state.createReferralError = null;
      state.createReferralSuccess = true;
    },
    [recruiterApplicationCreate.rejected]: (state, { payload }) => {
      state.createReferralLoading = false;
      state.createReferralError = payload;
      state.createReferralSuccess = false;
    },
  },
});

export const {
  setCreateReferralLoading,
  setCreateReferralSuccess,
  setCreateReferralError,
  setVerifyEmailLoading,
  setVerifyEmailSuccess,
  setVerifyEmailError,
  setResumeUploadLoading,
  setResumeUploadSuccess,
  setResumeUploadError,
  setCoverLetterUploadLoading,
  setCoverLetterUploadSuccess,
  setCoverLetterUploadError,
  clearErrors,
} = recruiterJobReferralSlice.actions;

//selectors
export const isLoading = (state) =>
  state.recruiterJobReferral.createReferralLoading ||
  state.recruiterJobReferral.verifyEmailLoading ||
  state.recruiterJobReferral.resumeUploadLoading ||
  state.recruiterJobReferral.coverLetterUploadLoading;

export default recruiterJobReferralSlice.reducer;
