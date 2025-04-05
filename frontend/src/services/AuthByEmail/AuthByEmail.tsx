import axiosInstance from "@/lib/config/ApiConfig/ApiConfig";
import { AxiosError } from "axios";
import { showErrorNotification } from "@/lib/helpers/notification";
import { OfficesUser } from "../OfficesOperations/OfficesOperations.type";

export const logout = async () => {
  try {
    return true;
  } catch (e) {
    console.log(e);
  }
};

export const loginFetch = async (email: string, password: string) =>
  await axiosInstance.post(
    "/auth/login",
    {
      email,
      password,
    },
    { headers: { "Content-Type": "application/json" } }
  );

export const registerFetch = async (
  fio: string,
  email: string,
  password: string
) =>
  await axiosInstance.post(
    "/auth/register",
    {
      fio,
      email,
      password,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

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
