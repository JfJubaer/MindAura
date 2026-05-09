"use client";

import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid2 as Grid,
  Alert,
  Button,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import axiosInstance from "@/lib/axios/axiosInstance";
import CourseCard from "@/components/cards/CourseCard";
import CourseSkeleton from "@/components/skeletons/CourseSkeleton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useDispatch, useSelector } from "react-redux";
import {
  setWishlist,
  setWishlistLoading,
  setWishlistError,
} from "@/redux/features/wishlistSlice";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { user, isLoading: authLoading } = useSelector((state) => state.auth);
  const { items: courses, isLoading: loading, error } = useSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    // Wait until auth state is resolved
    if (authLoading) return;

    // If not logged in, clear the wishlist and stop
    if (!user) {
      dispatch(setWishlist([]));
      return;
    }

    const fetchWishlist = async () => {
      dispatch(setWishlistLoading(true));
      try {
        const response = await axiosInstance.get("/wishlist");
        if (response.data.success) {
          dispatch(setWishlist(response.data.data));
        } else {
          dispatch(setWishlist([]));
        }
      } catch (err) {
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          // Token expired or invalid — clear silently
          dispatch(setWishlist([]));
        } else {
          dispatch(
            setWishlistError("Failed to load your wishlist. Please try again.")
          );
        }
        console.error("Wishlist fetch error:", err);
      }
    };

    fetchWishlist();
  }, [user, authLoading, dispatch]);

  // Not logged in state
  if (!authLoading && !user) {
    return (
      <Box
        sx={{
          py: 16,
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <LockOutlinedIcon sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Please log in to view your wishlist
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Save your favourite courses and come back to them anytime.
          </Typography>
          <Link href="/login" passHref style={{ textDecoration: "none" }}>
            <Button variant="contained" size="large" sx={{ borderRadius: 2, px: 4 }}>
              Log In
            </Button>
          </Link>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8, bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
            My Wishlist
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Courses you&apos;ve saved for later.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={4}>
          {loading || authLoading ? (
            Array.from(new Array(4)).map((_, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                <CourseSkeleton />
              </Grid>
            ))
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={course._id}>
                <CourseCard course={course} />
              </Grid>
            ))
          ) : (
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  py: 12,
                  textAlign: "center",
                  bgcolor: "background.paper",
                  borderRadius: 4,
                  border: "2px dashed",
                  borderColor: "divider",
                }}
              >
                <FavoriteIcon
                  sx={{ fontSize: 64, color: "text.disabled", mb: 2 }}
                />
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  Your wishlist is empty
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4 }}
                >
                  Explore our courses and save your favourites here.
                </Typography>
                <Link href="/courses" passHref style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ borderRadius: 2, px: 4 }}
                  >
                    Browse Courses
                  </Button>
                </Link>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default WishlistPage;
