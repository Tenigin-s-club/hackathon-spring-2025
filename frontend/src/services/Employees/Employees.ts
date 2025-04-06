import { baseApi } from "../BaseApi";
import { EmployeeRole, UnVerifiedUser, VerifiedUser } from "./types";

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVerifiedEmployees: builder.query<VerifiedUser[], void>({
      query: () => `/admin/verified_users`,
      providesTags: ["Employees"],
    }),
    getUnVerEmployees: builder.query<UnVerifiedUser[], void>({
      query: () => "/admin/unverified_users",
      providesTags: ["UnVerEmployees"],
    }),
    deleteEmployee: builder.mutation<{ success: boolean; id: number }, string>({
      query(id) {
        return {
          url: `/admin/disconfirm_user/${id}`,
          method: "DELETE",
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: ["Employees", "UnVerEmployees"],
    }),
    // changeEmployeeRole: builder.mutation<VerifiedUser, EmployeeRole>({
    //   query: (id, ...data) => ({
    //     url: `employees/${id}/`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Employees"],
    // }),
    confirmEmployee: builder.mutation<
      void,
      { id: string; roles: EmployeeRole[] }
    >({
      query: ({ id, roles }) => ({
        url: `/admin/confirm_user/${id}`,
        method: "POST",
        body: { roles: roles },
      }),
      invalidatesTags: ["UnVerEmployees", "Employees"],
    }),
  }),
});

export const {
  useGetUnVerEmployeesQuery: useGetUnVerEmployees,
  useGetVerifiedEmployeesQuery: useGetVerifiedEmployees,
  useDeleteEmployeeMutation: useDeleteEmployee,
  useConfirmEmployeeMutation: useConfirmEmployee,
} = employeesApi;
