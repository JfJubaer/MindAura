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
  Stack,
  MenuItem,
  InputAdornment
} from '@mui/material';
import { useRouter } from 'next/navigation';

const courseSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.string().min(1, 'Category is required'),
  price: z.string().min(1, 'Price is required'),
  duration: z.string().min(1, 'Duration is required'),
});

const CourseForm = ({ initialData, isEdit = false }) => {
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      category: '',
      price: '',
      duration: '',
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    // Mocking a successful submission
    setTimeout(() => {
      setSuccess(isEdit ? 'Course updated successfully!' : 'Course created successfully!');
      setLoading(false);
      setTimeout(() => {
        router.push('/courses');
      }, 2000);
    }, 1500);
  };

  const categories = ['Mindfulness', 'Psychology', 'Therapy', 'Soft Skills', 'Meditation'];

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}
      
      <Stack spacing={3}>
        <TextField
          {...register('title')}
          label="Course Title"
          placeholder="e.g. Introduction to Cognitive Behavioral Therapy"
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        
        <TextField
          {...register('category')}
          select
          label="Category"
          defaultValue={initialData?.category || ''}
          error={!!errors.category}
          helperText={errors.category?.message}
        >
          {categories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <TextField
            {...register('price')}
            label="Price"
            placeholder="0.00"
            error={!!errors.price}
            helperText={errors.price?.message}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            sx={{ flex: 1 }}
          />
          <TextField
            {...register('duration')}
            label="Estimated Duration"
            placeholder="e.g. 10h 30m"
            error={!!errors.duration}
            helperText={errors.duration?.message}
            sx={{ flex: 1 }}
          />
        </Stack>
        
        <TextField
          {...register('description')}
          label="Full Description"
          multiline
          rows={6}
          placeholder="Describe what students will learn..."
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ py: 1.5, mt: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : (isEdit ? 'Update Course' : 'Publish Course')}
        </Button>
      </Stack>
    </Box>
  );
};

export default CourseForm;
