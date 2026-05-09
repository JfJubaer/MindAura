"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Stack,
  Button,
  Avatar,
  Rating,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios/axiosInstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LanguageIcon from "@mui/icons-material/Language";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/redux/features/authSlice";
import {
  setWishlist,
  addToWishlistLocal,
  removeFromWishlistLocal,
} from "@/redux/features/wishlistSlice";

const CourseDetailsPage = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoading: authLoading } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist?.items ?? []);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isEnrolled = user?.enrolledCourses?.some(
    (eid) => eid?.toString() === id
  );
  const isInWishlist = wishlistItems.some((item) => item?._id === id);

  // Fetch course details (no auth required)
  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axiosInstance.get(`/courses/${id}`);
        if (res.data.success) {
          setCourse(res.data.data);
        } else {
          setError("Course not found.");
        }
      } catch (err) {
        console.error("Course fetch error:", err);
        setError("Failed to load course details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]); // Only depends on id — no auth dependency

  // Fetch wishlist separately once auth is resolved
  useEffect(() => {
    if (authLoading || !user || !id) return;

    const fetchWishlist = async () => {
      try {
        const res = await axiosInstance.get("/wishlist");
        if (res.data.success) {
          dispatch(setWishlist(res.data.data));
        }
      } catch (err) {
        // Silently ignore wishlist fetch errors on course page
        console.warn("Wishlist fetch skipped:", err?.response?.status);
      }
    };

    fetchWishlist();
  }, [id, user, authLoading, dispatch]);

  const handleEnroll = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setEnrollLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await axiosInstance.post(`/users/enroll/${id}`);
      if (response.data.success) {
        dispatch(setUser(response.data.body.user));
        setSuccess("Successfully enrolled! Redirecting to My Learning...");
        setTimeout(() => {
          router.push("/my-learning");
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to enroll in course");
    } finally {
      setEnrollLoading(false);
    }
  };

  const handleWishlist = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setWishlistLoading(true);
    try {
      if (isInWishlist) {
        await axiosInstance.delete(`/wishlist/${id}`);
        dispatch(removeFromWishlistLocal(id));
        setSuccess("Removed from wishlist");
      } else {
        await axiosInstance.post("/wishlist", { courseId: id });
        dispatch(addToWishlistLocal(course));
        setSuccess("Added to wishlist");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Wishlist update failed");
    } finally {
      setWishlistLoading(false);
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error && !course) {
    return (
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!course) return null;

  const galleryImages = [
    course.thumbnailUrl,
    ...(course.classes?.map((c) => c.thumbnailUrl) || []),
  ].filter((img) => img);

  return (
    <Box sx={{ py: 6, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        {success && (
          <Alert severity="success" sx={{ mb: 4, borderRadius: 2 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={6}>
          {/* Left Column */}
          <Grid item xs={12} md={7}>
            {galleryImages.length > 0 && (
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 6,
                  overflow: "hidden",
                  mb: 4,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000 }}
                  style={{ height: 450 }}
                >
                  {galleryImages.map((img, index) => (
                    <SwiperSlide key={index}>
                      <Box
                        component="img"
                        src={img}
                        alt={`Slide ${index}`}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Paper>
            )}

            <Typography variant="h3" sx={{ fontWeight: 900, mb: 3 }}>
              {course.name}
            </Typography>

            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              sx={{ mb: 4 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  src={course.author?.profilePic}
                  sx={{ width: 40, height: 40 }}
                />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Instructor
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {course.author?.name}
                  </Typography>
                </Box>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Rating
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Rating value={course.rating || 0} readOnly size="small" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    ({course.rating || 0})
                  </Typography>
                </Box>
              </Box>
            </Stack>

            <Divider sx={{ mb: 4 }} />

            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
              Course Description
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ whiteSpace: "pre-wrap", mb: 6, lineHeight: 1.8 }}
            >
              {course.description}
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
              Curriculum ({course.classes?.length || 0} Lessons)
            </Typography>
            <Stack spacing={2}>
              {course.classes?.map((item, index) => (
                <Paper
                  key={index}
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      p: 1,
                      borderRadius: 2,
                      display: "flex",
                    }}
                  >
                    <PlayCircleOutlineIcon />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.des}
                    </Typography>
                  </Box>
                  <Chip
                    label="Preview"
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 1.5 }}
                  />
                </Paper>
              ))}
            </Stack>
          </Grid>

          {/* Right Column: Sticky Card */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 6,
                border: "1px solid",
                borderColor: "divider",
                position: "sticky",
                top: 100,
                bgcolor: "background.paper",
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontWeight: 900, color: "primary.main", mb: 1 }}
              >
                {course.price === 0 ? "Free" : `$${course.price}`}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 4 }}
              >
                Full Lifetime Access
              </Typography>

              <Stack spacing={2} sx={{ mb: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={
                    isEnrolled ? () => router.push("/my-learning") : handleEnroll
                  }
                  disabled={enrollLoading}
                  sx={{
                    py: 2,
                    borderRadius: 3,
                    fontWeight: 800,
                    fontSize: "1.1rem",
                  }}
                >
                  {enrollLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : isEnrolled ? (
                    "Go to My Learning"
                  ) : (
                    "Enroll Now"
                  )}
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={handleWishlist}
                  disabled={wishlistLoading}
                  sx={{ py: 1.5, borderRadius: 3, fontWeight: 700 }}
                >
                  {wishlistLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : isInWishlist ? (
                    "Remove from Wishlist"
                  ) : (
                    "Add to Wishlist"
                  )}
                </Button>
              </Stack>

              <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>
                This course includes:
              </Typography>
              <List sx={{ p: 0 }}>
                {[
                  {
                    icon: <ScheduleIcon />,
                    text: `${(course.classes?.length || 0) * 45 || 120} mins of on-demand video`,
                  },
                  {
                    icon: <CheckCircleOutlineIcon />,
                    text: "Full lifetime access",
                  },
                  {
                    icon: <LanguageIcon />,
                    text: "Access on mobile and TV",
                  },
                  {
                    icon: <WorkspacePremiumIcon />,
                    text: "Certificate of completion",
                  },
                ].map((item, idx) => (
                  <ListItem key={idx} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36, color: "primary.main" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{ variant: "body2" }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CourseDetailsPage;
