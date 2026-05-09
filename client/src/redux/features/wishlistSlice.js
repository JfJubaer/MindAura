import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addToWishlistLocal: (state, action) => {
      if (!state.items.find(item => item._id === action.payload._id)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlistLocal: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    setWishlistLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setWishlistError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { 
  setWishlist, 
  addToWishlistLocal, 
  removeFromWishlistLocal, 
  setWishlistLoading, 
  setWishlistError 
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
