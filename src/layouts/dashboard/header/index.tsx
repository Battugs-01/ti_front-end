import { Avatar, Popover } from "antd";
import { useAuthContext } from "context/auth";
import { Action } from "context/type";
import { FC } from "react";
import { RxExit } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import auth from "service/auth";

const Header: FC = () => {
  const [user, setAuth] = useAuthContext();
  const navigate = useNavigate();
  const { email } = user.user || {};
  const avatar = email?.substring(0, 2) || "AA";
  const color = "#146135";
  console.log(user.user, "jjjjjj");
  return (
    <>
      <div className="p-4 justify-between items-center w-full text-black lg:text-white lg:flex hidden">
        <div className="flex items-center gap-2">
          <Avatar shape="circle" style={{ backgroundColor: color }} size={40}>
            {avatar.toUpperCase()}
          </Avatar>
          <div className="flex flex-col gap-1">
            <p className="m-0">{user.user?.email}</p>
            <p className="m-0 text-[#A0B6BA]">{user?.user?.position}</p>
          </div>
        </div>
        <div
          className="p-2 rounded-md text-black md:text-white  hover:bg-gray-600 cursor-pointer"
          onClick={() => {
            auth.removeToken();
            setAuth([Action.SIGN_OUT]);
            navigate("/auth/login");
          }}
        >
          <RxExit size={16} />
        </div>
      </div>
      <Popover
        className="lg:hidden block"
        trigger={["click"]}
        content={
          <div
            className="p-2 rounded-md text-black  cursor-pointer "
            onClick={() => {
              auth.removeToken();
              setAuth([Action.SIGN_OUT]);
              navigate("/auth/login");
            }}
          >
            <RxExit size={16} />
          </div>
        }
      >
        <Avatar shape="circle" style={{ backgroundColor: color }} size={40}>
          {avatar.toUpperCase()}
        </Avatar>
      </Popover>
    </>
  );
};

export default Header;
