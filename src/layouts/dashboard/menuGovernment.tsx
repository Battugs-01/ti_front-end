import { MenuDataItem } from "@ant-design/pro-layout";
import RequestIcon from "assets/icons/requests.svg";
import CaregiverIcon from "assets/icons/caregiver.svg";
import OrphanIcon from "assets/icons/orphan.svg";
import FeedbackIcon from "assets/government/icons/request.svg";
import EmployeesIcon from "assets/government/icons/users.svg";
import LockIcon from "assets/government/icons/lock.svg";
export interface GovernmentMenuProps {
  icon: any;
  path: string;
  name: string;
  children: MenuDataItem[];
}

export const GovernmentMenu: GovernmentMenuProps[] = [
  {
    icon: <img src={RequestIcon} />,
    name: "Хүсэлт",
    path: "/dashboard/government/requests",
    children: [],
  },
  {
    icon: <img src={CaregiverIcon} />,
    name: "Үйлчлүүлэгч",
    path: "/dashboard/government/caregiver",
    children: [],
  },
  {
    icon: <img src={OrphanIcon} />,
    name: "Асрамжийн газар",
    path: "/dashboard/government/orphan",
    children: [],
  },
  {
    icon: <img src={EmployeesIcon} />,
    name: "Албан хаагчид",
    path: "/dashboard/government/employees",
    children: [],
  },
  {
    icon: <img src={FeedbackIcon} />,
    name: "Санал, хүсэлт",
    path: "/dashboard/government/feedback",
    children: [],
  },
  {
    icon: <img src={LockIcon} />,
    name: "Эрхийн тохиргоо",
    path: "/dashboard/government/settings",
    children: [],
  },
];
