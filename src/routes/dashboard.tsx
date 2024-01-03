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

const dashboardRoutes: IRoute[] = [
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
    key: "dashboard",
    path: "dashboard",
    component: <DashboardPage />,
  },
  {
    key: "sponsored",
    path: "sponsored",
    component: <SponsoredPage />,
  },
];

export default [...dashboardRoutes];
