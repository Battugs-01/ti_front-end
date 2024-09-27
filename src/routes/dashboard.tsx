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
  () => import("pages/dashboard/screening-list/case-manager/detail")
);

const ScreeningListDetailDoctorRoles = lazy(
  () => import("pages/dashboard/screening-list/doctor_roles/detail")
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
    key: "screening-list-case-manager-detail",
    path: "screening-list/case-manager/detail",
    component: <ScreeningListDetail />,
  },
  {
    key: "screening-list-doctor-roles-detail",
    path: "screening-list/doctor-roles/detail",
    component: <ScreeningListDetailDoctorRoles />,
  },
  {
    key: "dashboard",
    path: "dashboard",
    component: <DashboardPage />,
  },
];

export default [...dashboardRoutes];
