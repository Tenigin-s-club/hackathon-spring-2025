import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["Employees", "Meetings"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_API,
    credentials: "include",
    prepareHeaders(headers) {
      headers.set("credentials", "include");
      return headers;
    },
  }),

  refetchOnFocus: true,
  refetchOnReconnect: true,
  keepUnusedDataFor: 5,
  endpoints: () => ({}),
});
