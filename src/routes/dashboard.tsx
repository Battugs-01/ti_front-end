import { lazy } from "react";
import { IRoute } from "./types";

const ScreeningListPage = lazy(
  () => import("pages/dashboard/screening-list/index")
);

const StasticalReportPage = lazy(
  () => import("pages/dashboard/stastical-report/index")
);
const SettingsPage = lazy(() => import("pages/dashboard/settings/index"));

const ScreeningListDetail = lazy(
  () => import("pages/dashboard/screening-list/detail")
);

const DashboardPage = lazy(() => import("pages/dashboard/dashboard/index"));

const dashboardRoutes: IRoute[] = [
  {
    key: "screening-list",
    path: "screening-list",
    component: <ScreeningListPage />,
  },
  {
    key: "stastical-report",
    path: "stastical-report",
    component: <StasticalReportPage />,
  },
  {
    key: "settings",
    path: "settings",
    component: <SettingsPage />,
  },
  {
    key: "screening-list-detail",
    path: "screening-list/detail",
    component: <ScreeningListDetail />,
  },
  {
    key: "dashboard",
    path: "dashboard",
    component: <DashboardPage />,
  },
];

export default [...dashboardRoutes];
