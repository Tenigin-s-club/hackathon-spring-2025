import axiosInstance from "@/lib/config/ApiConfig/ApiConfig";
import { baseApi } from "../BaseApi";
import { ILoginRequest, ILoginResponse } from "./types";
import { AxiosError } from "axios";
import { showErrorNotification } from "@/lib/helpers/notification";
import { OfficesUser } from "../OfficesOperations/OfficesOperations.type";

export const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (body) => ({
        url: "api-token-auth/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation: useLogin } = loginApi;

export const logout = async () => {
  try {
    localStorage.removeItem("access_token");
    return true;
  } catch (e) {
    console.log(e);
  }
};

export const loginFetch = async (email: string, password: string) => {
  try {
    const res = await axiosInstance.post(
      "/auth/login",
      {
        email,
        password,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    localStorage.setItem("access_token", res.data["token"]);
    localStorage.setItem("role", res.data.role);
    return res.data["token"];
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};
export const registerFetch = async (
  fio: string,
  email: string,
  password: string
) => {
  try {
    const res = await axiosInstance.post(
      "/auth/register",
      {
        fio,
        email,
        password,
        team: Math.floor(Math.random() * 100_000_000) + "",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    localStorage.setItem("access_token", res.data["token"]);
    return res.data["token"];
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const addOfficesEmployee = async (employee: OfficesUser) => {
  try {
    const res = await axiosInstance.post("/auth/employee", employee);

    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};
export const editOfficesEmployee = async (
  id: string,
  employee: OfficesUser
) => {
  try {
    const res = await axiosInstance.put(`/auth/employee/${id}`, employee);

    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/auth/employee/${id}`);
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};
