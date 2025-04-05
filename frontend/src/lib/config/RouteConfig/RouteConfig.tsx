import Layout from "@/components/shared/layout";

import { createBrowserRouter, RouteObject } from "react-router-dom";
import AuthPageAsync from "@/pages/AuthPage/AuthPage.async";
import MainPageAsync from "@/pages/MainPage/MainPage.async";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import EmployeesTablePageAsync from "@/pages/EmployeesTablePage/EmployeesTablePage.async";
import RegisterPageAsync from "@/pages/RegisterPage/RegisterPage.async";

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
  // {
  //   path: "/",
  //   element: (
  //     <ProtectedRoute>
  //       <Container>
  //         <div className="w-full flex pt-5">
  //           <LogoIcon />
  //         </div>
  //         <MainPageAsync />
  //       </Container>
  //     </ProtectedRoute>
  //   ),
  // },

  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainPageAsync />,
      },
      {
        path: "/employees",
        element: <EmployeesTablePageAsync />,
      },
    ],
  },
]);
