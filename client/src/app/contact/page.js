"use client";

import React from 'react';
import { Box, Container, Grid2 as Grid, Typography, Paper, Stack } from '@mui/material';
import ContactForm from '@/components/forms/ContactForm';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function ContactPage() {
  return (
    <Box sx={{ py: 10, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 3 }}>Get in Touch</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 6 }}>
              Have questions about our courses or need assistance with your mindfulness journey? We're here to help.
            </Typography>
            
            <Stack spacing={4}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 1.5, borderRadius: 2, display: 'flex' }}>
                  <EmailIcon />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Email Us</Typography>
                  <Typography variant="body2" color="text.secondary">support@mindaura.com</Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ bgcolor: 'secondary.main', color: 'white', p: 1.5, borderRadius: 2, display: 'flex' }}>
                  <PhoneIcon />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Call Us</Typography>
                  <Typography variant="body2" color="text.secondary">+1 (555) 000-0000</Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ bgcolor: 'error.main', color: 'white', p: 1.5, borderRadius: 2, display: 'flex' }}>
                  <LocationOnIcon />
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Visit Us</Typography>
                  <Typography variant="body2" color="text.secondary">123 Mindfulness Way, San Francisco, CA</Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={4} sx={{ p: { xs: 4, md: 6 }, borderRadius: 4 }}>
              <ContactForm />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
