import { baseApi } from "../BaseApi";
import {
  Meeting,
  MeetingRequest,
  MeetingStatus,
  RequestQuestion,
} from "./types";

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMeetings: builder.query<Meeting[], MeetingStatus>({
      query: (status) => `/meetings/?status=${status}`,
      providesTags: ["Meetings"],
    }),
    getMeeting: builder.query<Meeting, string>({
      query: (id) => `/meetings/${id}`,
    }),
    addMeeting: builder.mutation<string, MeetingRequest>({
      query: (body) => ({
        url: "/meetings",
        method: "POST",
        body,
      }),
    }),
    addQuestion: builder.mutation<void, RequestQuestion>({
      query: (body) => ({
        url: `/meetings/${body.idMeeting}/question?title=${body.title}&description=${body.description}`,
        method: "POST",
        body: body.materials,
      }),
    }),
  }),
});

export const {
  useGetMeetingsQuery: useGetMeetings,
  useAddMeetingMutation: useAddMeeting,
  useGetMeetingQuery: useGetMeeting,
  useAddQuestionMutation: useAddQuestionForMeeting,
} = employeesApi;
