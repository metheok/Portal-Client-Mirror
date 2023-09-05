import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const employerProfileFetch = createAsyncThunk(
  "employer/profile/fetch",
  async (params, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.userToken;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`/api/employer/profile`, config);

      return data;
    } catch (error) {
      // return custom error message from API if any
      console.log({ error });
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const employerProfileUpdate = createAsyncThunk(
  "employer/profile/update",

  async (data, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.userToken;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      // return;
      const { data: responseData } = await axios.put(
        `/api/employer/profile`,
        { data },
        config
      );
      return responseData;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
