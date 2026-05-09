"use client";

import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";
import { setUser, logout } from "@/redux/features/authSlice";
import axios from "axios";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const verifySession = async () => {
      if (token) {
        try {
          // Verify token and get fresh user data from the server
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/user`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (response.data.success) {
            dispatch(setUser({ user: response.data.body.user, token }));
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
