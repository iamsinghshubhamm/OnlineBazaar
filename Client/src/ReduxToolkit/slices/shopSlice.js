import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,  // Should be null, not an array
  error: null,
};

// Fetch filtered and sorted products
const fetchShoppingProducts = createAsyncThunk(
  "shoppingProduct/get-shopping-product",
  async ({ filterParams, sortParams }, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      });
      const response = await axios.get(
        `${API_URL}/api/shopping/get-filter-product?${query}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Fetch a single product's details by ID
const fetchProductDetails = createAsyncThunk(
  "shoppingProduct/get-product-details",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/shopping/get-product-details/${id}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const shoppingProductSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Shopping Products
      .addCase(fetchShoppingProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchShoppingProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
        state.error = null;
      })
      .addCase(fetchShoppingProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch Product Details
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload;
        state.error = null;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default shoppingProductSlice.reducer;
export { fetchShoppingProducts, fetchProductDetails };
