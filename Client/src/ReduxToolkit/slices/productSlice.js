import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Initial state
const initialState = {
  isLoading: false,
  productList: [],
  error: null,
};

// Async thunk to add a new product
export const addNewProduct = createAsyncThunk(
  "adminProducts/addNewProduct", // Unique identifier for the action
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/product/create-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async thunk to fetch all products
export const fetchAllProducts = createAsyncThunk(
  "adminProducts/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/product/get-all-product`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async thunk to update a product
export const updateProducts = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/product/update-product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async thunk to delete a product
export const deleteProducts = createAsyncThunk(
  "adminProducts/deleteProduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/product/delete-product/${id}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add New Product
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList.push(action.payload);
        state.error = null;
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch All Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload;
        state.error = null;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Product
      .addCase(updateProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedProduct = action.payload;

        // Update the product in the list
        const index = state.productList.findIndex(
          (product) => product._id === updatedProduct._id
        );
        if (index !== -1) {
          state.productList[index] = updatedProduct;
        }
        state.error = null;
      })
      .addCase(updateProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete Product
      .addCase(deleteProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.isLoading = false;

        // Remove the deleted product from the list
        state.productList = state.productList.filter(
          (product) => product._id !== action.meta.arg.id
        );
        state.error = null;
      })
      .addCase(deleteProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default adminProductSlice.reducer;
