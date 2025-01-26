import { Fininciar } from "pages/dashboard/financiar";
import { lazy } from "react";
import { IRoute } from "./types";

const EmployeRegistration = lazy(
  () => import("pages/dashboard/employ-registration/index")
);

const FieldRegistration = lazy(
  () => import("pages/dashboard/field-registration/index")
);

const ReportPage = lazy(() => import("pages/dashboard/report/index"));

const MyWallet = lazy(() => import("pages/dashboard/my-wallet/index"));
const MyFill = lazy(() => import("pages/dashboard/my-fill/index"));

const dashboardRoutes: IRoute[] = [
  {
    key: "employ-registration",
    path: "employ-registration",
    component: <EmployeRegistration />,
  },
  {
    key: "field-registration",
    path: "field-registration",
    component: <FieldRegistration />,
  },
  {
    key: "report",
    path: "report",
    component: <ReportPage />,
  },
  {
    key: "financiar",
    path: "financiar",
    component: <Fininciar />,
  },
  {
    key: "my-wallet",
    path: "my-wallet",
    component: <MyWallet />,
  },
  {
    key: "my-fill",
    path: "my-fill",
    component: <MyFill />,
  },
];

export default [...dashboardRoutes];
