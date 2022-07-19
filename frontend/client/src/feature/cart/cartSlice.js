import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
// Create new cart
export const addCart = createAsyncThunk(
  "carts/addCart",
  async (cartData, thunkAPI) => {
    try {
      return await cartService.addCart(cartData);
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

export const getCart = createAsyncThunk(
  "carts/id",
  async (userData, thunkAPI) => {
    try {
      return await cartService.getCart(userData);
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

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;

        for (var item of action.payload) {
          state.quantity = state.quantity + item.quantity;
          state.total += item.price * item.quantity;
        }
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(addCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products.push(action.payload);
      })
      .addCase(addCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetCart, addToCart } = cartSlice.actions;
export default cartSlice.reducer;
