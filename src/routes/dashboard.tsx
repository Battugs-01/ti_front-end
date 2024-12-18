import { lazy } from "react";
import { IRoute } from "./types";

const EmployeRegistration = lazy(
  () => import("pages/dashboard/employ-registration/index")
);

const dashboardRoutes: IRoute[] = [
  {
    key: "employ-registration",
    path: "employ-registration",
    component: <EmployeRegistration />,
  },
];

export default [...dashboardRoutes];
