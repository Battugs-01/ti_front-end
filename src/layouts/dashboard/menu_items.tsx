import { FormattedMessage } from "react-intl";
import {
  File04,
  ChartBreakoutSquare,
  File03,
  Settings01,
  PieChart02,
} from "untitledui-js-base";

export const menuItems = [
  {
    icon:<PieChart02/>,
    name : <FormattedMessage id="dashboard" />,
    path: "/dashboard/dashboard",
  },
  {
    icon: <File04 />,
    name: <FormattedMessage id="screening_list" />,
    path: "/dashboard/screening-list",
  },
  {
    icon: <ChartBreakoutSquare />,
    name: <FormattedMessage id="development_plan" />,
    path: "/dashboard/development-plan",
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
