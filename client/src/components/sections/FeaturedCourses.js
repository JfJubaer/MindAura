"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid2 as Grid,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";
import axiosInstance from "@/lib/axios/axiosInstance";
import CourseCard from "../cards/CourseCard";
import CourseSkeleton from "../skeletons/CourseSkeleton";

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const response = await axiosInstance.get(
          "/courses?limit=6&sortBy=createdAt",
        );
        if (response.data.success) {
          setCourses(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching featured courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCourses();
  }, []);

  return (
    <Box sx={{ py: 10, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mb: 6,
          }}
        >
          <Box>
            <Typography
              variant="h2"
              sx={{ fontWeight: 800, mb: 1 }}
            >
              Featured Courses
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
            >
              Hand-picked curriculum to start your journey.
            </Typography>
          </Box>
          <Link
            href="/courses"
            passHref
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="text"
              size="large"
              sx={{ fontWeight: 700 }}
            >
              View All Courses
            </Button>
          </Link>
        </Box>

        <Grid
          container
          spacing={4}
        >
          {loading
            ? Array.from(new Array(3)).map((_, index) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4 }}
                  key={index}
                >
                  <CourseSkeleton />
                </Grid>
              ))
            : courses.map((course) => (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4 }}
                  key={course._id}
                >
                  <CourseCard course={course} />
                </Grid>
              ))}
        </Grid>

        {!loading && courses.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography
              variant="h6"
              color="text.secondary"
            >
              No courses available at the moment.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default FeaturedCourses;
