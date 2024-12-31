import React, { Suspense } from "react";
import NotFound from "../components/NotFound";
import MainLayouts from "../layouts/MainLayouts";
import Loading from "../components/Loading";
const HomePage = React.lazy(() => import("../pages/home/HomePage"));
const LoginPage = React.lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = React.lazy(() => import("../pages/auth/RegisterPage"));
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
      path: "/:title/:id",
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
      path: "/contact",
      element: (
        <Suspense fallback={<Loading />}>
          <Contact />
        </Suspense>
      ),
    },
  ],
};
