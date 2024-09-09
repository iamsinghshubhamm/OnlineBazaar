import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import adminReducer from "../slices/productSlice";
import shoppingReducer from "../slices/shopSlice";
import cartReducer from "../slices/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminReducer,
    shoppingProduct: shoppingReducer,
    cartItem: cartReducer,
  },
});

export default store;
