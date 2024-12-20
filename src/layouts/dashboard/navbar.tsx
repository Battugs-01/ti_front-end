import { useRequest } from "ahooks";
import { Avatar, Popover } from "antd";
import Logo from "assets/img/menu_logo.png";
import { AuthContext, useAuthContext } from "context/auth";
import { Action } from "context/type";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "service/auth";
import file from "service/file";
import {
  ChevronDown,
  LockUnlocked04,
  Logout01,
  Menu01,
  User03,
  XClose,
} from "untitledui-js-base";
import { ChangePassword } from "./action/change_password";
import { Logout } from "./action/logout";
import { PersonalInfo } from "./action/personal_info";
import { Menu } from "./menu";

const Navbar: React.FC = () => {
  const [nav, setNav] = useState<boolean>(false);
  const [personalInfo, setPersonalInfo] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [logout, setLogout] = useState<boolean>(false);
  const [_, setAuth] = useAuthContext();
  const [user] = useContext(AuthContext);
  const info = useRequest(auth.info, {
    manual: true,
    onSuccess: (data) => {
      setAuth([Action.SIGN_IN, data]);
      setAuth([Action.INIT, true]);
    },
    onError: () => {
      auth.removeToken();
      setAuth([Action.SIGN_OUT]);
      setAuth([Action.INIT, true]);
    },
  });
  const navigate = useNavigate();
  const onClose = () => {
    setNav(false);
  };

  return (
    <div className="w-full bg-[#0077F4] text-white h-[72px]">
      <div className="px-6 h-full flex justify-between items-center">
        <div className="flex items-center gap-6 ">
          <Link
            to="/dashboard/dashboard"
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
          <div className="flex items-center gap-4 ">
            <Popover
              placement="bottom"
              arrow={false}
              overlayInnerStyle={{ padding: 0 }}
              content={
                <div className="flex flex-col">
                  <div
                    className="flex items-center gap-3 p-2 mx-2 mt-2 cursor-pointer"
                    onClick={() => {
                      setPersonalInfo(true);
                    }}
                  >
                    <User03 size="18" />
                    <div>Хувийн мэдээлэл</div>
                  </div>
                  <div
                    className="flex items-center gap-3 p-2 m-2 cursor-pointer"
                    onClick={() => {
                      setChangePassword(true);
                    }}
                  >
                    <LockUnlocked04 size="18" />
                    <div>Нууц үг солих</div>
                  </div>
                  <div style={{ borderTop: "1px solid #EAECF0" }}>
                    <div
                      onClick={() => {
                        setLogout(true);
                      }}
                      className="flex items-center gap-3 p-2 m-2 bg-[#FEF3F2] text-[#F04438] rounded-md cursor-pointer"
                    >
                      <Logout01 size="18" />
                      <div>Системээс гарах</div>
                    </div>
                  </div>
                </div>
              }
            >
              <div className="flex items-center gap-3">
                <Avatar
                  src={file.fileToUrl(user.user?.profile?.physical_path || "")}
                >
                  {user?.user?.email?.substring(0, 2).toUpperCase()}
                </Avatar>
                <div className="flex flex-col justify-center items-start">
                  <div className="text-sm">{user?.user?.email || "user"}</div>
                  <div className="text-sm text-white">
                    {user?.user?.role || "Үүрэг"}
                  </div>
                </div>
                <ChevronDown size="24" />
              </div>
            </Popover>
            {personalInfo && (
              <PersonalInfo
                visible={personalInfo}
                onClose={() => {
                  setPersonalInfo(false);
                }}
                onFinish={() => {
                  info?.run();
                  setPersonalInfo(false);
                }}
              />
            )}
            {changePassword && (
              <ChangePassword
                visible={changePassword}
                onClose={() => {
                  setChangePassword(false);
                }}
                onFinish={() => {
                  setChangePassword(false);
                }}
              />
            )}
            {logout && (
              <Logout
                visible={logout}
                onClose={() => {
                  setLogout(false);
                }}
                onFinish={() => {
                  auth.removeToken();
                  setAuth([Action.SIGN_OUT]);
                  navigate("/auth/login");
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
