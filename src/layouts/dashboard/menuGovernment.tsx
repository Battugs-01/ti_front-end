import { MenuDataItem } from "@ant-design/pro-layout";
import RequestIcon from "assets/icons/requests.svg";
import ReportIcon from "assets/icons/report.svg";
import CaregiverIcon from "assets/icons/caregiver.svg";
import OrphanIcon from "assets/icons/orphan.svg";
import SettingsIcon from "assets/icons/settings.svg";

export interface GovernmentMenuProps {
  icon: any;
  path: string;
  name: string;
  children: MenuDataItem[];
}

export const GovernmentMenu: GovernmentMenuProps[] = [
  {
    icon: <img src={RequestIcon} />,
    name: "Хүсэлтүүд",
    path: "/dashboard/requests",
    children: [],
  },
  {
    icon: <img src={ReportIcon} />,
    name: "Тайлан",
    path: "/dashboard/report",
    children: [],
  },
  {
    icon: <img src={CaregiverIcon} />,
    name: "Асруулагч",
    path: "/dashboard/caregiver",
    children: [],
  },
  {
    icon: <img src={OrphanIcon} />,
    name: "Асрамжийн газар",
    path: "/dashboard/orphan",
    children: [],
  },
  {
    icon: <img src={SettingsIcon} />,
    name: "Тохиргоо",
    path: "/dashboard/gov-settings",
    children: [],
  },
];
