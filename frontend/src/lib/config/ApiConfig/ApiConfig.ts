import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      axiosInstance.get("/users/refresh_token");
    }
    return error;
  }
);

export default axiosInstance;
