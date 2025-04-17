import axios from "axios";

// Create axios instance with base URL
const instance = axios.create({
  // baseURL: "https://cricscorer-api-1.onrender.com/api/",
  // // baseURL: "http://localhost:8081/api/",
  withCredentials: true,
});

// Add an interceptor to include the token in requests
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for handling token expiration
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is expired or invalid
      // localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
