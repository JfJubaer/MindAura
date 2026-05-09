/* eslint-disable react/react-in-jsx-scope */
"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "@/lib/helpers/validationSchems";
import { blueColor } from "@/lib/data/commonData";
import Link from "next/link";
import axiosInstance from "@/lib/axios/axiosInstance";
import { decodeJWT } from "@/lib/helpers/jwtHelpers";
import { setToLocalStorage } from "@/lib/utils/localstorage";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/features/authSlice";
import { setsellerProfileData } from "@/redux/features/sellerProfileSlice";
import { setSeller } from "@/redux/features/sellerSlice";
import { LocalCart } from "@/lib/classes/localCart";
import { fetchCartList, fetchLocalCartList } from "@/lib/helpers/CartHelper";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const localCart = useSelector((state) => state.localCart.localCart);
  const [loading, setLoading] = useState(false); // <-- loading state
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginValidationSchema),
    mode: "onBlur",
  });

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

  const [apiError, setApiError] = useState("");

  const onSubmit = async (data) => {
    setLoading(true); // <-- start loading
    try {
      setApiError("");
      const response = await axiosInstance.post("/users/login", data);

      if (response.data.success) {
        const token = response?.data?.token;
        const decoded = decodeJWT(token);
        setToLocalStorage("token", token);
        dispatch(setUser({ userId: decoded?.id }));
        console.log("set user succesful",decoded?.id)
        axiosInstance.get(`/sellers/seller/user/${decoded?.id}`).then((res) => {
          console.log("Seller Login Response:", res.data);
          if (response.data.success) {
            console.log("Seller Data on Login:", res?.data?.body?.seller);
            dispatch(
              setsellerProfileData(res?.data?.body?.seller?.sellerProfile)
            );
            dispatch(setSeller(res?.data?.body?.seller));
          }
        });
        if(localCart?.length && decoded?.id){
          LocalCart.saveCart(localCart)
          await LocalCart.syncLocalCartToServer(decoded?.id)
          fetchLocalCartList(dispatch)
          fetchCartList(decoded?.id,dispatch)
        }
        router.push("/");
      } else {
        setApiError("Invalid phone number or password");
      }
    } catch (error) {
      console.log("error on login",error)
      setApiError(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false); // <-- end loading
    }
  };

  return (
    <section className="container">
      <Box
        sx={{
          paddingTop: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            width: 500,
            padding: 4,
            borderRadius: 2,
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            fontWeight={600}
            color={blueColor}
            py={3}
            sx={{

              marginBottom: "0",

            }}
          >
            Welcome Back!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#555",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            Login to your Buyer Account
          </Typography>


          {apiError && (
            <>
              <Typography
                color="error"
                variant="body2"
              >
                {apiError}
              </Typography>
              <br />
            </>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
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
                id="password"
                type={showPassword ? "text" : "password"}
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
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        <EnhancedEncryptionIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Typography
              variant="body2"
              sx={{ mt: 2 }}
            >
              <Link
                href="/forgot-password"
                style={{
                  color: "#1976d2",
                }}
              >
                Forgot password?
              </Link>
            </Typography>
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
                disabled={loading} // <-- disable while loading
              >
                {loading ? "Logging in..." : "Login"}{" "}
                {/* <-- show loading text */}
              </Button>
              <Divider />
              <Link href={"/register"}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    marginTop: 2,
                    borderRadius: "20px",
                    padding: "5px 30px",
                  }}
                >
                  New Here? Sign Up
                </Button>
              </Link>

              <Link href={"/"}>
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
                >
                  Use Anonymously
                </Button>
              </Link>
            </Box>
          </form>
        </Card>
      </Box>
    </section>
  );
}
