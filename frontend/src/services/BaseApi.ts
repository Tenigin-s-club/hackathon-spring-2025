import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Employees"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_API,
  }),

  refetchOnFocus: true,
  refetchOnReconnect: true,
  keepUnusedDataFor: 5,
  endpoints: () => ({}),
});
