"use client";

import React from 'react';
import { Box, Container, Grid2 as Grid, Typography } from '@mui/material';

const Stats = () => {
  const stats = [
    { label: 'Enrolled Students', value: '150K+' },
    { label: 'Active Courses', value: '450+' },
    { label: 'Expert Instructors', value: '120+' },
    { label: 'Student Satisfaction', value: '98%' }
  ];

  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ textAlign: 'center' }}>
          {stats.map((stat, index) => (
            <Grid size={{ xs: 6, md: 3 }} key={index}>
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 800, 
                  fontSize: { xs: '2rem', md: '3.5rem' },
                  mb: 0.5
                }}
              >
                {stat.value}
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9, fontWeight: 500 }}>
                {stat.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Stats;
