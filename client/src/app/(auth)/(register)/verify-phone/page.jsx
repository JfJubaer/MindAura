/* eslint-disable react/react-in-jsx-scope */
"use client";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpValidationSchema } from "@/lib/helpers/validationSchems";
import { blueColor } from "@/lib/data/commonData";
import CodeIcon from "@mui/icons-material/Code";
import axiosInstance from "@/lib/axios/axiosInstance";
import { setToLocalStorage } from "@/lib/utils/localstorage";
import { useRouter } from "next/navigation";
import { decodeJWT } from "@/lib/helpers/jwtHelpers";
import { setUser } from "@/redux/features/authSlice";
import { useEffect, useState } from "react";
import { setRegisterData } from "@/redux/features/registerSlice";

export default function VerifyPhone() {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // <-- loading state
  const [counter, setCounter] = useState(30);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    setError,
  } = useForm({
    resolver: zodResolver(otpValidationSchema),
    mode: "onBlur",
  });

  const registerData = useSelector((state) => state.register.registerData);
  console.log("registerData in verify phone:", registerData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (counter <= 0) return;
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);

  async function resendOtp() {
    console.log("Resend OTP clicked", registerData);
    let phone = registerData?.phone;
    let unique_session_id = registerData?.unique_session_id;
    let response = await axiosInstance.post("/otp-controller/resend-otp", { phone, unique_session_id });
    let newRegisterData = { ...registerData }
    newRegisterData.otp = response?.data?.body?.otp;
    dispatch(setRegisterData(newRegisterData));
    setCounter(30);
    console.log("Resend OTP response:", response, response.data);
  }

  const onSubmit = async (data) => {
    setLoading(true); // <-- start loading
    if (parseInt(data.otp)) {

      const requestBody = {
        name: registerData?.name,
        phone: registerData?.phone,
        email: registerData?.email,
        password: registerData?.password,
        unique_session_id: registerData?.unique_session_id,
        otp: data.otp,
      };

      try {
        const response = await axiosInstance.post("/users/verify", requestBody);
        if (response.data.success) {
          const token = response?.data?.token;
          const decoded = decodeJWT(token);
          console.log(decoded);
          console.log("Mongo Id:", decoded?.id);
          setToLocalStorage("token", token);
          dispatch(setUser({ userId: decoded?.id }));
          router.push("/");
          console.log("Server Response:", response.data);
        }
      } catch (error) {
        setError(error?.message);
        console.error(
          "Error Sending Data:",
          error.response ? error.response.data : error.message
        );
        if (error.message === "OTP not matched") {
          setError("otp", { type: "manual", message: "OTP not matching" });
        }
      } finally {
        setLoading(false); // <-- end loading
      }
    } else {
      setError("otp", { type: "manual", message: "Please Provide an otp" });
      setLoading(false); // <-- end loading if OTP doesn't match
    }
  };

  return (
    <section className="container">
      <Box
        sx={{
          minHeight: "60vh",
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
            variant="h5"
            gutterBottom
            fontWeight={600}
            color={blueColor}
          >
            Verify Your Phone Number
            {/* {otp && (
            <Typography variant="h6" fontWeight={500} color="red" mb={2}>
              (OTP: {otp})
            </Typography>
          )} */}
          </Typography>

          <Typography
            variant="p"
            gutterBottom
            align="center"
            textAlign={"justify"}
            mb={5}
            fontWeight={300}
          >
            A code has been sent to your phone number. Please check message and
            enter here.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
              spacing={2}
              mt={3}
            >
              <TextField
                fullWidth
                id="otp"
                {...register("otp")}
                label="OTP"
                variant="outlined"
                margin="normal"
                error={touchedFields?.otp && !!errors?.otp}
                helperText={errors?.otp?.message}
                placeholder="Enter otp"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <CodeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: blueColor,
                  borderRadius: "20px",
                  padding: "5px 30px",
                }}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Proceed"}
              </Button>

              <Button
                variant="text"
                onClick={resendOtp}
                disabled={counter > 0}   // <-- disabled during countdown
                sx={{ minWidth: "120px" }}
              >
                {counter > 0 ? `Resend in ${counter}s` : "Resend OTP"}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </section>
  );
}
