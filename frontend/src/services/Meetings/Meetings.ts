import { baseApi } from "../BaseApi";
import { Meeting, MeetingRequest, MeetingStatus } from "./types";

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMeetings: builder.query<Meeting[], MeetingStatus>({
      query: (status) => `/meetings/?status=${status}`,
      providesTags: ["Meetings"],
    }),
    addMeeting: builder.mutation<MeetingRequest, Meeting>({
      query: (body) => ({
        url: "/meetings",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Meetings"],
    }),
  }),
});

export const {
  useGetMeetingsQuery: useGetMeetings,
  useAddMeetingMutation: useAddMeeting,
} = employeesApi;
