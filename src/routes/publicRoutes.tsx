import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { FrontendLayout } from "@/layouts/frontend/FrontendLayout";
import { suspensePage } from "@/routes/routeUtils";

const Home = lazy(() => import("@/pages/frontend/Home"));

export const publicRoutes: RouteObject = {
  element: <FrontendLayout />,
  children: [{ path: "/", element: suspensePage(Home) }],
};
