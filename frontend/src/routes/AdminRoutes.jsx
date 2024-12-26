import { Suspense } from "react";
import NotFound from "../components/NotFound";
import Loading from "../components/Loading";
import AdminLayouts from "../layouts/AdminLayouts";
import AdminCreate from "../pages/admin/create/Create";
import AdminDashboard from "../pages/admin/dashboard/Dashboard";

export const AdminRoutes = {
  path: "/admin",
  element: <AdminLayouts />,
  errorElement: <NotFound />,
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
