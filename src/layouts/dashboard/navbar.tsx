import { Avatar } from "antd";
import LogoutIcon from "assets/icons/logout.svg";
import Logo from "assets/img/menu_logo.png";
import { AuthContext, useAuthContext } from "context/auth";
import { Action } from "context/type";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "service/auth";
import { Menu } from "./menu";

const Navbar: React.FC = () => {
  const [_, setAuth] = useAuthContext();
  const [user] = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="w-full bg-[#144E5A] text-white h-[72px]">
      <div className="px-6 h-full flex justify-between items-center">
        <div className="flex items-center gap-6 ">
          <Link
            to="/dashboard/screening-list"
            className="md:flex items-center gap-2 hidden"
          >
            <img src={Logo} alt="logo" />
          </Link>
          <div>
            <Menu />
          </div>
        </div>
        <div className="flex items-center gap-6">
          {/* <Badge count={2} size="small">
            <img src={NotificationIcon} alt="notf"/>
          </Badge> */}
          {/* <NotificationComponent /> */}
          <div className="flex items-center gap-3">
            <Avatar>BA</Avatar>
            <div className="flex flex-col justify-center items-start">
              <div className="text-sm">{user?.user?.first_name || "user"}</div>
              <div className="text-sm text-[#A0B6BA]">
                {user?.user?.position || "position"}
              </div>
            </div>
            <div
              className="p-2 rounded-md cursor-pointer"
              onClick={() => {
                auth.removeToken();
                setAuth([Action.SIGN_OUT]);
                navigate("/auth/login");
              }}
            >
              <img src={LogoutIcon} alt="logout" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
