import { FormattedMessage } from "react-intl";
import { File03, PieChart02, Settings01, User01 } from "untitledui-js-base";

export const menuItems = [
  {
    icon: <User01 />,
    name: "Ажилтны бүртгэл",
    path: "/dashboard/employ-registration",
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
