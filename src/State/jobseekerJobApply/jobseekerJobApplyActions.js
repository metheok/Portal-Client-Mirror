import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const jobseekerApplicationCreate = createAsyncThunk(
  "jobseeker/application/create",

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
      const { data: responseData } = await axios.post(
        `/api/jobseeker/application`,
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
