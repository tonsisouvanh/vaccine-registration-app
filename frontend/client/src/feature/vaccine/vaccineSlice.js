import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import vaccineService from "./vaccineService";

const initialState = {
  vaccines: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
// Create new vaccine
export const createVaccine = createAsyncThunk(
  "vaccines/create",
  async (vaccineData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await vaccineService.createVaccine(vaccineData, token);
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

// Get user vaccines
export const getVaccines = createAsyncThunk("vaccines/getall", async (_, thunkAPI) => {
  try {
    return await vaccineService.getVaccines();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getVaccine = createAsyncThunk("vaccines/:id", async (id, thunkAPI) => {
  try {
    return await vaccineService.getVaccine(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete user vaccine
export const deleteVaccine = createAsyncThunk(
  "vaccines/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await vaccineService.deleteVaccine(id, token);
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

export const vaccineSlice = createSlice({
  name: "vaccine",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVaccines.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVaccines.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vaccines = action.payload;
      })
      .addCase(getVaccines.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      .addCase(getVaccine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVaccine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vaccines = action.payload;
      })
      .addCase(getVaccine.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = vaccineSlice.actions;
export default vaccineSlice.reducer;
