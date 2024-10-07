import { Drawer } from "antd";
import Logo from "assets/img/menu_logo.png";
import { UserRoleType } from "config";
import { AuthContext } from "context/auth";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { menuAdminItems, menuItems } from "./menu_items";

const triangleStyle: React.CSSProperties = {
  width: 0,
  height: 0,
  borderStyle: "solid",
  borderWidth: "0 12px 12px 12px",
  borderColor: "transparent transparent #E7EDEE transparent",
  position: "absolute",
  top: "85%",
  left: "55%",
  transform: "translateX(-50%)",
};
export const Menu: React.FC<{ mobile?: boolean; onClose?: () => void }> = ({
  mobile,
  onClose,
}) => {
  const [user] = useContext(AuthContext);
  let menus = menuItems;
  if (
    user?.user?.role === UserRoleType.super_admin ||
    user?.user?.role === UserRoleType.admin
  ) {
    menus = menuAdminItems;
  }
  if (mobile) {
    return (
      <Drawer open={mobile} placement="left" onClose={onClose}>
        <div className="flex items-start flex-col">
          <Link
            onClick={onClose}
            to="/dashboard/dashboard"
            className="flex items-center gap-2 px-5 py-1"
          >
            <img src={Logo} alt="logo" />
          </Link>
          {menus.map((item, index) => (
            <div key={index} className="flex items-center relative p-5">
              <Link
                onClick={onClose}
                to={item.path}
                className="flex items-center gap-2 text-[#144E5A] no-underline"
              >
                {item.icon}
                <div className="text-base">{item.name}</div>
              </Link>
            </div>
          ))}
        </div>
      </Drawer>
    );
  }
  return (
    <div className="flex items-center">
      {menus.map((item, index) => (
        <div key={index} className="flex items-center relative p-6">
          <NavLink
            to={item.path}
            className={({ isActive }) => {
              return `flex items-center gap-2 text-primary-300 no-underline
            ${isActive && "text-primary-600"}      
            `;
            }}
          >
            {({ isActive }) => (
              <>
                {item.icon}
                <div className="xl:text-base text-sm">{item.name}</div>
                {isActive && <div style={triangleStyle}></div>}
              </>
            )}
          </NavLink>
        </div>
      ))}
    </div>
  );
};
