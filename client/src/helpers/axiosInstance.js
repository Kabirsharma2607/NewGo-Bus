// Import the Axios library
import axios from "axios";

// Create a customized Axios instance with specific configuration
export const axiosInstance = axios.create({
  // Base URL for making API requests
  baseURL: "http://localhost:5000/",

  // Headers to be included in each request
  headers: {
    // Authorization header with a bearer token obtained from local storage
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
