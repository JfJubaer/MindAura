import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const course = action.payload;
      const index = state.items.findIndex(item => item.id === course.id);
      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(course);
      }
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
