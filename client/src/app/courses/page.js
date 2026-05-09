"use client";

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Pagination, 
  Stack, 
  Alert 
} from '@mui/material';
import CourseCard from '@/components/cards/CourseCard';
import CourseSkeleton from '@/components/skeletons/CourseSkeleton';
import axiosInstance from '@/lib/axios/axiosInstance';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.get(`/courses?page=${page}&limit=12`);
      if (response.data.success) {
        setCourses(response.data.data);
        setTotalPages(response.data.totalPages);
      }
    } catch (err) {
      setError('Failed to load courses. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 900, 
              mb: 2, 
              background: 'linear-gradient(45deg, #2D3E50 30%, #3F51B5 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Explore Courses
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Discover our wide range of professional mental health and personal development courses.
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>{error}</Alert>}

        <Grid container spacing={4}>
          {loading ? (
            // Show 8 skeletons while loading
            Array.from(new Array(8)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <CourseSkeleton />
              </Grid>
            ))
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={course._id}>
                <CourseCard course={course} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box sx={{ py: 10, textAlign: 'center' }}>
                <Typography variant="h5" color="text.secondary">No courses found matching your criteria.</Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        {!loading && totalPages > 1 && (
          <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
              size="large"
              shape="rounded"
              sx={{
                '& .MuiPaginationItem-root': {
                  fontWeight: 700,
                  borderRadius: 2
                }
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CoursesPage;
