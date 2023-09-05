import { createSlice } from "@reduxjs/toolkit";

import {
  employerCompanyUpdate,
  employerCompanyFetch,
  employerCompanyCreate,
} from "./employerCompanyActions";

const initialState = {
  data: null,

  companyFetchLoading: false,
  companyFetchSuccess: false,
  companyFetchError: null,

  companyUpdateLoading: false,
  companyUpdateSuccess: false,
  companyUpdateError: null,

  companySaveLoading: false,
  companySaveSuccess: false,
  companySaveError: null,
};

const employerCompanySlice = createSlice({
  name: "employerCompany",
  initialState,
  reducers: {
    clearForm: (state) => {
      state.companyFetchError = null;
      state.companyUpdateError = null;
      state.companySaveError = null;

      state.companyFetchSuccess = false;
      state.companyUpdateSuccess = false;
      state.companySaveSuccess = false;
    },
  },
  extraReducers: {
    [employerCompanyFetch.pending]: (state) => {
      state.companyFetchLoading = true;
      state.companyFetchSuccess = false;
      state.companyFetchError = null;
    },
    [employerCompanyFetch.fulfilled]: (state, { payload }) => {
      state.companyFetchLoading = false;
      state.companyFetchSuccess = true;
      state.companyFetchError = null;
      state.data = payload;
    },
    [employerCompanyFetch.rejected]: (state, { payload }) => {
      state.companyFetchLoading = true;
      state.companyFetchSuccess = false;
      state.companyFetchError = payload;
    },
    [employerCompanyUpdate.pending]: (state) => {
      state.companyUpdateLoading = true;
      state.companyUpdateSuccess = false;
      state.companyUpdateError = null;
    },
    [employerCompanyUpdate.fulfilled]: (state, { payload }) => {
      state.companyUpdateLoading = false;
      state.companyUpdateSuccess = true;
      state.companyUpdateError = null;
      state.data = payload;
    },
    [employerCompanyUpdate.rejected]: (state, { payload }) => {
      state.companyUpdateLoading = false;
      state.companyUpdateSuccess = false;
      state.companyUpdateError = payload;
    },
    [employerCompanyCreate.pending]: (state) => {
      state.companySaveLoading = true;
      state.companySaveSuccess = false;
      state.companySaveError = null;
    },
    [employerCompanyCreate.fulfilled]: (state, { payload }) => {
      state.companySaveLoading = false;
      state.companySaveSuccess = true;
      state.data = payload;
      state.companySaveError = null;
    },
    [employerCompanyCreate.rejected]: (state, { payload }) => {
      state.companySaveLoading = false;
      state.companySaveSuccess = false;
      state.companySaveError = payload;
    },
  },
});

export const { clearForm } = employerCompanySlice.actions;

//selectors
export const isLoading = (state) =>
  state.auth.profileLoading ||
  state.auth.loading ||
  state.company.companyFetchLoading ||
  state.company.companyUpdateLoading ||
  state.company.companySaveLoading;
export default employerCompanySlice.reducer;
