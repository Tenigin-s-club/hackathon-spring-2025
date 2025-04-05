import { baseApi } from "../BaseApi";
import { User } from "../User/types";
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
} from "./types";

export const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<IRegisterResponse, IRegisterRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
    }),
  }),
});

export const logout = async () => {
  try {
    return true;
  } catch (e) {
    console.log(e);
  }
};

export const {
  useLoginMutation: useLogin,
  useRegisterMutation: useRegister,
  useGetMeQuery: useGetMe,
} = loginApi;

// export const loginFetch = async (email: string, password: string) =>
//   await axiosInstance.post(
//     "/auth/login",
//     {
//       email,
//       password,
//     },
//     { headers: { "Content-Type": "application/json" } }
//   );

// export const registerFetch = async (
//   fio: string,
//   email: string,
//   password: string
// ) =>
//   await axiosInstance.post(
//     "/auth/register",
//     {
//       fio,
//       email,
//       password,
//     },
//     {
//       headers: { "Content-Type": "application/json" },
//     }
//   );

// export const addOfficesEmployee = async (employee: OfficesUser) => {
//   try {
//     const res = await axiosInstance.post("/auth/employee", employee);

//     return res.data;
//   } catch (e) {
//     const error = e as AxiosError;
//     showErrorNotification(error.message);
//     return false;
//   }
// };
// export const editOfficesEmployee = async (
//   id: string,
//   employee: OfficesUser
// ) => {
//   try {
//     const res = await axiosInstance.put(`/auth/employee/${id}`, employee);

//     return res.data;
//   } catch (e) {
//     const error = e as AxiosError;
//     showErrorNotification(error.message);
//     return false;
//   }
// };

// export const deleteEmployee = async (id: string) => {
//   try {
//     const res = await axiosInstance.delete(`/auth/employee/${id}`);
//     return res.data;
//   } catch (e) {
//     const error = e as AxiosError;
//     showErrorNotification(error.message);
//     return false;
//   }
// };
