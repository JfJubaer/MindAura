"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid2 as Grid,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import axiosInstance from "@/lib/axios/axiosInstance";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/authSlice";

const PROGRESS_OPTIONS = [0, 10, 25, 50, 75, 100];

const MyLearningPage = () => {
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [progressDrafts, setProgressDrafts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  const [unenrollingId, setUnenrollingId] = useState("");

  const syncCurrentUser = async () => {
    const response = await axiosInstance.get("/users/user");
    if (response.data.success) {
      dispatch(setUser(response.data.body.user));
    }
  };

  const fetchEnrollments = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.get("/enrollments");

      if (response.data.success) {
        const enrolledCourses = response.data.data || [];
        setCourses(enrolledCourses);
        setProgressDrafts(
          enrolledCourses.reduce((acc, item) => {
            const courseId = item.courseId?._id;
            if (courseId) {
              acc[courseId] = item.progress ?? 0;
            }
            return acc;
          }, {}),
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load your enrolled courses. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const totalCourses = courses.length;
  const completedCourses = useMemo(
    () => courses.filter((item) => (item.progress ?? 0) === 100).length,
    [courses],
  );

  const handleProgressChange = (courseId, value) => {
    setProgressDrafts((prev) => ({
      ...prev,
      [courseId]: Number(value),
    }));
  };

  const handleSaveProgress = async (courseId) => {
    setUpdatingId(courseId);
    setError("");
    setSuccess("");

    try {
      const response = await axiosInstance.patch(
        `/enrollments/${courseId}/progress`,
        {
          progress: progressDrafts[courseId] ?? 0,
        },
      );

      if (response.data.success) {
        setCourses((prev) =>
          prev.map((item) =>
            item.courseId?._id === courseId
              ? { ...item, progress: progressDrafts[courseId] ?? 0 }
              : item,
          ),
        );
        setSuccess("Progress updated successfully.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update progress.",
      );
    } finally {
      setUpdatingId("");
      setTimeout(() => setSuccess(""), 2500);
    }
  };

  const handleUnenroll = async (courseId) => {
    setUnenrollingId(courseId);
    setError("");
    setSuccess("");

    try {
      const response = await axiosInstance.delete(`/enrollments/${courseId}`);
      if (response.data.success) {
        setCourses((prev) =>
          prev.filter((item) => item.courseId?._id !== courseId),
        );
        setProgressDrafts((prev) => {
          const next = { ...prev };
          delete next[courseId];
          return next;
        });
        await syncCurrentUser();
        setSuccess("Course removed from My Learning.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to unenroll from course.",
      );
    } finally {
      setUnenrollingId("");
      setTimeout(() => setSuccess(""), 2500);
    }
  };

  return (
    <ProtectedRoute>
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: "background.default", minHeight: "100vh" }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, mb: 1, fontSize: { xs: "2rem", md: "3rem" } }}
            >
              My Learning
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track your enrolled courses and keep your progress up to date.
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  Enrolled Courses
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
                  {totalCourses}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  Completed
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
                  {completedCourses}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

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

          {loading ? (
            <Box
              sx={{
                minHeight: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress size={56} />
            </Box>
          ) : courses.length === 0 ? (
            <Paper
              sx={{
                p: { xs: 4, md: 6 },
                textAlign: "center",
                borderRadius: 4,
                border: "1px dashed",
                borderColor: "divider",
              }}
            >
              <SchoolOutlinedIcon
                sx={{ fontSize: 60, color: "text.disabled", mb: 2 }}
              />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                No enrolled courses yet
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 4 }}>
                Browse the catalog and enroll in a course to start learning.
              </Typography>
              <Link href="/courses" style={{ textDecoration: "none" }}>
                <Button variant="contained" size="large">
                  Browse Courses
                </Button>
              </Link>
            </Paper>
          ) : (
            <Grid container spacing={4}>
              {courses.map((item) => {
                const course = item.courseId;
                const courseId = course?._id;
                const progress = progressDrafts[courseId] ?? item.progress ?? 0;

                return (
                  <Grid key={courseId} size={{ xs: 12, md: 6 }}>
                    <Card sx={{ height: "100%", borderRadius: 4 }}>
                      <CardMedia
                        component="img"
                        image={
                          course?.thumbnailUrl ||
                          "https://via.placeholder.com/640x360?text=Course"
                        }
                        alt={course?.name || "Course"}
                        sx={{ height: { xs: 220, sm: 240 } }}
                      />
                      <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                        <Stack spacing={2.5}>
                          <Box>
                            <Typography
                              variant="h5"
                              sx={{ fontWeight: 800, mb: 1 }}
                            >
                              {course?.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {course?.author?.name
                                ? `Instructor: ${course.author.name}`
                                : "Instructor information unavailable"}
                            </Typography>
                          </Box>

                          <Box>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              sx={{ mb: 1 }}
                            >
                              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                Progress
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {progress}%
                              </Typography>
                            </Stack>
                            <LinearProgress
                              variant="determinate"
                              value={progress}
                              sx={{ height: 10, borderRadius: 999 }}
                            />
                          </Box>

                          <Box>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              Update Progress
                            </Typography>
                            <Stack
                              direction={{ xs: "column", sm: "row" }}
                              spacing={1.5}
                              alignItems={{ xs: "stretch", sm: "center" }}
                            >
                              <Select
                                fullWidth
                                size="small"
                                value={progress}
                                onChange={(event) =>
                                  handleProgressChange(courseId, event.target.value)
                                }
                              >
                                {PROGRESS_OPTIONS.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}%
                                  </MenuItem>
                                ))}
                              </Select>
                              <Button
                                variant="outlined"
                                onClick={() => handleSaveProgress(courseId)}
                                disabled={updatingId === courseId}
                                sx={{ minWidth: { sm: 140 } }}
                              >
                                {updatingId === courseId ? (
                                  <CircularProgress size={22} color="inherit" />
                                ) : (
                                  "Save Progress"
                                )}
                              </Button>
                            </Stack>
                          </Box>

                          <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={1.5}
                          >
                            <Link
                              href={`/courses/${courseId}`}
                              style={{ textDecoration: "none", width: "100%" }}
                            >
                              <Button fullWidth variant="contained">
                                Continue Course
                              </Button>
                            </Link>
                            <Button
                              fullWidth
                              variant="outlined"
                              color="error"
                              onClick={() => handleUnenroll(courseId)}
                              disabled={unenrollingId === courseId}
                            >
                              {unenrollingId === courseId ? (
                                <CircularProgress size={22} color="inherit" />
                              ) : (
                                "Unenroll"
                              )}
                            </Button>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Container>
      </Box>
    </ProtectedRoute>
  );
};

export default MyLearningPage;
