import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./features/apiSlice";
import authReducer from "./features/authSlice";
import courseReducer from "./features/courseSlice";
import cartReducer from "./features/cartSlice";
import wishlistReducer from "./features/wishlistSlice";

// Combine reducers - keeping only relevant ones for the learning platform
const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// Persist configuration
const persistConfig = {
  key: "wisdora-root",
  storage,
  whitelist: ["auth", "cart", "wishlist"], // Persist user session and shop state
  blacklist: [apiSlice.reducerPath], // Do NOT persist API state
};

// Apply persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export const persistor =
  typeof window !== "undefined" ? persistStore(store) : null;

export default store;
