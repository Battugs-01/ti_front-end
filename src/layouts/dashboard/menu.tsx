import { MenuDataItem } from "@ant-design/pro-layout";
import { AiOutlineBars } from "react-icons/ai";
import { BiBarChartSquare, BiPieChartAlt2 } from "react-icons/bi";
import { FiSettings, FiUsers } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { SiGithubsponsors } from "react-icons/si";
import { TbBellRinging, TbBuildingBank } from "react-icons/tb";

const globalStyle = " ml-1 lg:ml-0";

export const menuDataRender: MenuDataItem[] = [
  {
    icon: <BiBarChartSquare size={20} className={globalStyle} />,
    name: "Dashboard",
    path: "/dashboard/dashboard",
  },
  {
    icon: <AiOutlineBars size={20} className={globalStyle} />,
    name: "Merchants",
    path: "/dashboard/merchant",
    children: [
      {
        icon: <div className="h-10" />,
        name: "All List",
        path: "/dashboard/merchant/service/all",
      },
      {
        icon: <div className="h-10" />,
        name: "Product/Service Manage",
        path: "/dashboard/merchant/service/permission",
      },
      {
        icon: <div className="h-10" />,
        name: "User List",
        path: "/dashboard/merchant/user",
      },
    ],
  },
  {
    icon: <FiUsers size={20} className={globalStyle} />,
    name: "Customers",
    path: "/dashboard/customers",
  },
  {
    icon: <IoCartOutline size={20} className={globalStyle} />,
    name: "Services & Products",
    path: "/dashboard/products",
  },
  {
    icon: <BiPieChartAlt2 size={20} className={globalStyle} />,
    name: "Orders",
    path: "/dashboard/orders",
  },
  {
    icon: <TbBuildingBank size={20} className={globalStyle} />,
    name: "Statement",
    path: "/dashboard/statement",
  },
  {
    icon: <TbBellRinging size={20} className={globalStyle} />,
    name: "Notifications",
    path: "/dashboard/notifications",
  },
  {
    icon: <FiSettings size={20} className={globalStyle} />,
    name: "Settings",
    path: "/dashboard/settings",
  },
  {
    icon: <SiGithubsponsors size={20} className={globalStyle} />,
    name: "Sponsored",
    path: "/dashboard/sponsored",
  },
];
