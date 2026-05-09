"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        router.push("/");
      }
    }
  }, [isAuthenticated, user, isLoading, router, allowedRoles]);

  if (isLoading || !isAuthenticated || (allowedRoles.length > 0 && !allowedRoles.includes(user?.role))) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return children;
};

export default ProtectedRoute;
