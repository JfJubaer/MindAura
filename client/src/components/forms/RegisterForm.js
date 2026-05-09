"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
  Link as MuiLink,
  Stack,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/config";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(11, "Phone number must be at least 11 digits"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${API_URL}/users/sign-up`, {
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password,
      });

      if (response.data.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 1 }}
    >
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
        >
          {success}
        </Alert>
      )}

      <Stack spacing={2}>
        <TextField
          {...register("name")}
          label="Full Name"
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          {...register("phone")}
          label="Phone Number"
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />

        <TextField
          {...register("email")}
          label="Email Address"
          type="email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          {...register("password")}
          label="Password"
          type={showPassword ? "text" : "password"}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          {...register("confirmPassword")}
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
      </Stack>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading}
        sx={{ mt: 4, mb: 2, py: 1.5 }}
      >
        {loading ? (
          <CircularProgress
            size={24}
            color="inherit"
          />
        ) : (
          "Create Account"
        )}
      </Button>

      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography variant="body2">
          Already have an account?{" "}
          <Link
            href="/login"
            passHref
            legacyBehavior
          >
            <MuiLink sx={{ fontWeight: 600, cursor: "pointer" }}>
              Login Instead
            </MuiLink>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterForm;
