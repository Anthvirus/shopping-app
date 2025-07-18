import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../hooks/cartslice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;