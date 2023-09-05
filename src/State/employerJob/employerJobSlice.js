import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addAJobLoading: false,
  addAJobError: null,
  addAJobSuccess: false,

  fetchAJobLoading: false,
  fetchAJobError: null,
  fetchAJobSuccess: false,

  liveJobLoading: false,
  liveJobError: null,
  liveJobSuccess: false,

  reviewJobLoading: false,
  reviewJobError: null,
  reviewJobSuccess: false,

  pausedJobLoading: false,
  pausedJobError: null,
  pausedJobSuccess: false,

  draftJobLoading: false,
  draftJobError: null,
  draftJobSuccess: false,

  closedJobLoading: false,
  closedJobError: null,
  closedJobSuccess: false,

  jobDetailsLoading: false,
  jobDetailsError: null,
  jobDetailsSuccess: false,

  statusChangeLoading: false,
  statusChangeError: null,
  statusChangeSuccess: false,
};

const employerJobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setAddAJobLoading: (state, action) => {
      state.addAJobLoading = true;
      state.addAJobError = null;
      state.addAJobSuccess = false;
    },
    setAddAJobSuccess: (state, action) => {
      state.addAJobLoading = false;
      state.addAJobError = null;
      state.addAJobSuccess = true;
    },
    setAddAJobError: (state, { payload }) => {
      state.addAJobLoading = false;
      state.addAJobError = payload;
      state.addAJobSuccess = true;
    },
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
    clearJobForm: (state) => {
      state.addAJobLoading = false;
      state.addAJobError = null;
      state.addAJobSuccess = false;

      state.fetchAJobLoading = false;
      state.fetchAJobError = null;
      state.fetchAJobSuccess = false;
    },
    setLiveJobLoading: (state, action) => {
      state.liveJobLoading = true;
      state.liveJobError = null;
      state.liveJobSuccess = false;
    },
    setLiveJobSuccess: (state, action) => {
      state.liveJobLoading = false;
      state.liveJobError = null;
      state.liveJobSuccess = true;
    },
    setLiveJobError: (state, { payload }) => {
      state.liveJobLoading = false;
      state.liveJobError = payload;
      state.liveJobSuccess = false;
    },
    setReviewJobLoading: (state, action) => {
      state.reviewJobLoading = true;
      state.reviewJobError = null;
      state.reviewJobSuccess = false;
    },
    setReviewJobSuccess: (state, action) => {
      state.reviewJobLoading = false;
      state.reviewJobError = null;
      state.reviewJobSuccess = true;
    },
    setReviewJobError: (state, { payload }) => {
      state.reviewJobLoading = false;
      state.reviewJobError = payload;
      state.reviewJobSuccess = false;
    },
    setPausedJobLoading: (state, action) => {
      state.pausedJobLoading = true;
      state.pausedJobError = null;
      state.pausedJobSuccess = false;
    },
    setPausedJobSuccess: (state, action) => {
      state.pausedJobLoading = false;
      state.pausedJobError = null;
      state.pausedJobSuccess = true;
    },
    setPausedJobError: (state, { payload }) => {
      state.pausedJobLoading = false;
      state.pausedJobError = payload;
      state.pausedJobSuccess = false;
    },
    setDraftJobLoading: (state, action) => {
      state.draftJobLoading = true;
      state.draftJobError = null;
      state.draftJobSuccess = false;
    },
    setDraftJobSuccess: (state, action) => {
      state.draftJobLoading = false;
      state.draftJobError = null;
      state.draftJobSuccess = true;
    },
    setDraftJobError: (state, { payload }) => {
      state.draftJobLoading = false;
      state.draftJobError = payload;
      state.draftJobSuccess = false;
    },
    setClosedJobLoading: (state, action) => {
      state.closedJobLoading = true;
      state.closedJobError = null;
      state.closedJobSuccess = false;
    },
    setClosedJobSuccess: (state, action) => {
      state.closedJobLoading = false;
      state.closedJobError = null;
      state.closedJobSuccess = true;
    },
    setClosedJobError: (state, { payload }) => {
      state.closedJobLoading = false;
      state.closedJobError = payload;
      state.closedJobSuccess = false;
    },
    setJobDetailsLoading: (state, action) => {
      state.jobDetailsLoading = true;
      state.jobDetailsError = null;
      state.jobDetailsSuccess = false;
    },
    setJobDetailsSuccess: (state, action) => {
      state.jobDetailsLoading = false;
      state.jobDetailsError = null;
      state.jobDetailsSuccess = true;
    },
    setJobDetailsError: (state, { payload }) => {
      state.jobDetailsLoading = false;
      state.jobDetailsError = payload;
      state.jobDetailsSuccess = false;
    },
    setStatusChangeLoading: (state, action) => {
      state.statusChangeLoading = true;
      state.statusChangeError = null;
      state.statusChangeuccess = false;
    },
    setStatusChangeuccess: (state, action) => {
      state.statusChangeLoading = false;
      state.statusChangeError = null;
      state.statusChangeuccess = true;
    },
    setStatusChangeError: (state, { payload }) => {
      state.statusChangeLoading = false;
      state.statusChangeError = payload;
      state.statusChangeuccess = false;
    },
  },
  extraReducers: {},
});

export const {
  setAddAJobLoading,
  setAddAJobSuccess,
  setAddAJobError,
  setFetchAJobLoading,
  setFetchAJobSuccess,
  setFetchAJobError,
  clearJobForm,
  setLiveJobLoading,
  setLiveJobSuccess,
  setLiveJobError,
  setReviewJobLoading,
  setReviewJobSuccess,
  setReviewJobError,
  setPausedJobLoading,
  setPausedJobSuccess,
  setPausedJobError,
  setDraftJobLoading,
  setDraftJobSuccess,
  setDraftJobError,
  setClosedJobLoading,
  setClosedJobSuccess,
  setClosedJobError,
  setJobDetailsLoading,
  setJobDetailsSuccess,
  setJobDetailsError,
  setStatusChangeLoading,
  setStatusChangeSuccess,
  setStatusChangeError,
} = employerJobSlice.actions;

//selectors
export const isLoading = (state) =>
  state.auth.profileLoading ||
  state.auth.loading ||
  state.employerJobs.addAJobLoading ||
  state.employerJobs.fetchAJobLoading ||
  state.employerJobs.liveJobLoading ||
  state.employerJobs.reviewJobLoading ||
  state.employerJobs.pausedJobLoading ||
  state.employerJobs.draftJobLoading ||
  state.employerJobs.closedJobLoading ||
  state.employerJobs.jobDetailsLoading ||
  state.employerJobs.statusChangeLoading;

export default employerJobSlice.reducer;
