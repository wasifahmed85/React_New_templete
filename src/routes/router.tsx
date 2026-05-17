import { lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

import { authRoutes } from "@/routes/authRoutes";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { publicRoutes } from "@/routes/publicRoutes";
import { ScrollToTopLayout, suspensePage } from "@/routes/routeUtils";

const Unauthorized = lazy(() => import("@/pages/global/Unauthorized"));
const NotFound = lazy(() => import("@/pages/global/NotFound"));
const UserDashboard = lazy(() => import("@/pages/user/UserDashboard"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));

const redirect = (to: string) => <Navigate to={to} replace />;

export const router = createBrowserRouter([
  {
    element: <ScrollToTopLayout />,
    children: [
      publicRoutes,
      authRoutes,
      { path: "/unauthorized", element: suspensePage(Unauthorized) },
      { path: "/dashboard", element: redirect("/user/dashboard") },
      { path: "/admin", element: redirect("/admin/dashboard") },
      {
        path: "/user/dashboard",
        element: (
          <ProtectedRoute>{suspensePage(UserDashboard)}</ProtectedRoute>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoute roles="admin" loginPath="/admin/login" fallbackPath="/user/dashboard">
            {suspensePage(AdminDashboard)}
          </ProtectedRoute>
        ),
      },
      { path: "*", element: suspensePage(NotFound) },
    ],
  },
]);
