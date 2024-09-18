import { FormattedMessage } from "react-intl";
import { File03, File04, PieChart02, Settings01 } from "untitledui-js-base";

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
