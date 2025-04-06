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
import MeetingPage from "@/pages/MeetingPage/MeetingPage";
import QuestionPage from "@/pages/QuestionPage/QuestionPage";
import VksPage from "@/pages/VKS/VksPage";

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
        element: <MeetingPage />,
      },
      {
        path: "/question/:id",
        element: <QuestionPage />,
      },
      {
        path: "/vks",
        element: <VksPage />,
      },
    ],
  },
]);
