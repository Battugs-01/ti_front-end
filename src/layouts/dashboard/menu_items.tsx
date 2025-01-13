import { Archive, PieChart02, Settings01, User01 } from "untitledui-js-base";

export const menuItems = [
  {
    icon: <Archive />,
    name: "Талбайн бүртгэл",
    path: "/dashboard/field-registration",
  },
  {
    icon: <User01 />,
    name: "Ажилтны бүртгэл",
    path: "/dashboard/employ-registration",
  },
];

export const menuManagerItems = [
  {
    icon: <Archive />,
    name: "Талбайн бүртгэл",
    path: "/dashboard/field-registration",
  },
];

export const menuAdminItems = [
  ...menuItems,
  {
    icon: <Settings01 />,
    name: "Тохиргоо",
    path: "/dashboard/settings",
  },
];

export const menuFininciarItems = [
  {
    icon: <Archive />,
    name: "Талбайн бүртгэл",
    path: "/dashboard/field-registration",
  },
  {
    icon: <PieChart02 />,
    name: "Лавлах мэдээлэл",
    path: "/dashboard/financiar",
  },
];
