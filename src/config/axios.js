import axios from "axios";

// Create axios instance with base URL
const instance = axios.create({
  baseURL:
    "http://cricsorer-env.eba-7hdmp3pp.us-east-1.elasticbeanstalk.com/api/",

  // baseURL: "http://localhost:8081/api/",
});

// Add an interceptor to include the token in requests
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for handling token expiration
instance.interceptors.response.use(
  (response) => response,
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
