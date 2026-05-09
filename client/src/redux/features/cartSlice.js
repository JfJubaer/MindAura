import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      const existingItem = state.items.find(item => item.id === course.id);
      if (!existingItem) {
        state.items.push(course);
        state.totalAmount += parseFloat(course.price.replace('$', ''));
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1) {
        state.totalAmount -= parseFloat(state.items[index].price.replace('$', ''));
        state.items.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
