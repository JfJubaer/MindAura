"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Pagination,
  Alert,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CourseCard from "@/components/cards/CourseCard";
import CourseSkeleton from "@/components/skeletons/CourseSkeleton";
import axiosInstance from "@/lib/axios/axiosInstance";
import { useSearchParams } from "next/navigation";

const CoursesPage = () => {
  const searchParams = useSearchParams();
  const instructorIdFromUrl = searchParams.get("instructor");

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [instructorId, setInstructorId] = useState(instructorIdFromUrl || "");

  const categories = [
    "All",
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
    "Data Science",
    "Artificial Intelligence",
    "Cybersecurity",
    "Other",
  ];

  const fetchCourses = useCallback(async (isFilterChange = false) => {
    setLoading(true);
    setError("");
    try {
      const currentPage = isFilterChange ? 1 : page;
      const params = new URLSearchParams({
        page: currentPage,
        limit: 12,
        searchTerm,
        category,
        minPrice,
        maxPrice,
        sortBy,
        instructor: instructorId,
      });

      const response = await axiosInstance.get(`/courses?${params.toString()}`);
      if (response.data.success) {
        setCourses(response.data.data);
        setTotalPages(response.data.totalPages);
        if (isFilterChange) setPage(1);
      }
    } catch (err) {
      setError("Failed to load courses. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, category, minPrice, maxPrice, sortBy, instructorId]);

  // Initial fetch and fetch on page change
  useEffect(() => {
    fetchCourses(false);
  }, [page]);

  // Handle filter changes with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (page !== 1) {
        fetchCourses(true); // This will setPage(1) inside
      } else {
        fetchCourses(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, category, minPrice, maxPrice, sortBy, instructorId]);

  const handlePageChange = (_event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box sx={{ py: { xs: 8, md: 8 }, bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              mb: 2,
              fontSize: { xs: "2rem", md: "3.75rem" },
              background: "linear-gradient(45deg, #2D3E50 30%, #3F51B5 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Explore Courses
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Discover hands-on courses in software, design, data, AI, and other
            modern professional skills.
          </Typography>
        </Box>

        {/* Filter Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            mb: 6,
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Grid
            container
            spacing={3}
            alignItems="center"
          >
            {/* Search */}
            <Grid
              item
              xs={12}
              md={3}
            >
              <TextField
                fullWidth
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ color: "text.disabled", mr: 1 }} />
                  ),
                }}
                size="small"
              />
            </Grid>

            {/* Category */}
            <Grid
              item
              xs={12}
              sm={6}
              md={2}
            >
              <FormControl
                fullWidth
                size="small"
              >
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem
                      key={cat}
                      value={cat}
                    >
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Price Range */}
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TextField
                  placeholder="Min"
                  type="number"
                  size="small"
                  fullWidth
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <Typography color="text.disabled">-</Typography>
                <TextField
                  placeholder="Max"
                  type="number"
                  size="small"
                  fullWidth
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </Box>
            </Grid>

            {/* Sorting */}
            <Grid
              item
              xs={12}
              sm={6}
              md={2}
            >
              <FormControl
                fullWidth
                size="small"
              >
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="rating">Top Rated</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Clear Filters */}
            <Grid
              item
              xs={12}
              md={2}
            >
              <Button
                fullWidth
                variant="text"
                color="secondary"
                onClick={() => {
                  setSearchTerm("");
                  setCategory("All");
                  setMinPrice("");
                  setMaxPrice("");
                  setSortBy("newest");
                  setInstructorId("");
                }}
                sx={{ fontWeight: 700 }}
              >
                Clear All
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 4, borderRadius: 2 }}
          >
            {error}
          </Alert>
        )}

        <Grid
          container
          spacing={4}
        >
          {loading ? (
            // Show 8 skeletons while loading
            Array.from(new Array(8)).map((_, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={index}
              >
                <CourseSkeleton />
              </Grid>
            ))
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={course._id}
              >
                <CourseCard course={course} />
              </Grid>
            ))
          ) : (
            <Grid
              item
              xs={12}
            >
              <Box sx={{ py: 10, textAlign: "center" }}>
                <Typography
                  variant="h5"
                  color="text.secondary"
                >
                  No courses found matching your criteria.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        {!loading && totalPages > 1 && (
          <Box sx={{ mt: 8, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontWeight: 700,
                  borderRadius: 2,
                },
                "& ul": {
                  flexWrap: "wrap",
                  justifyContent: "center",
                },
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CoursesPage;
