import { Avatar } from "antd";
import LogoutIcon from "assets/icons/logout.svg";
import Logo from "assets/img/menu_logo.png";
import { AuthContext, useAuthContext } from "context/auth";
import { Action } from "context/type";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "service/auth";
import { Menu } from "./menu";
import { Menu01, XClose } from "untitledui-js-base";
import LanguageSelector from "components/language-selector";

const Navbar: React.FC = () => {
  const [nav, setNav] = useState<boolean>(false);
  const [_, setAuth] = useAuthContext();
  const [user] = useContext(AuthContext);
  const navigate = useNavigate();
  const onClose = () => {
    setNav(false);
  };
  return (
    <div className="w-full bg-[#144E5A] text-white h-[72px]">
      <div className="px-6 h-full flex justify-between items-center">
        <div className="flex items-center gap-6 ">
          <Link
            to="/dashboard/screening-list"
            className="lg:flex items-center gap-2 hidden"
          >
            <img src={Logo} alt="logo" />
          </Link>
          <div className="lg:block hidden">
            <Menu />
          </div>
          <div className="lg:hidden">
            {nav ? (
              <XClose size="35" onClick={onClose} />
            ) : (
              <Menu01
                size="35"
                onClick={() => {
                  setNav(!nav);
                }}
              />
            )}
            {nav && <Menu mobile={nav} onClose={onClose} />}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <LanguageSelector />
            </div>
            <Avatar>BA</Avatar>
            <div className="flex flex-col justify-center items-start">
              <div className="text-sm">{user?.user?.email || "user"}</div>
              <div className="text-sm text-[#A0B6BA]">
                {user?.user?.phone || "position"}
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
