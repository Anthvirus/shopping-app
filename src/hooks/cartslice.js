import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.name === item.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.name === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.name === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.name !== action.payload);
        }
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.name !== action.payload);
    },
  },
});

export const {
  setCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
