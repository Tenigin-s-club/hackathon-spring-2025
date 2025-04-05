import { urls } from "@/lib/constants/urls";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Report", "DailyReport"],
  baseQuery: fetchBaseQuery({
    baseUrl: urls.api,
  }),

  refetchOnFocus: true,
  refetchOnReconnect: true,
  keepUnusedDataFor: 5,
  endpoints: () => ({}),
});
