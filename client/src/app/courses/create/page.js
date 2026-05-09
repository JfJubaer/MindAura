"use client";

import React from 'react';
import { Box, Container, Paper, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material';
import CourseForm from '@/components/forms/CourseForm';
import Link from 'next/link';

export default function CreateCoursePage() {
  return (
    <Box sx={{ py: 6, bgcolor: 'grey.50', minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Breadcrumbs sx={{ mb: 4 }}>
          <Link href="/" passHref legacyBehavior>
            <MuiLink underline="hover" color="inherit">Home</MuiLink>
          </Link>
          <Link href="/courses" passHref legacyBehavior>
            <MuiLink underline="hover" color="inherit">Courses</MuiLink>
          </Link>
          <Typography color="text.primary">Create</Typography>
        </Breadcrumbs>

        <Typography variant="h3" sx={{ fontWeight: 800, mb: 4 }}>Create New Course</Typography>
        
        <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, border: '1px solid', borderColor: 'divider', borderRadius: 4 }}>
          <CourseForm />
        </Paper>
      </Container>
    </Box>
  );
}
