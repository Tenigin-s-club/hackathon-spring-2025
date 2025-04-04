import { urls } from "@/lib/constants/urls";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Report", "DailyReport"],
  baseQuery: fetchBaseQuery({
    baseUrl: urls.api,

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  refetchOnFocus: true,
  refetchOnReconnect: true,
  keepUnusedDataFor: 5,
  endpoints: () => ({}),
});
