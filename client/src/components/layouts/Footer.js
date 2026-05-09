"use client";

import React from 'react';
import Link from 'next/link';
import { Box, Container, Grid2 as Grid, Typography, Divider, IconButton, Stack } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.50', pt: 8, pb: 4, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main', mb: 2 }}>
              Wisdora
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 300 }}>
              Empowering your mind through specialized learning. The world's leading platform for mental wellbeing and mindfulness education.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" color="primary"><TwitterIcon fontSize="small" /></IconButton>
              <IconButton size="small" color="primary"><InstagramIcon fontSize="small" /></IconButton>
              <IconButton size="small" color="primary"><LinkedInIcon fontSize="small" /></IconButton>
              <IconButton size="small" color="primary"><GitHubIcon fontSize="small" /></IconButton>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Platform</Typography>
            <Stack spacing={1}>
              <Link href="/courses" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>All Courses</Typography>
              </Link>
              <Link href="/instructors" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>Instructors</Typography>
              </Link>
              <Link href="/pricing" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>Pricing</Typography>
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Company</Typography>
            <Stack spacing={1}>
              <Link href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>About Us</Typography>
              </Link>
              <Link href="/blog" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>Blog</Typography>
              </Link>
              <Link href="/careers" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>Careers</Typography>
              </Link>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Contact Us</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Email: support@mindaura.com
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Phone: +1 (555) 000-0000
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Address: 123 Mindfulness Way, San Francisco, CA
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="caption" color="text.secondary">
            &copy; {new Date().getFullYear()} Wisdora. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link href="/privacy" style={{ textDecoration: 'none' }}>
              <Typography variant="caption" color="text.secondary">Privacy Policy</Typography>
            </Link>
            <Link href="/terms" style={{ textDecoration: 'none' }}>
              <Typography variant="caption" color="text.secondary">Terms of Service</Typography>
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
