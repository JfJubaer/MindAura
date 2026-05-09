/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import EmailIcon from "@mui/icons-material/Email";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationValidationSchema } from "@/lib/helpers/validationSchems";
import { blueColor } from "@/lib/data/commonData";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios/axiosInstance";
import { useDispatch } from "react-redux";
import { setRegisterData } from "@/redux/features/registerSlice";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationValidationSchema),
    mode: "onBlur",
  });

  // console.log(errors);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePhoneChange = (e) => {
    // Remove all non-digit characters (including spaces)
    const cleanedValue = e.target.value.replace(/\D/g, '');
    const limitedValue = cleanedValue.slice(0, 11);
    setValue("phone", limitedValue, { shouldValidate: true });
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const generateSessionId = () => {
    return Math.floor(
      100000000000000 + Math.random() * 900000000000000
    ).toString();
  };

  const onSubmit = async (data) => {
    setLoading(true); // <-- start loading
    setErrorMessage("");
    const sessionId = generateSessionId();
    const requestBody = {
      name: data.name,
      phone: data.phone.slice(-11),
      email: data.email,
      password: data.password,
      unique_session_id: sessionId,
    };
    console.log("register", requestBody);

    try {
      const response = await axiosInstance.post("/users", requestBody);
      console.log("Response Data:", response.data);
      if (response.data.success) {
        dispatch(
          setRegisterData({
            name: data.name,
            phone: data.phone.slice(-11),
            email: data.email,
            password: data.password,
            unique_session_id: sessionId,
          })
        );
        console.log("OTP stored, redirecting...");
        router.push("/verify-phone");
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      const message = error.response
        ? error.response.data.message
        : error.message;
      setErrorMessage(message);
    } finally {
      setLoading(false); // <-- end loading
    }
  };
  return (
    <section className="container">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 500, // Width of the form container
            padding: 4,
            borderRadius: 2,
            backgroundColor: "#fff", // Form background
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            fontWeight={500}
            color={blueColor}
          >
            Welcome!
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            align="center"
            fontWeight={500}
            mb={2}
            color={errorMessage ? "red" : blueColor} // Show red if error exists
          >
            {errorMessage ? errorMessage : "Create a Spider Account"}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                id="name"
                {...register("name")}
                label="Full Name"
                variant="outlined"
                margin="normal"
                error={errors?.name}
                helperText={errors?.name?.message}
                placeholder="Enter your name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        <PersonIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                id="phone"
                {...register("phone")}
                label="Phone"
                variant="outlined"
                margin="normal"
                onChange={handlePhoneChange}
                error={errors?.phone}
                helperText={errors?.phone?.message}
                placeholder="Enter your phone number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        <PhoneInTalkIcon />
                      </IconButton>
                      +88
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                id="email"
                {...register("email")}
                label="Email"
                variant="outlined"
                margin="normal"
                error={errors?.email}
                helperText={errors?.email?.message}
                placeholder="Enter your email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        <EmailIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="caption" color="text.secondary">
                        Optional
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                id="password"
                type={showPassword ? "text" : "password"} // ✅ Correct toggle logic
                {...register("password")}
                label="Password"
                variant="outlined"
                margin="normal"
                error={errors?.password}
                helperText={errors?.password?.message}
                placeholder="Enter password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EnhancedEncryptionIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword} // ✅ Correct function
                        onMouseDown={handleMouseDownPassword} // Prevents focus loss
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                id="confirmPassword"
                type={showPassword ? "text" : "password"} // ✅ Correct toggle logic
                {...register("confirmPassword")}
                label="Confirm Password"
                variant="outlined"
                margin="normal"
                error={errors?.confirmPassword}
                helperText={errors?.confirmPassword?.message}
                placeholder="Confirm your password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpenIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword} // ✅ Correct function
                        onMouseDown={handleMouseDownPassword} // Prevents focus loss
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  marginTop: 2,
                  backgroundColor: blueColor,
                  borderRadius: "20px",
                  padding: "5px 30px",
                }}
                disabled={loading}
              >
                {loading ? "Processing..." : "Register"}
              </Button>
              <Divider />
              <Link href={"/login"}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    marginTop: 2,
                    borderRadius: "20px",
                    padding: "5px 30px",
                  }}
                >
                  Already an User? Login
                </Button>
              </Link>

              <Link href={"/"}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    marginTop: 2,
                    backgroundColor: blueColor,
                    borderRadius: "20px",
                    padding: "5px 30px",
                  }}
                >
                  Use Anonymously
                </Button>
              </Link>
            </Box>
          </form>
        </Box>
      </Box>
    </section>
  );
}
