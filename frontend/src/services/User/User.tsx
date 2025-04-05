import axiosInstance from "@/lib/config/ApiConfig/ApiConfig";

import { User } from "./types";

export const fetchMe = async (): Promise<User | null> =>
  (
    await axiosInstance.get("/me", {
      headers: { "Content-Type": "application/json" },
    })
  ).data;

export const fetchLogout = async (): Promise<void> =>
  await axiosInstance.post("/logout", null, {
    headers: { "Content-Type": "application/json" },
  });
