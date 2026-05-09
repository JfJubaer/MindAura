"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
  Pagination,
  Stack,
} from "@mui/material";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import axiosInstance from "@/lib/axios/axiosInstance";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const AdminPanel = () => {
  const [tabValue, setTabValue] = useState(0);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUnapprovedCourses = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.get(`/courses/unapproved?page=${page}&limit=10`);
      if (response.data.success) {
        setCourses(response.data.data);
        setTotalPages(response.data.totalPages);
      }
    } catch (err) {
      setError("Failed to fetch courses. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (tabValue === 1) {
      fetchUnapprovedCourses();
    }
  }, [tabValue, fetchUnapprovedCourses]);

  const handleTabChange = (_event, newValue) => {
    setTabValue(newValue);
    setPage(1); // Reset to first page when changing tabs
  };

  const handleApprove = async (courseId) => {
    try {
      const response = await axiosInstance.patch(`/courses/approve/${courseId}`);
      if (response.data.success) {
        // Remove from list or refresh
        setCourses((prev) => prev.filter((c) => c._id !== courseId));
      }
    } catch {
      alert("Failed to approve course");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <Box sx={{ py: { xs: 6, md: 6 }, bgcolor: "background.default", minHeight: "100vh" }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, fontSize: { xs: "2rem", md: "3rem" } }}>
            Admin Panel
          </Typography>

          <Paper sx={{ mb: 4, borderRadius: 2 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              <Tab label="Teacher Requests" sx={{ py: 2, fontWeight: 700 }} />
              <Tab label="Course Approval" sx={{ py: 2, fontWeight: 700 }} />
            </Tabs>
          </Paper>

          {tabValue === 0 && (
            <Paper sx={{ p: 6, textAlign: "center", borderRadius: 4 }}>
              <Typography variant="h5" color="text.secondary">
                Teacher Requests Module
              </Typography>
              <Typography variant="body1" color="text.disabled" sx={{ mt: 1 }}>
                Upcoming Feature
              </Typography>
            </Paper>
          )}

          {tabValue === 1 && (
            <Stack spacing={3}>
              {error && <Alert severity="error">{error}</Alert>}

              <TableContainer component={Paper} sx={{ borderRadius: 4, overflowX: "auto", border: "1px solid", borderColor: "divider" }} elevation={0}>
                <Table>
                  <TableHead sx={{ bgcolor: "action.hover" }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>Course Name</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Author</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                          <CircularProgress />
                        </TableCell>
                      </TableRow>
                    ) : courses.length > 0 ? (
                      courses.map((course) => (
                        <TableRow key={course._id} sx={{ "&:hover": { bgcolor: "action.hover" } }}>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <Avatar src={course.thumbnailUrl} variant="rounded" sx={{ width: 50, height: 30 }} />
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>{course.name}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Avatar src={course.author?.profilePic} sx={{ width: 24, height: 24 }} />
                              <Typography variant="body2">{course.author?.name}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                              {course.price === 0 ? "Free" : `$${course.price}`}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip label="Pending" size="small" color="warning" />
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              startIcon={<CheckCircleIcon />}
                              onClick={() => handleApprove(course._id)}
                              sx={{ borderRadius: 2 }}
                            >
                              Approve
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                          <Typography color="text.secondary">No pending courses found.</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_event, v) => setPage(v)}
                    color="primary"
                    shape="rounded"
                  />
                </Box>
              )}
            </Stack>
          )}
        </Container>
      </Box>
    </ProtectedRoute>
  );
};

export default AdminPanel;
