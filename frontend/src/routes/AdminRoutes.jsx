import React, { Suspense } from "react";
import { AdminLoaders } from "../loaders/AdminLoaders";
import NotFound from "../components/NotFound";
import Loading from "../components/Loading";

const AdminDashboard = React.lazy(() =>
  import("../pages/admin/dashboard/Dashboard")
);
const AdminCreate = React.lazy(() => import("../pages/admin/create/Create"));
const AdminLayouts = React.lazy(() => import("../layouts/AdminLayouts"));
export const AdminRoutes = {
  path: "/admin",
  element: <AdminLayouts />,
  errorElement: <NotFound />,
  loader: () => AdminLoaders("admin"),
  children: [
    {
      path: "dashboard",
      element: (
        <Suspense fallback={<Loading />}>
          <AdminDashboard />
        </Suspense>
      ),
    },
    {
      path: "create",
      element: (
        <Suspense fallback={<Loading />}>
          <AdminCreate />
        </Suspense>
      ),
    },
  ],
};
