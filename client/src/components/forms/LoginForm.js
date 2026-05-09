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
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/config";

const loginSchema = z.object({
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${API_URL}/users/login`, data);
      if (response.data.success) {
        // Mocking user data since server returns token.
        // In a real app, we might decode the token or fetch user profile.
        // For now, I'll set a basic user object.
        dispatch(setUser({ name: "User", phone: data.phone }));
        router.push("/");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
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

      <TextField
        {...register("phone")}
        label="Phone Number"
        placeholder="e.g. 01700000000"
        error={!!errors.phone}
        helperText={errors.phone?.message}
        margin="normal"
        autoFocus
      />

      <TextField
        {...register("password")}
        label="Password"
        type={showPassword ? "text" : "password"}
        error={!!errors.password}
        helperText={errors.password?.message}
        margin="normal"
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

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading}
        sx={{ mt: 3, mb: 2, py: 1.5 }}
      >
        {loading ? (
          <CircularProgress
            size={24}
            color="inherit"
          />
        ) : (
          "Login"
        )}
      </Button>

      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography variant="body2">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            passHref
            legacyBehavior
          >
            <MuiLink sx={{ fontWeight: 600, cursor: "pointer" }}>
              Register Now
            </MuiLink>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
