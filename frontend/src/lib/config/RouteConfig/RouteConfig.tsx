import Layout from "@/components/shared/layout";

import { createBrowserRouter, RouteObject } from "react-router-dom";
import AuthPageAsync from "@/pages/AuthPage/AuthPage.async";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import RegisterPageAsync from "@/pages/RegisterPage/RegisterPage.async";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import EmployeesTableAdminPageAsync from "@/pages/EmployeesTablePage/EmployeesTablePage.async";
import MeetingsAdminPageAsync from "@/pages/MeetingsAdminPage/MeetingsAdminPage.async";
import CreateMeetingPageAsync from "@/pages/CreateMeetingPage/CreateMeetingPage.async";
import EmployeePageAsync from "@/pages/EmployeePage/EmployeePage.async";
import MeetingsStatisticPageAsync from "@/pages/MeetingStatisticPage/MeetingStatisticPage.async";
import QuestionPageAsync from "@/pages/QuestionPage/QuestionPage.async";
import MeetingPageAsync from "@/pages/MeetingPage/MeetingPage.async";

const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <AuthPageAsync />,
  },
  {
    path: "/register",
    element: <RegisterPageAsync />,
  },
];

export const appRoutersConfig = createBrowserRouter([
  ...authRoutes,
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MeetingsAdminPageAsync />,
      },
      {
        path: "/employees",
        element: <EmployeesTableAdminPageAsync />,
      },
      {
        path: "/employees/:id",
        element: <EmployeePageAsync />,
      },
      {
        path: "/meetings",
        element: <MeetingsAdminPageAsync />,
      },
      {
        path: "/meetings/create",
        element: <CreateMeetingPageAsync />,
      },
      {
        path: "/meeting/:id",
        element: <MeetingPageAsync />,
      },
      {
        path: "/question/:id",
        element: <QuestionPageAsync />,
      },
      {
        path: "/meetingstatistic/:id",
        element: <MeetingsStatisticPageAsync />,
      },
    ],
  },
]);
