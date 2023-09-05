import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetchAJobLoading: false,
  fetchAJobError: null,
  fetchAJobSuccess: false,
  fetchFavouriteJobLoading: false,
  fetchFavouriteJobError: null,
  fetchFavouriteJobSuccess: false,
  fetchAppliedJobLoading: false,
  fetchAppliedJobError: null,
  fetchAppliedJobSuccess: false,
  fetchClosedJobLoading: false,
  fetchClosedJobError: null,
  fetchClosedJobSuccess: false,
  favouriteJobLoading: false,
  favouriteJobError: null,
  favouriteJobSuccess: false,

  unfavouriteJobLoading: false,
  unfavouriteJobError: null,
  unfavouriteJobSuccess: false,

  viewJobLoading: false,
  viewJobError: null,
  viewJobSuccess: false,
};

const jobseekerJobSlice = createSlice({
  name: "jobseekerJob",
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
    setFetchFavouriteJobLoading: (state, action) => {
      state.fetchFavouriteJobLoading = true;
      state.fetchFavouriteJobError = null;
      state.fetchFavouriteJobSuccess = false;
    },
    setFetchFavouriteJobSuccess: (state, action) => {
      state.fetchFavouriteJobLoading = false;
      state.fetchFavouriteJobError = null;
      state.fetchFavouriteJobSuccess = true;
    },
    setFetchFavouriteJobError: (state, { payload }) => {
      state.fetchFavouriteJobLoading = false;
      state.fetchFavouriteJobError = payload;
      state.fetchFavouriteJobSuccess = false;
    },
    setFetchAppliedJobLoading: (state, action) => {
      state.fetchAppliedJobLoading = true;
      state.fetchAppliedJobError = null;
      state.fetchAppliedJobSuccess = false;
    },
    setFetchAppliedJobSuccess: (state, action) => {
      state.fetchAppliedJobLoading = false;
      state.fetchAppliedJobError = null;
      state.fetchAppliedJobSuccess = true;
    },
    setFetchAppliedJobError: (state, { payload }) => {
      state.fetchAppliedJobLoading = false;
      state.fetchAppliedJobError = payload;
      state.fetchAppliedJobSuccess = false;
    },
    setFetchClosedJobLoading: (state, action) => {
      state.fetchClosedJobLoading = true;
      state.fetchClosedJobError = null;
      state.fetchClosedJobSuccess = false;
    },
    setFetchClosedJobSuccess: (state, action) => {
      state.fetchClosedJobLoading = false;
      state.fetchClosedJobError = null;
      state.fetchClosedJobSuccess = true;
    },
    setFetchClosedJobError: (state, { payload }) => {
      state.fetchClosedJobLoading = false;
      state.fetchClosedJobError = payload;
      state.fetchClosedJobSuccess = false;
    },
    setFavouriteJobLoading: (state, action) => {
      state.favouriteJobLoading = true;
      state.favouriteJobError = null;
      state.favouriteJobSuccess = false;
    },
    setFavouriteJobSuccess: (state, action) => {
      state.favouriteJobLoading = false;
      state.favouriteJobError = null;
      state.favouriteJobSuccess = true;
    },
    setFavouriteJobError: (state, { payload }) => {
      state.favouriteJobLoading = false;
      state.favouriteJobError = payload;
      state.favouriteJobSuccess = false;
    },
    setUnfavouriteJobLoading: (state, action) => {
      state.unfavouriteJobLoading = true;
      state.unfavouriteJobError = null;
      state.unfavouriteJobSuccess = false;
    },
    setUnfavouriteJobSuccess: (state, action) => {
      state.unfavouriteJobLoading = false;
      state.unfavouriteJobError = null;
      state.unfavouriteJobSuccess = true;
    },
    setUnfavouriteJobError: (state, { payload }) => {
      state.unfavouriteJobLoading = false;
      state.unfavouriteJobError = payload;
      state.unfavouriteJobSuccess = false;
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
  },
  extraReducers: {},
});

export const {
  setFetchAJobLoading,
  setFetchAJobSuccess,
  setFetchAJobError,
  setFetchFavouriteJobLoading,
  setFetchFavouriteJobSuccess,
  setFetchFavouriteJobError,
  setFetchAppliedJobLoading,
  setFetchAppliedJobSuccess,
  setFetchAppliedJobError,
  setFetchClosedJobLoading,
  setFetchClosedJobSuccess,
  setFetchClosedJobError,
  setFavouriteJobLoading,
  setFavouriteJobSuccess,
  setFavouriteJobError,
  setUnfavouriteJobLoading,
  setUnfavouriteJobSuccess,
  setUnfavouriteJobError,
  setViewJobLoading,
  setViewJobSuccess,
  setViewJobError,
} = jobseekerJobSlice.actions;

//selectors
export const isLoading = (state) =>
  state.jobs.fetchAJobLoading ||
  state.jobs.fetchFavouriteJobLoading ||
  state.jobs.fetchAppliedJobLoading ||
  state.jobs.fetchCLosedJobLoading ||
  state.jobs.favouriteJobLoading ||
  state.jobs.unavouriteJobLoading ||
  state.jobs.viewJobLoading;

export default jobseekerJobSlice.reducer;
