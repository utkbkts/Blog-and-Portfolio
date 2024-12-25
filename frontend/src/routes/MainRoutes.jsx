import React, { Suspense } from "react";
import NotFound from "../components/NotFound";
import MainLayouts from "../layouts/MainLayouts";
import Loading from "../components/Loading";
import DetailPage from "../pages/detail/DetailPage";

const HomePage = React.lazy(() => import("../pages/home/HomePage"));
const LoginPage = React.lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = React.lazy(() => import("../pages/auth/RegisterPage"));

export const MainRoutes = {
  path: "/",
  element: <MainLayouts />,
  errorElement: <NotFound />,
  children: [
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <HomePage />
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<Loading />}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: "/register",
      element: (
        <Suspense fallback={<Loading />}>
          <RegisterPage />
        </Suspense>
      ),
    },
    {
      path: "/test",
      element: (
        <Suspense fallback={<Loading />}>
          <DetailPage />
        </Suspense>
      ),
    },
  ],
};
