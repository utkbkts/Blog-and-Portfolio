import React, { Suspense } from "react";
import Loading from "../components/Loading";
import AdminLayouts from "../layouts/AdminLayouts";

const AdminDashboard = React.lazy(() =>
  import("../pages/admin/dashboard/Dashboard")
);
const AdminCreate = React.lazy(() => import("../pages/admin/create/Create"));

export const AdminRoutes = {
  path: "/admin",
  element: <AdminLayouts />,
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
