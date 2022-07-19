import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:8000/api/centers";

const initialState = {
  centers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getCenters = createAsyncThunk(
  "centers/getall",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(API_URL);

      return res.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const centerSlice = createSlice({
  name: "center",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCenters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCenters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.centers = action.payload;
      })
      .addCase(getCenters.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = centerSlice.actions;
export default centerSlice.reducer;
