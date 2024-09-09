import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Async thunk to add a product to the cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productId, quantity }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`${API_URL}/api/shopping/cart/add`, {
        userId,
        productId,
        quantity,
      });
      // After adding, fetch updated cart
      dispatch(fetchCartItems({ userId }));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch cart items for a user
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/shopping/cart/get/${userId}`);
      return response.data.data; // Assuming your API response structure
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to update a product quantity in the cart
export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async ({ userId, productId, quantity }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(`${API_URL}/api/shopping/cart/update`, {
        userId,
        productId,
        quantity,
      });
      dispatch(fetchCartItems({ userId }));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to delete an item from the cart
export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async ({ userId, productId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`${API_URL}/api/shopping/cart/delete/${userId}/${productId}`);
      dispatch(fetchCartItems({ userId }));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  cart: [],
  isLoading: false,
  error: null,
};

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to add product to cart';
      });

    // Fetch cart items
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload; // Update the cart with fetched data
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch cart items';
      });

    // Update cart
    builder
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state) => {
        state.isLoading = false;
        // The cart will be updated after fetchCartItems runs, so no need to modify it here
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to update cart';
      });

    // Delete cart item
    builder
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state) => {
        state.isLoading = false;
        // The cart will be updated after fetchCartItems runs, so no need to modify it here
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to delete item from cart';
      });
  },
});

// Export the reducer to be used in the store
export default cartSlice.reducer;
