import { baseApi } from "../BaseApi";
import { Meeting, MeetingStatus } from "./types";

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMeetings: builder.query<Meeting[], MeetingStatus>({
      query: (status) => `/meetings/?status=${status}`,
    }),
  }),
});

export const { useGetMeetingsQuery: useGetMeetings } = employeesApi;
