import { lazy } from "react";
import { IRoute } from "./types";
const MerchantServicePage = lazy(
  () => import("pages/dashboard/merchant/service")
);
const MerchantServicePermissionPage = lazy(
  () => import("pages/dashboard/merchant/permission")
);

const MerchantPage = lazy(() => import("pages/dashboard/merchant/user"));
const SettingsPage = lazy(() => import("pages/dashboard/settings/index"));
const NotificationPage = lazy(
  () => import("pages/dashboard/notifications/index")
);
const CompanyPage = lazy(() => import("pages/dashboard/company"));
const StatementPage = lazy(() => import("pages/dashboard/statement"));
const CustomerListPage = lazy(() => import("pages/dashboard/customers"));
const CustomerDetailPage = lazy(
  () => import("pages/dashboard/customers/detail")
);
const OrdersPage = lazy(() => import("pages/dashboard/orders/index"));
const ProductsPage = lazy(() => import("pages/dashboard/products/index"));
const DashboardPage = lazy(() => import("pages/dashboard/dashboard/index"));
const SponsoredPage = lazy(() => import("pages/dashboard/sponsored/index"));
const CareInformation = lazy(
  () => import("pages/dashboard/care-information/index")
);
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

const dashboardRoutes: IRoute[] = [
  {
    key: "dashboard",
    path: "dashboard",
    component: <DashboardPage />,
  },
  {
    key: "care-information",
    path: "care-information",
    component: <CareInformation />,
  },
  {
    key: "merchant/service/all",
    path: "merchant/service/all",
    component: <MerchantServicePage />,
  },
  {
    key: "merchant/user",
    path: "merchant/user",
    component: <MerchantPage />,
  },
  {
    key: "merchant/service/permission",
    path: "merchant/service/permission",
    component: <MerchantServicePermissionPage />,
  },
  {
    key: "settings",
    path: "settings",
    component: <SettingsPage />,
  },
  {
    key: "notifications",
    path: "notifications",
    component: <NotificationPage />,
  },
  {
    key: "company/:id",
    path: "company/:id",
    component: <CompanyPage />,
  },
  {
    key: "statement",
    path: "statement",
    component: <StatementPage />,
  },
  {
    key: "customers",
    path: "customers",
    component: <CustomerListPage />,
  },
  {
    key: "customers/detail/:id",
    path: "customers/detail/:id",
    component: <CustomerDetailPage />,
  },
  {
    key: "orders",
    path: "orders",
    component: <OrdersPage />,
  },
  {
    key: "products",
    path: "products",
    component: <ProductsPage />,
  },
  {
    key: "sponsored",
    path: "sponsored",
    component: <SponsoredPage />,
  },
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
];

export default [...dashboardRoutes];
