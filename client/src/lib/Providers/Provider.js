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

     const verifySession = async () => {
      if (token && !user) {
        try {
          // Verify token and get fresh user data from the server
          const response = await axiosInstance.get("/users/user");
          
          if (response.data.success) {
            dispatch(setUser(response.data.body.user));
          }
        } catch (error) {
          console.error("Session verification failed:", error);
          // If token is invalid or expired, log out
          if (error.response?.status === 401) {
            dispatch(logout());
          }
        }
      }
    };

  useEffect(() => {
 
    verifySession();
  }, [dispatch, token, user]);

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
