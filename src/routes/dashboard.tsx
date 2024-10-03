import { lazy } from "react";
import { IRoute } from "./types";

const DashboardPage = lazy(() => import("pages/dashboard/dashboard/index"));

const ScreeningListPage = lazy(
  () => import("pages/dashboard/screening-list/index")
);

const ScreeningListDetail = lazy(
  () => import("pages/dashboard/screening-list/detail")
);

const MyPlannedWork = lazy(
  () => import("pages/dashboard/my-planned-work/index")
);

const MyPlannedWorkDetail = lazy(
  () => import("pages/dashboard/my-planned-work/detail")
);

const StasticalReportPage = lazy(
  () => import("pages/dashboard/stastical-report/index")
);

const SettingsPage = lazy(() => import("pages/dashboard/settings/index"));

const dashboardRoutes: IRoute[] = [
  {
    key: "screening-list",
    path: "screening-list",
    component: <ScreeningListPage />,
  },
  {
    key: "my-planned-work",
    path: "my-planned-work",
    component: <MyPlannedWork />,
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
    key: "my-planned-work-detail",
    path: "my-planned-work/detail",
    component: <ScreeningListDetail />,
  },
  {
    key: "dashboard",
    path: "dashboard",
    component: <DashboardPage />,
  },
];

export default [...dashboardRoutes];
