"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Alert, 
  CircularProgress,
  Stack
} from '@mui/material';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

const ContactForm = () => {
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    // Mocking a successful submission
    setTimeout(() => {
      setSuccess('Your message has been sent successfully! We will get back to you soon.');
      reset();
      setLoading(false);
    }, 1500);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}
      
      <Stack spacing={3}>
        <TextField
          {...register('name')}
          label="Your Name"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        
        <TextField
          {...register('email')}
          label="Email Address"
          type="email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          {...register('subject')}
          label="Subject"
          error={!!errors.subject}
          helperText={errors.subject?.message}
        />
        
        <TextField
          {...register('message')}
          label="Message"
          multiline
          rows={4}
          error={!!errors.message}
          helperText={errors.message?.message}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ py: 1.5 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Message'}
        </Button>
      </Stack>
    </Box>
  );
};

export default ContactForm;
