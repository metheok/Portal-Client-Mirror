import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const jobseekerProfileFetch = createAsyncThunk(
  "jobseeker/profile/fetch",
  async (params, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.userToken;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`/api/jobseeker/profile`, config);

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

export const jobseekerProfileUpdate = createAsyncThunk(
  "jobseeker/profile/update",

  async (data, { rejectWithValue, getState }) => {
    try {
      const { userToken } = getState().auth;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      // return;
      const { data: responseData } = await axios.put(
        `/api/jobseeker/profile`,
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
