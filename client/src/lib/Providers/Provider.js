"use client";

import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";
import { setUser, logout, setLoading } from "@/redux/features/authSlice";
import axiosInstance from "@/lib/axios/axiosInstance";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { token, user, isLoading } = useSelector((state) => state.auth);

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
      if (!token) {
        dispatch(setLoading(false));
        return;
      }

      try {
        // Set timeout for user fetch (5 seconds)
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const response = await axiosInstance.get("/users/user", {
          signal: controller.signal,
        });
        clearTimeout(timeout);

        if (response.data.success) {
          dispatch(setUser(response.data.body.user));
        } else {
          dispatch(setLoading(false));
        }
      } catch (error) {
        dispatch(setLoading(false));
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
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <AuthInitializer>{children}</AuthInitializer>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
