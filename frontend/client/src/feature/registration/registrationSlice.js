import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import registrationService from "./registrationService";

const initialState = {
  // registration: {},
  registration: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isLoggedIn: false,
  message: "",
};

// Create new registration
export const registerVaccine = createAsyncThunk(
  "registrations/register",
  async (registrationData, thunkAPI) => {
    try {
      return await registrationService.registerVaccine(registrationData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);



// get registration history
export const getRegistrationHistory = createAsyncThunk(
  "registrations/history",
  async (userData, thunkAPI) => {
    try {
      return await registrationService.getRegistrationHistory(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerVaccine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerVaccine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.registration = action.payload;
      })
      .addCase(registerVaccine.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      
      .addCase(getRegistrationHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRegistrationHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.registration = action.payload;
      })
      .addCase(getRegistrationHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = registrationSlice.actions;
export default registrationSlice.reducer;
