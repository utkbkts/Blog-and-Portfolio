import React, { Suspense } from "react";
import NotFound from "../components/NotFound";
import MainLayouts from "../layouts/MainLayouts";
import Loading from "../components/Loading";
import ProtectedRoutes, { ProtectedRoutesAuth } from "./ProtectedRoutes";
const HomePage = React.lazy(() => import("../pages/home/HomePage"));
const VerifyEmail = React.lazy(() => import("../pages/verify/VerifyEmail"));
const Register = React.lazy(() => import("../pages/auth/Register"));
const Login = React.lazy(() => import("../pages/auth/Login"));
const DetailPage = React.lazy(() => import("../pages/detail/DetailPage"));
const PostListPage = React.lazy(() => import("../pages/posts/PostListPage"));
const TrendingBlogs = React.lazy(() =>
  import("../pages/trendingBlogs/TrendingBlogs")
);
const TrendingProjects = React.lazy(() =>
  import("../pages/trendingProjects/TrendingProjects")
);
const Contact = React.lazy(() => import("../pages/contact/Contact"));
const About = React.lazy(() => import("../pages/about/About"));
const Sss = React.lazy(() => import("../pages/privacy/Sss"));
const PrivacyPolicy = React.lazy(() =>
  import("../pages/privacy/PrivacyPolicy")
);

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
      path: "/detail/:title/:postId",
      element: (
        <Suspense fallback={<Loading />}>
          <DetailPage />
        </Suspense>
      ),
    },
    {
      path: "/postList",
      element: (
        <Suspense fallback={<Loading />}>
          <PostListPage />
        </Suspense>
      ),
    },
    {
      path: "/featured-projects",
      element: (
        <Suspense fallback={<Loading />}>
          <TrendingProjects />
        </Suspense>
      ),
    },
    {
      path: "/popular-blogs",
      element: (
        <Suspense fallback={<Loading />}>
          <TrendingBlogs />
        </Suspense>
      ),
    },
    {
      path: "/about-us",
      element: (
        <Suspense fallback={<Loading />}>
          <About />
        </Suspense>
      ),
    },
    {
      path: "/register",
      element: (
        <Suspense fallback={<Loading />}>
          <ProtectedRoutesAuth>
            <Register />
          </ProtectedRoutesAuth>
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<Loading />}>
          <ProtectedRoutesAuth>
            <Login />
          </ProtectedRoutesAuth>
        </Suspense>
      ),
    },
    {
      path: "/contact",
      element: (
        <Suspense fallback={<Loading />}>
          <Contact />
        </Suspense>
      ),
    },
    {
      path: "/verify-email",
      element: (
        <Suspense fallback={<Loading />}>
          <ProtectedRoutes>
            <VerifyEmail />
          </ProtectedRoutes>
        </Suspense>
      ),
    },
    {
      path: "/S.S.S",
      element: (
        <Suspense fallback={<Loading />}>
          <Sss />
        </Suspense>
      ),
    },
    {
      path: "/policy",
      element: (
        <Suspense fallback={<Loading />}>
          <PrivacyPolicy />
        </Suspense>
      ),
    },
  ],
};
