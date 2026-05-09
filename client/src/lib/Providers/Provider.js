"use client";

import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";
import { setUser, logout } from "@/redux/features/authSlice";
import axiosInstance from "@/lib/axios/axiosInstance";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // CRITICAL: Always sync Redux token → localStorage so axiosInstance can read it.
    // redux-persist rehydrates token into Redux state but NOT into localStorage["token"].
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    }

    const verifySession = async () => {
      if (!token) return;

      try {
        // Always verify and refresh user data on mount
        const response = await axiosInstance.get("/users/user");
        if (response.data.success) {
          dispatch(setUser(response.data.body.user));
        }
      } catch (error) {
        console.error("Session verification failed:", error);
        if (error.response?.status === 401) {
          dispatch(logout());
          localStorage.removeItem("token");
        }
      }
    };

    verifySession();
  }, [dispatch, token]);

  return children;
};

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthInitializer>{children}</AuthInitializer>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
