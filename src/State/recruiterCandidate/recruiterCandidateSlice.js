import { createSlice } from "@reduxjs/toolkit";

import { recruiterCandidateCreate } from "./recruiterCandidateActions";

const initialState = {
  data: null,
  formData: null,
  recruiterCandidateCreateLoading: false,
  recruiterCandidateCreateSuccess: false,
  recruiterCandidateCreateError: null,

  fetchCandidateLoading: false,
  fetchCandidateSuccess: false,
  fetchCandidateError: null,

  ViewCandidateLoading: false,
  ViewCandidateSuccess: false,
  ViewCandidateError: null,
};

const recruiterCandidateSlice = createSlice({
  name: "recruiterCandidate",
  initialState,
  reducers: {
    clearForm: (state) => {
      state.recruiterCandidateCreateError = null;
      state.recruiterCandidateCreateLoading = false;
      state.recruiterCandidateCreateSuccess = false;
    },
    setFromData: (state, { payload }) => {
      state.recruiterCandidate.formData = payload;
    },
    setFetchCandidateLoading: (state, action) => {
      state.fetchCandidateLoading = true;
      state.fetchCandidateError = null;
      state.fetchCandidateSuccess = false;
    },
    setFetchCandidateSuccess: (state, action) => {
      state.fetchCandidateLoading = false;
      state.fetchCandidateError = null;
      state.fetchCandidateSuccess = true;
    },
    setFetchCandidateError: (state, { payload }) => {
      state.fetchCandidateLoading = false;
      state.fetchCandidateError = payload;
      state.fetchCandidateSuccess = false;
    },
    setViewCandidateLoading: (state, action) => {
      state.ViewCandidateLoading = true;
      state.ViewCandidateError = null;
      state.ViewCandidateSuccess = false;
    },
    setViewCandidateSuccess: (state, action) => {
      state.ViewCandidateLoading = false;
      state.ViewCandidateError = null;
      state.ViewCandidateSuccess = true;
    },
    setViewCandidateError: (state, { payload }) => {
      state.ViewCandidateLoading = false;
      state.ViewCandidateError = payload;
      state.ViewCandidateSuccess = false;
    },
  },
  extraReducers: {
    [recruiterCandidateCreate.pending]: (state) => {
      state.recruiterCandidateCreateLoading = true;
      state.recruiterCandidateCreateSuccess = false;
      state.recruiterCandidateCreateError = null;
    },
    [recruiterCandidateCreate.fulfilled]: (state, { payload }) => {
      state.recruiterCandidateCreateLoading = false;
      state.recruiterCandidateCreateSuccess = true;
      state.data = payload;
      state.recruiterCandidateCreateError = null;
    },
    [recruiterCandidateCreate.rejected]: (state, { payload }) => {
      state.recruiterCandidateCreateLoading = false;
      state.recruiterCandidateCreateSuccess = false;
      state.recruiterCandidateCreateError = payload;
    },
  },
});

export const { clearForm,
  setFetchCandidateLoading,
  setFetchCandidateSuccess,
  setFetchCandidateError,
  setViewCandidateLoading,
  setViewCandidateSuccess,
  setViewCandidateError
} = recruiterCandidateSlice.actions;

//selectors
export const isLoading = (state) =>
  state.auth.profileLoading ||
  state.auth.loading ||
  state.company.recruiterCandidateCreateLoading ||
  state.candidate.fetchCandidateLoading || 
  state.candidate.ViewCandidateLoading;
export default recruiterCandidateSlice.reducer;
