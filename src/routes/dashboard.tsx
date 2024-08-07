import { lazy } from "react";
import { IRoute } from "./types";

const ScreeningListPage = lazy(
  () => import("pages/dashboard/screening-list/index")
);
const DevelopmentPlanPage = lazy(
  () => import("pages/dashboard/development-plan/index")
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
    key: "development-plan",
    path: "development-plan",
    component: <DevelopmentPlanPage />,
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
];

export default [...dashboardRoutes];
