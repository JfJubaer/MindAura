"use client";

import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import RegisterForm from '@/components/forms/RegisterForm';

export default function RegisterPage() {
  return (
    <Box 
      sx={{ 
        minHeight: 'calc(100vh - 80px)', 
        display: 'flex', 
        alignItems: 'center', 
        bgcolor: 'grey.50',
        py: 8
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={4} 
          sx={{ 
            p: { xs: 4, md: 6 }, 
            borderRadius: 4,
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: 'primary.main' }}>
            Join Wisdora
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Start your journey with thousands of other learners today.
          </Typography>
          
          <RegisterForm />
        </Paper>
      </Container>
    </Box>
  );
}
