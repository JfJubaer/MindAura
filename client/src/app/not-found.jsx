"use client";

import React from 'react';
import { Box, Button, Typography, Container, Stack } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        py: 10
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mb: 6, opacity: 0.9 }}>
          <Image
            src="/not_found.svg"
            width={400}
            height={300}
            alt="Page not found"
            style={{ maxWidth: '100%', height: 'auto' }}
            priority
          />
        </Box>

        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
          Lost in Space?
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ mb: 6, fontWeight: 400 }}>
          Oops! The page you're looking for has vanished into thin air. Let's get you back on track with Wisdora.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5 }}
            onClick={() => router.push('/')}
          >
            Back to Home
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ px: 4, py: 1.5 }}
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
