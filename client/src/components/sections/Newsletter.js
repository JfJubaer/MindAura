"use client";

import React from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Stack } from '@mui/material';

const Newsletter = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Paper 
          elevation={0}
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white', 
            borderRadius: 6, 
            p: { xs: 3, sm: 4, md: 8 },
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative background element */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: { xs: -30, md: -50 }, 
              right: { xs: -30, md: -50 }, 
              width: { xs: 120, md: 200 }, 
              height: { xs: 120, md: 200 }, 
              borderRadius: '50%', 
              bgcolor: 'rgba(255,255,255,0.1)' 
            }} 
          />
          
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: "2rem", md: "3rem" } }}>
            Join the Wisdora Community
          </Typography>
          <Typography variant="h6" sx={{ mb: { xs: 4, md: 6 }, opacity: 0.9, maxWidth: '600px', mx: 'auto', fontSize: { xs: "1rem", md: "1.25rem" } }}>
            Subscribe to get new course launches, learning resources, technology insights, and occasional discounts.
          </Typography>

          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            sx={{ maxWidth: '600px', mx: 'auto' }}
          >
            <TextField 
              placeholder="Enter your email" 
              fullWidth
              sx={{ 
                bgcolor: 'white', 
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { border: 'none' },
                }
              }}
            />
            <Button 
              variant="contained" 
              color="secondary" 
              size="large" 
              fullWidth
              sx={{ px: 4, py: 1.5, fontWeight: 700, width: { xs: "100%", sm: "auto" } }}
            >
              Subscribe Now
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Newsletter;
