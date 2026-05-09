"use client";
import { persistor, store } from "@/redux/store";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";
import { fetchAndSaveSeller } from "../utils/fetchAndSaveSeller";



const InnerProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("running useEffect on load (first-load/page-refresh)")
    const token = localStorage.getItem("token");
    if (token) {
      fetchAndSaveSeller(dispatch, token);
    }
  }, []); // runs only once per browser load/refresh

  return children;
};

const Providers = ({ children }) => {
  
  return (
    <Provider store={store}>
           <PersistGate loading={null} persistor={persistor}>
                   <InnerProvider>{children}</InnerProvider>
            </PersistGate>
    </Provider>
  );
};

export default Providers;
