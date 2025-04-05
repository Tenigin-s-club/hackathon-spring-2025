import axiosInstance from "@/lib/config/ApiConfig/ApiConfig";

import { AxiosError } from "axios";
import { showErrorNotification } from "@/lib/helpers/notification";
import { User } from "./types";

// export const meApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     me: builder.mutation<null, User>({
//       query: () => ({
//         url: "api-token-auth/",
//         method: "GET",
//       }),
//     }),
//   }),
// });

// export const { useMeMutation: useMe } = meApi;

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
