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

const DevelopmentPlanDetail = lazy(
  () => import("pages/dashboard/development-plan/detail")
);

const ScreeningListDetail = lazy(
  () => import("pages/dashboard/screening-list/case-manager/detail")
);

const ScreeningListDetailOtherRoles = lazy(
  () => import("pages/dashboard/screening-list/other_roles/detail")
);

const DashboardPage = lazy(() => import("pages/dashboard/dashboard/index"));

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
  {
    key: "development-plan-detail",
    path: "development-plan/:id",
    component: <DevelopmentPlanDetail />,
  },
  {
    key: "screening-list-case-manager-detail",
    path: "screening-list/case-manager/detail",
    component: <ScreeningListDetail />,
  },
  {
    key: "screening-list-other-roles-detail",
    path: "screening-list/other-roles/detail",
    component: <ScreeningListDetailOtherRoles />,
  },
  {
    key: "dashboard",
    path: "dashboard",
    component: <DashboardPage />,
  },
];

export default [...dashboardRoutes];
