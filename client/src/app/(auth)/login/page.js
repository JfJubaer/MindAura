"use client";

import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {
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
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Continue your journey to mindfulness and growth.
          </Typography>
          
          <LoginForm />
        </Paper>
      </Container>
    </Box>
  );
}
