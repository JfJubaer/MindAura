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
  Avatar,
  IconButton
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '@/redux/features/authSlice';
import { Controller } from "react-hook-form";
import PhoneInputField from "./inputs/PhoneInputField";

const profileSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(6, 'Phone number is too short'),
  countryCode: z.string(),
  bio: z.string().optional(),
});

const ProfileUpdateForm = () => {
  const user = useSelector((state) => state.auth.user);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Helper to split phone number into country code and rest
  const getPhoneParts = (fullPhone) => {
    if (!fullPhone) return { code: "+880", number: "" };
    
    // Check for common country codes
    const codes = ["+880", "+1", "+44", "+91", "+971", "+966"];
    for (const code of codes) {
      if (fullPhone.startsWith(code)) {
        return { code, number: fullPhone.substring(code.length) };
      }
    }
    // Default if no match (maybe it was stored without code)
    if (fullPhone.startsWith("0")) return { code: "+880", number: fullPhone.substring(1) };
    return { code: "+880", number: fullPhone };
  };

  const phoneParts = getPhoneParts(user?.phone);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: phoneParts.number,
      countryCode: phoneParts.code,
      bio: user?.bio || '',
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    // Combine country code and phone number
    let phoneNumber = data.phone;
    if (phoneNumber.startsWith("0")) {
      phoneNumber = phoneNumber.substring(1);
    }
    const fullPhone = `${data.countryCode}${phoneNumber}`;

    // Mocking a successful update
    setTimeout(() => {
      dispatch(setUser({ ...user, ...data, phone: fullPhone }));
      setSuccess('Profile updated successfully!');
      setLoading(false);
    }, 1500);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar 
            sx={{ width: 100, height: 100, fontSize: '2rem', bgcolor: 'primary.main' }}
          >
            {user?.name?.charAt(0) || 'U'}
          </Avatar>
          <IconButton 
            sx={{ 
              position: 'absolute', 
              bottom: 0, 
              right: 0, 
              bgcolor: 'background.paper',
              boxShadow: 2,
              '&:hover': { bgcolor: 'grey.100' }
            }}
            size="small"
          >
            <PhotoCameraIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary' }}>
          Update profile picture
        </Typography>
      </Box>

      <Stack spacing={3}>
        <TextField
          {...register('name')}
          label="Full Name"
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

        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Controller
              name="countryCode"
              control={control}
              render={({ field: codeField }) => (
                <PhoneInputField
                  {...field}
                  countryCode={codeField.value}
                  onCountryCodeChange={codeField.onChange}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />
          )}
        />
        
        <TextField
          {...register('bio')}
          label="Bio / Headline"
          multiline
          rows={3}
          placeholder="Tell students about your expertise..."
          error={!!errors.bio}
          helperText={errors.bio?.message}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ py: 1.5 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
        </Button>
      </Stack>
    </Box>
  );
};

export default ProfileUpdateForm;
