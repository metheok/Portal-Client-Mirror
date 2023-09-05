import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const userFetch = createAsyncThunk(
  "auth/userFetch",
  async (params, { rejectWithValue, getState }) => {
    try {
      // configure header's Content-Type as JSON
      const token = getState().auth.userToken;
      if (!token) {
        throw "user token";
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`/api/user`, config);

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/update-password",
  async ({ oldPassword, newPassword }, { getState, rejectWithValue }) => {
    try {
      const user = getState().auth.user.user;

      const { email } = user;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.put(
        `/api/auth/update-password`,
        { email, oldPassword, newPassword },
        config
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
