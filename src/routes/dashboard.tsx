import { lazy } from "react";
import { IRoute } from "./types";

// GOVERNMENT
const RequestPage = lazy(() => import("pages/government/requests/index"));
const ReportPage = lazy(() => import("pages/government/report/index"));
const ReportDetail = lazy(() => import("pages/government/report/detail/index"));
const CaregiverPage = lazy(() => import("pages/government/caregiver/index"));
// const OrphanPage = lazy(() => import("pages/government/orphan/index"));
const OrphanPage = lazy(() => import("pages/government/gov-orphan/index"));
const GovSettingsPage = lazy(() => import("pages/government/settings/index"));
const CaregiverDetail = lazy(
  () => import("pages/government/caregiver/detail/index")
);
const OrphanDetail = lazy(
  () => import("pages/government/gov-orphan/detail/index")
);
const SettingsFormDetail = lazy(
  () => import("pages/government/settings/tab/formList/detail/index")
);
const SalaryList = lazy(
  () => import("pages/government/report/detail/tab/salaryInfo/salaryList/index")
);
const MigrationList = lazy(
  () =>
    import(
      "pages/government/report/detail/tab/migrationNews/migrationList/index"
    )
);
const DCaregiverList = lazy(
  () =>
    import(
      "pages/government/report/detail/tab/dcaregiverNews/dcaregiverList/index"
    )
);
const CaregiverList = lazy(
  () =>
    import(
      "pages/government/report/detail/tab/caregiverNews/caregiverList/index"
    )
);
const EmployeePage = lazy(() => import("pages/government/employees/index"));
const Feedback = lazy(() => import("pages/government/feedback/index"));

// this is social workers router
const CustomerPage = lazy(() => import("pages/socialWorker/customer/index"));

const dashboardRoutes: IRoute[] = [
  {
    key: "gov-requests",
    path: "government/requests",
    component: <RequestPage />,
  },
  {
    key: "gov-report",
    path: "government/report",
    component: <ReportPage />,
  },
  {
    key: "gov-report-info",
    path: "government/report/:id",
    component: <ReportDetail />,
  },
  {
    key: "gov-caregiver",
    path: "government/caregiver",
    component: <CaregiverPage />,
  },
  {
    key: "gov-orphan",
    path: "government/orphan",
    component: <OrphanPage />,
  },
  {
    key: "gov-settings",
    path: "government/settings",
    component: <GovSettingsPage />,
  },
  {
    key: "caregiver-detail",
    path: "government/caregiver/:id",
    component: <CaregiverDetail />,
  },
  {
    key: "orphan-detail",
    path: "government/orphan/:id",
    component: <OrphanDetail />,
  },
  {
    key: "settings-form-detail",
    path: "government/settings/:id",
    component: <SettingsFormDetail />,
  },
  {
    key: "gov-report-salary-list",
    path: "government/report/:id/salary/:list",
    component: <SalaryList />,
  },
  {
    key: "gov-report-migration-list",
    path: "government/report/:id/migration/:list",
    component: <MigrationList />,
  },
  {
    key: "gov-report-dcare-list",
    path: "government/report/:id/dcare/:list",
    component: <DCaregiverList />,
  },
  {
    key: "gov-report-caregiver-list",
    path: "government/report/:id/caregiver/:list",
    component: <CaregiverList />,
  },
  {
    key: "gov-feedback",
    path: "government/feedback",
    component: <Feedback />,
  },
  {
    key: "gov-employees",
    path: "government/employees",
    component: <EmployeePage />,
  },
  {
    key: "social-worker",
    path: "socialWorker/customer",
    component: <CustomerPage />,
  },
];

export default [...dashboardRoutes];
