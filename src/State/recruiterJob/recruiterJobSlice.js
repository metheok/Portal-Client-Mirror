import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetchAJobLoading: false,
  fetchAJobError: null,
  fetchAJobSuccess: false,

  markJobLoading: false,
  markJobError: null,
  markJobSuccess: false,

  unmarkJobLoading: false,
  unmarkJobError: null,
  unmarkJobSuccess: false,

  viewJobLoading: false,
  viewJobError: null,
  viewJobSuccess: false,

  viewMarkedJobLoading: false,
  viewMarkedJobError: null,
  viewMarkedJobSuccess: false,

  viewReferredJobLoading: false,
  viewReferredJobError: null,
  viewReferredJobSuccess: false,

  viewClosedJobLoading: false,
  viewClosedJobError: null,
  viewClosedJobSuccess: false,
};

const recruiterJobSlice = createSlice({
  name: "recruiterJob",
  initialState,
  reducers: {
    setFetchAJobLoading: (state, action) => {
      state.fetchAJobLoading = true;
      state.fetchAJobError = null;
      state.fetchAJobSuccess = false;
    },
    setFetchAJobSuccess: (state, action) => {
      state.fetchAJobLoading = false;
      state.fetchAJobError = null;
      state.fetchAJobSuccess = true;
    },
    setFetchAJobError: (state, { payload }) => {
      state.fetchAJobLoading = false;
      state.fetchAJobError = payload;
      state.fetchAJobSuccess = false;
    },
    setMarkJobLoading: (state, action) => {
      state.markJobLoading = true;
      state.markJobError = null;
      state.markJobSuccess = false;
    },
    setMarkJobSuccess: (state, action) => {
      state.markJobLoading = false;
      state.markJobError = null;
      state.markJobSuccess = true;
    },
    setMarkJobError: (state, { payload }) => {
      state.markJobLoading = false;
      state.markJobError = payload;
      state.markJobSuccess = false;
    },
    setUnmarkJobLoading: (state, action) => {
      state.unmarkJobLoading = true;
      state.unmarkJobError = null;
      state.unmarkJobSuccess = false;
    },
    setUnmarkJobSuccess: (state, action) => {
      state.unmarkJobLoading = false;
      state.unmarkJobError = null;
      state.unmarkJobSuccess = true;
    },
    setUnmarkJobError: (state, { payload }) => {
      state.unmarkJobLoading = false;
      state.unmarkJobError = payload;
      state.unmarkJobSuccess = false;
    },
    setViewJobLoading: (state, action) => {
      state.viewJobLoading = true;
      state.viewJobError = null;
      state.viewJobSuccess = false;
    },
    setViewJobSuccess: (state, action) => {
      state.viewJobLoading = false;
      state.viewJobError = null;
      state.viewJobSuccess = true;
    },
    setViewJobError: (state, { payload }) => {
      state.viewJobLoading = false;
      state.viewJobError = payload;
      state.viewJobSuccess = false;
    },
    setViewMarkedJobLoading: (state, action) => {
      state.viewMarkedJobLoading = true;
      state.viewMarkedJobError = null;
      state.viewMarkedJobSuccess = false;
    },
    setViewMarkedJobSuccess: (state, action) => {
      state.viewMarkedJobLoading = false;
      state.viewMarkedJobError = null;
      state.viewMarkedJobSuccess = true;
    },
    setViewMarkedJobError: (state, { payload }) => {
      state.viewMarkedJobLoading = false;
      state.viewMarkedJobError = payload;
      state.viewMarkedJobSuccess = false;
    },
    setViewReferredJobLoading: (state, action) => {
      state.viewReferredJobLoading = true;
      state.viewReferredJobError = null;
      state.viewReferredJobSuccess = false;
    },
    setViewReferredJobSuccess: (state, action) => {
      state.viewReferredJobLoading = false;
      state.viewReferredJobError = null;
      state.viewReferredJobSuccess = true;
    },
    setViewReferredJobError: (state, { payload }) => {
      state.viewReferredJobLoading = false;
      state.viewReferredJobError = payload;
      state.viewReferredJobSuccess = false;
    },
    setViewClosedJobLoading: (state, action) => {
      state.viewClosedJobLoading = true;
      state.viewClosedJobError = null;
      state.viewClosedJobSuccess = false;
    },
    setViewClosedJobSuccess: (state, action) => {
      state.viewClosedJobLoading = false;
      state.viewClosedJobError = null;
      state.viewClosedJobSuccess = true;
    },
    setViewClosedJobError: (state, { payload }) => {
      state.viewClosedJobLoading = false;
      state.viewClosedJobError = payload;
      state.viewClosedJobSuccess = false;
    },
  },
  extraReducers: {},
});

export const {
  setFetchAJobLoading,
  setFetchAJobSuccess,
  setFetchAJobError,
  setMarkJobLoading,
  setMarkJobSuccess,
  setMarkJobError,
  setUnmarkJobLoading,
  setUnmarkJobSuccess,
  setUnmarkJobError,
  setViewJobLoading,
  setViewJobSuccess,
  setViewJobError,
  setViewMarkedJobLoading,
  setViewMarkedJobSuccess,
  setViewMarkedJobError,
  setViewReferredJobLoading,
  setViewReferredJobSuccess,
  setViewReferredJobError,
  setViewClosedJobLoading,
  setViewClosedJobSuccess,
  setViewClosedJobError,
} = recruiterJobSlice.actions;

//selectors
export const isLoading = (state) =>
  state.jobs.fetchAJobLoading ||
  state.jobs.markJobLoading ||
  state.jobs.unmarkJobLoading ||
  state.jobs.viewJobLoading ||
  state.jobs.viewMarkedJobLoading ||
  state.jobs.viewReferredJobLoading ||
  state.jobs.viewClosedJobLoading;

export default recruiterJobSlice.reducer;
