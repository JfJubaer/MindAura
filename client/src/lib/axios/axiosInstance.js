import axios from "axios";
import { API_URL } from "../config";

const axiosInstance = axios.create({
  baseURL: API_URL,
  // timeout: 5000, // Timeout after 5 seconds
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
