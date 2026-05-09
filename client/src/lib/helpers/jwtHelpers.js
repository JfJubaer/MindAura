import { jwtDecode } from "jwt-decode"; // Use named import

export const decodeJWT = (token) => {
  try {
    return jwtDecode(token); // Call the function correctly
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};