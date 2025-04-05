import axiosInstance from "@/lib/config/ApiConfig/ApiConfig";
import { showErrorNotification } from "@/lib/helpers/notification";
import { AxiosError } from "axios";
import {
  Inventory,
  Office,
  UnverifiedUsers,
  VerifiedUsers,
} from "./OfficesOperations.type";

export const getVerEmployees = async () => {
  try {
    const res = await axiosInstance.get<VerifiedUsers[]>(
      `/admin/verified_users`
    );
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return [];
  }
};
export const getUnVerEmployees = async () => {
  try {
    const res = await axiosInstance.get<UnverifiedUsers[]>(
      `/admin/unverified_users`
    );
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return [];
  }
};

export const deleteOfficesEmployees = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/offices/employees/${id}`);
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const getMeetings = async () => {
  try {
    const res = await axiosInstance.get<Office[]>("/meetings");
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const addOffice = async (office: Office) => {
  try {
    const res = await axiosInstance.post("/offices/office", office);
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const getOfficesInventory = async (id: number) => {
  try {
    const res = await axiosInstance.get<Inventory[]>(
      `/offices/inventory/${id}`
    );
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const getEmployeeInventory = async (id: string) => {
  try {
    const res = await axiosInstance.get<Inventory[]>(
      `/offices/employees/${id}/inventory`
    );
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};
