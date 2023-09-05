import { createSlice } from "@reduxjs/toolkit";
import { jobseekerApplicationCreate } from "./jobseekerJobApplyActions";

const initialState = {
  createApplicationLoading: false,
  createApplicationError: null,
  createApplicationSuccess: false,

  resumeUploadLoading: false,
  resumeUploadError: null,
  resumeUploadSuccess: false,

  coverLetterUploadLoading: false,
  coverLetterUploadError: null,
  coverLetterUploadSuccess: false,
};

const jobseekerJobApplySlice = createSlice({
  name: "jobseekerJobApply",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.createApplicationError = null;
      state.createApplicationSuccess = false;

      state.resumeUploadError = null;
      state.resumeUploadSuccess = false;
      state.coverLetterUploadError = null;
      state.coverLetterUploadSuccess = false;
    },
    setCreateApplicationLoading: (state, action) => {
      state.createApplicationLoading = true;
      state.createApplicationError = null;
      state.createApplicationSuccess = false;
    },
    setCreateApplicationSuccess: (state, action) => {
      state.createApplicationLoading = false;
      state.createApplicationError = null;
      state.createApplicationSuccess = true;
    },
    setCreateApplicationError: (state, { payload }) => {
      state.createApplicationLoading = false;
      state.createApplicationError = payload;
      state.createApplicationSuccess = false;
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
    [jobseekerApplicationCreate.pending]: (state) => {
      state.createApplicationLoading = true;
      state.createApplicationError = null;
      state.createApplicationSuccess = false;
    },
    [jobseekerApplicationCreate.fulfilled]: (state) => {
      state.createApplicationLoading = false;
      state.createApplicationError = null;
      state.createApplicationSuccess = true;
    },
    [jobseekerApplicationCreate.rejected]: (state, { payload }) => {
      state.createApplicationLoading = false;
      state.createApplicationError = payload;
      state.createApplicationSuccess = false;
    },
  },
});

export const {
  setCreateApplicationLoading,
  setCreateApplicationSuccess,
  setCreateApplicationError,

  setResumeUploadLoading,
  setResumeUploadSuccess,
  setResumeUploadError,
  setCoverLetterUploadLoading,
  setCoverLetterUploadSuccess,
  setCoverLetterUploadError,
  clearErrors,
} = jobseekerJobApplySlice.actions;

//selectors
export const isLoading = (state) =>
  state.jobseekerJobApply.createApplicationLoading ||
  state.jobseekerJobApply.resumeUploadLoading ||
  state.jobseekerJobApply.coverLetterUploadLoading;

export default jobseekerJobApplySlice.reducer;
