import React, { Suspense } from "react";
import NotFound from "../components/NotFound";
import MainLayouts from "../layouts/MainLayouts";
import Loading from "../components/Loading";
import ProtectedRoutes from "./ProtectedRoutes";
const HomePage = React.lazy(() => import("../pages/home/HomePage"));
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
      path: "/details/:title/:postId",
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
      path: "/trendingProjects",
      element: (
        <Suspense fallback={<Loading />}>
          <TrendingProjects />
        </Suspense>
      ),
    },
    {
      path: "/trendingBlogs",
      element: (
        <Suspense fallback={<Loading />}>
          <TrendingBlogs />
        </Suspense>
      ),
    },
    {
      path: "/about",
      element: (
        <Suspense fallback={<Loading />}>
          <About />
        </Suspense>
      ),
    },
    {
      path: "/auth/signup",
      element: (
        <Suspense fallback={<Loading />}>
          <ProtectedRoutes>
            <Register />
          </ProtectedRoutes>
        </Suspense>
      ),
    },
    {
      path: "/auth/signin",
      element: (
        <Suspense fallback={<Loading />}>
          <ProtectedRoutes>
            <Login />
          </ProtectedRoutes>
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
  ],
};
