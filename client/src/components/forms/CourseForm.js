"use client";

import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
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
  IconButton,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axiosInstance from '@/lib/axios/axiosInstance';
import ImageUploadInput from './inputs/ImageUploadInput';

const courseSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.preprocess((val) => Number(val), z.number().min(0, 'Price must be at least 0')),
  thumbnailUrl: z.string().url('Thumbnail must be a valid URL'),
  classes: z.array(z.object({
    name: z.string().min(3, 'Class name is required'),
    videoUrl: z.string().url('Video URL must be a valid URL'),
    thumbnailUrl: z.string().url('Thumbnail URL must be a valid URL'),
    des: z.string().min(10, 'Description is required'),
  })).min(1, 'At least one class is required'),
});

const CourseForm = ({ initialData, isEdit = false }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      price: 0,
      thumbnailUrl: '',
      classes: [{ name: '', videoUrl: '', thumbnailUrl: '', des: '' }],
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "classes"
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      const endpoint = isEdit ? `/courses/${initialData._id}` : '/courses';
      const method = isEdit ? 'patch' : 'post';
      
      const response = await axiosInstance[method](endpoint, data);
      
      if (response.data.success) {
        setSuccess(isEdit ? 'Course updated successfully!' : 'Course created successfully!');
        setTimeout(() => {
          router.push('/courses');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}
      
      <Stack spacing={4}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>Basic Information</Typography>
        
        <TextField
          {...register('name')}
          label="Course Name"
          placeholder="e.g. Masterclass in Mindfulness"
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
        />

        <TextField
          {...register('description')}
          label="Description"
          multiline
          rows={4}
          placeholder="Detailed description of the course..."
          error={!!errors.description}
          helperText={errors.description?.message}
          fullWidth
        />

        <TextField
          {...register('price')}
          label="Price (Enter 0 if free)"
          type="number"
          error={!!errors.price}
          helperText={errors.price?.message}
          fullWidth
        />

        <Controller
          name="thumbnailUrl"
          control={control}
          render={({ field }) => (
            <ImageUploadInput
              label="Course Thumbnail"
              value={field.value}
              onChange={field.onChange}
              error={errors.thumbnailUrl}
            />
          )}
        />

        <Divider />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>Course Content</Typography>
          <Button 
            startIcon={<AddIcon />} 
            variant="contained" 
            onClick={() => append({ name: '', videoUrl: '', thumbnailUrl: '', des: '' })}
            sx={{ borderRadius: 2 }}
          >
            Add Class
          </Button>
        </Box>

        {fields.map((field, index) => (
          <Card key={field.id} variant="outlined" sx={{ position: 'relative', overflow: 'visible', borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <IconButton 
              size="small" 
              color="error" 
              onClick={() => remove(index)}
              sx={{ position: 'absolute', top: -12, right: -12, bgcolor: 'background.paper', boxShadow: 2, border: '1px solid', borderColor: 'divider', '&:hover': { bgcolor: 'error.main', color: 'white' } }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={3}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.secondary' }}>Class #{index + 1}</Typography>
                
                <TextField
                  {...register(`classes.${index}.name`)}
                  label="Class Name"
                  error={!!errors.classes?.[index]?.name}
                  helperText={errors.classes?.[index]?.name?.message}
                  fullWidth
                />

                <TextField
                  {...register(`classes.${index}.videoUrl`)}
                  label="Video URL (YouTube/Vimeo/Direct)"
                  error={!!errors.classes?.[index]?.videoUrl}
                  helperText={errors.classes?.[index]?.videoUrl?.message}
                  fullWidth
                />

                <Controller
                  name={`classes.${index}.thumbnailUrl`}
                  control={control}
                  render={({ field }) => (
                    <ImageUploadInput
                      label="Class Thumbnail"
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.classes?.[index]?.thumbnailUrl}
                    />
                  )}
                />

                <TextField
                  {...register(`classes.${index}.des`)}
                  label="Class Description"
                  multiline
                  rows={3}
                  error={!!errors.classes?.[index]?.des}
                  helperText={errors.classes?.[index]?.des?.message}
                  fullWidth
                />
              </Stack>
            </CardContent>
          </Card>
        ))}

        {errors.classes?.message && <Alert severity="error">{errors.classes.message}</Alert>}

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ py: 2, mt: 4, borderRadius: 2, fontWeight: 700, fontSize: '1rem' }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : (isEdit ? 'Update Course' : 'Publish Course')}
        </Button>
      </Stack>
    </Box>
  );
};

export default CourseForm;
