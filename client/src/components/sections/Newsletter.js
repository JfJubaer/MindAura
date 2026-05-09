"use client";

import React from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Stack } from '@mui/material';

const Newsletter = () => {
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Paper 
          elevation={0}
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white', 
            borderRadius: 6, 
            p: { xs: 4, md: 8 },
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative background element */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: -50, 
              right: -50, 
              width: 200, 
              height: 200, 
              borderRadius: '50%', 
              bgcolor: 'rgba(255,255,255,0.1)' 
            }} 
          />
          
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
            Join the Wisdora Community
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, opacity: 0.9, maxWidth: '600px', mx: 'auto' }}>
            Subscribe to our newsletter for weekly mindfulness tips, course discounts, and expert insights.
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
              sx={{ px: 4, py: 1.5, fontWeight: 700 }}
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
