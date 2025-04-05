import axiosInstance from "@/lib/config/ApiConfig/ApiConfig";

import { AxiosError } from "axios";
import { showErrorNotification } from "@/lib/helpers/notification";
import { User } from "./types";
import { baseApi } from "../BaseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<User, void>({
      query: () => "/me",
    }),
  }),
});

export const { useMeQuery: useMe } = userApi;

export const meFetch = async (): Promise<User | null> => {
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
