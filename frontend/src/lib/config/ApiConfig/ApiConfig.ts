import { urls } from "@/lib/constants/urls";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: urls.api,
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
