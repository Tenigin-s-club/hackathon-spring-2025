import axiosInstance from "@/lib/config/ApiConfig/ApiConfig";

import { AxiosError } from "axios";
import { showErrorNotification } from "@/lib/helpers/notification";
import { User } from "./types";

export const fetchMe = async (): Promise<User | null> => {
  try {
    const res = await axiosInstance.get("/me", {
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return null;
  }
};
