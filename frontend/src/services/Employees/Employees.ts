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
    }),
    deleteEmployee: builder.mutation<{ success: boolean; id: number }, string>({
      query(id) {
        return {
          url: `/admin/verified_users/${id}`,
          method: "DELETE",
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: "Employees", id }],
    }),
    changeEmployeeRole: builder.mutation<VerifiedUser, EmployeeRole>({
      query: (id, ...data) => ({
        url: `employees/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Employees"],
    }),
    // createCommentForEmployee: builder.mutation<void, CommentRequest>({
    //   query: (body) => ({
    //     url: "/comments/",
    //     method: "POST",
    //     body,
    //   }),
    // }),
  }),
});

export const {
  useGetUnVerEmployeesQuery: useGetUnVerEmployees,
  useGetVerifiedEmployeesQuery: useGetVerifiedEmployees,
  useDeleteEmployeeMutation: useDeleteEmployee,
} = employeesApi;
