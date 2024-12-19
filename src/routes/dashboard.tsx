import { lazy } from "react";
import { IRoute } from "./types";

const EmployeRegistration = lazy(
  () => import("pages/dashboard/employ-registration/index")
);
const FieldRegistration = lazy(
  () => import("pages/dashboard/field-registration/index")
);

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
];

export default [...dashboardRoutes];
