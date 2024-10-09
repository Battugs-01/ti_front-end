import { FormattedMessage } from "react-intl";
import {
  File03,
  File04,
  PieChart02,
  Settings01,
  User01,
} from "untitledui-js-base";

export const menuItems = [
  {
    icon: <PieChart02 />,
    name: <FormattedMessage id="dashboard" />,
    path: "/dashboard/dashboard",
  },
  {
    icon: <File04 />,
    name: <FormattedMessage id="screening_list" />,
    path: "/dashboard/screening-list",
  },
  {
    icon: <User01 />,
    name: <FormattedMessage id="my_planning_work" />,
    path: "/dashboard/my-planned-work",
  },
  {
    icon: <File03 />,
    name: <FormattedMessage id="stastical_report" />,
    path: "/dashboard/stastical-report",
  },
];

export const menuSuperAdminItems = [
  {
    icon: <PieChart02 />,
    name: <FormattedMessage id="dashboard" />,
    path: "/dashboard/dashboard",
  },
  {
    icon: <File03 />,
    name: <FormattedMessage id="stastical_report" />,
    path: "/dashboard/stastical-report",
  },
  {
    icon: <Settings01 />,
    name: <FormattedMessage id="settings" />,
    path: "/dashboard/settings",
  },
];

export const menuAdminItems = [
  ...menuItems,
  {
    icon: <Settings01 />,
    name: <FormattedMessage id="settings" />,
    path: "/dashboard/settings",
  },
];

export const menuStackholderItems = [
  {
    icon: <PieChart02 />,
    name: <FormattedMessage id="dashboard" />,
    path: "/dashboard/dashboard",
  },
  {
    icon: <File03 />,
    name: <FormattedMessage id="stastical_report" />,
    path: "/dashboard/stastical-report",
  },
];
