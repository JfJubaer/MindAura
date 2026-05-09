"use client";

import React from 'react';
import { Box, Container, Grid2 as Grid, Typography, Card, CardMedia, CardContent, Button, Chip, Stack, Avatar, Divider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';

const FeaturedCourses = () => {
  const courses = [
    {
      title: 'Mindfulness Foundations',
      instructor: 'Dr. Amy Miller',
      price: '$49.99',
      rating: 4.8,
      students: '12K',
      duration: '8h 30m',
      category: 'Psychology',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'CBT for Anxiety Management',
      instructor: 'Prof. James Wilson',
      price: '$79.99',
      rating: 4.9,
      students: '8K',
      duration: '12h 45m',
      category: 'Therapy',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040&auto=format&fit=crop'
    },
    {
      title: 'Emotional Intelligence at Work',
      instructor: 'Sarah Jenkins',
      price: '$59.99',
      rating: 4.7,
      students: '15K',
      duration: '6h 15m',
      category: 'Soft Skills',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  return (
    <Box sx={{ py: 10, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 6 }}>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 1 }}>Featured Courses</Typography>
            <Typography variant="h6" color="text.secondary">Hand-picked curriculum to start your journey.</Typography>
          </Box>
          <Button variant="text" size="large" sx={{ fontWeight: 700 }}>View All Courses</Button>
        </Box>

        <Grid container spacing={4}>
          {courses.map((course, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card sx={{ height: '100%', borderRadius: 4 }}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={course.image}
                    alt={course.title}
                  />
                  <Chip 
                    label={course.category} 
                    size="small" 
                    sx={{ position: 'absolute', top: 16, left: 16, bgcolor: 'white', fontWeight: 600 }} 
                  />
                </Box>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <StarIcon sx={{ color: '#fbbf24', fontSize: '1.2rem' }} />
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>{course.rating}</Typography>
                      <Typography variant="caption" color="text.secondary">({course.students})</Typography>
                    </Stack>
                    <Typography variant="h6" color="primary.main" sx={{ fontWeight: 800 }}>{course.price}</Typography>
                  </Stack>
                  
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                    {course.title}
                  </Typography>
                  
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>{course.instructor.charAt(0)}</Avatar>
                    <Typography variant="caption" color="text.secondary">By {course.instructor}</Typography>
                  </Stack>
                  
                  <Divider sx={{ mb: 2 }} />
                  
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={0.5} alignItems="center" color="text.secondary">
                      <AccessTimeIcon sx={{ fontSize: '1rem' }} />
                      <Typography variant="caption">{course.duration}</Typography>
                    </Stack>
                    <Button variant="outlined" size="small">Enroll Now</Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedCourses;
