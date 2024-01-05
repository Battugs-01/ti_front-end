import { MenuDataItem } from "@ant-design/pro-layout";
import HomeIcon from "assets/icons/home-line.svg";
import Bell from "assets/icons/bell-02.svg";
import File04 from "assets/icons/file-04.svg";
import File03 from "assets/icons/file-03.svg";
import Currency from "assets/icons/currency-dollar.svg";
import Certifcate from "assets/icons/certificate-01.svg";
import Trophy from "assets/icons/trophy-01.svg";
import List from "assets/icons/list.svg";
import UserRight from "assets/icons/user-right-01.svg";
import UserX from "assets/icons/user-x-01.svg";

export interface GroupedMenuProps {
  icon: any;
  path: string;
  name: string;
  children: MenuDataItem[];
}

export const GroupedMenu: GroupedMenuProps[] = [
  {
    icon: <img src={HomeIcon} />,
    name: "Нүүр хуудас",
    path: "/dashboard/dashboard",
    children: [],
  },
  {
    icon: <img src={Bell} />,
    name: "Мэдэгдэл",
    path: "/dashboard/information",
    children: [],
  },
  {
    name: "Асрамжийн газар",
    icon: null,
    path: "",
    children: [
      {
        icon: <img src={File04} />,
        name: "Бүртгэлийн маягт",
        path: "/dashboard/customers",
      },
      {
        icon: <img src={File03} />,
        name: "Тайлан",
        path: "/dashboard/sponsored",
      },
      {
        icon: <img src={Currency} />,
        name: "Орлого",
        path: "/dashboard/orders",
      },
    ],
  },
  {
    name: "Ажилчид",
    icon: null,
    path: "",
    children: [
      {
        icon: <img src={Certifcate} />,
        name: "Сургалт",
        path: "/dashboard/statement",
      },
      {
        icon: <img src={Trophy} />,
        name: "Шагнал",
        path: "/dashboard/notifications",
      },
      {
        icon: <img src={Currency} />,
        name: "Цалин хөлс",
        path: "/dashboard/settings",
      },
    ],
  },
  {
    name: "Асруулагч",
    icon: null,
    path: "",
    children: [
      {
        icon: <img src={List} />,
        name: "Асруулагчийн жагсаалт",
        path: "/dashboard/products",
      },
      {
        icon: <img src={UserRight} />,
        name: "Шилжилт хөдөлгөөн",
        path: "/dashboard/merchant/service/permission",
      },
      {
        icon: <img src={UserX} />,
        name: "Нас барсан иргэд",
        path: "/dashboard/merchant/user",
      },
    ],
  },
];
// export const menuDataRender: MenuDataItem[] = [
//   {
//     icon: <BiBarChartSquare size={20} className={globalStyle} />,
//     name: "Dashboard",
//     path: "/dashboard/dashboard",
//   },
//   {
//     icon: <AiOutlineBars size={20} className={globalStyle} />,
//     name: "Merchants",
//     path: "/dashboard/merchant",
//     children: [
//       {
//         icon: <div className="h-10" />,
//         name: "All List",
//         path: "/dashboard/merchant/service/all",
//       },
//       {
//         icon: <div className="h-10" />,
//         name: "Product/Service Manage",
//         path: "/dashboard/merchant/service/permission",
//       },
//       {
//         icon: <div className="h-10" />,
//         name: "User List",
//         path: "/dashboard/merchant/user",
//       },
//     ],
//   },
//   {
//     icon: <FiUsers size={20} className={globalStyle} />,
//     name: "Customers",
//     path: "/dashboard/customers",
//   },
//   {
//     icon: <IoCartOutline size={20} className={globalStyle} />,
//     name: "Services & Products",
//     path: "/dashboard/products",
//   },
//   {
//     icon: <BiPieChartAlt2 size={20} className={globalStyle} />,
//     name: "Orders",
//     path: "/dashboard/orders",
//   },
//   {
//     icon: <TbBuildingBank size={20} className={globalStyle} />,
//     name: "Statement",
//     path: "/dashboard/statement",
//   },
//   {
//     icon: <TbBellRinging size={20} className={globalStyle} />,
//     name: "Notifications",
//     path: "/dashboard/notifications",
//   },
//   {
//     icon: <FiSettings size={20} className={globalStyle} />,
//     name: "Settings",
//     path: "/dashboard/settings",
//   },
//   {
//     icon: <SiGithubsponsors size={20} className={globalStyle} />,
//     name: "Sponsored",
//     path: "/dashboard/sponsored",
//   },
// ];
