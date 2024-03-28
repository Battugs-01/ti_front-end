import Logo from "assets/government/img/menuLogo.png";
import UserIcon from "assets/government/icons/user.svg";
import NotificationIcon from "assets/government/icons/notification.svg";
import LogoutIcon from "assets/government/icons/logout.svg";
import { Avatar, Badge } from "antd";
import { AuthContext, useAuthContext } from "context/auth";
import { useNavigate } from "react-router-dom";
import { Action } from "context/type";
import auth from "service/auth";
import NotificationComponent from "../notifcation";
import { useContext } from "react";

const triangleStyle: React.CSSProperties = {
  width: 0,
  height: 0,
  borderStyle: "solid",
  borderWidth: "0 12px 12px 12px",
  borderColor: "transparent transparent #E7EDEE transparent",
  position: "absolute",
  top: "145%",
  left: "55%",
  transform: "translateX(-50%)",
};
const Menu: React.FC = () => {
  const [_, setAuth] = useAuthContext();
  const [user] = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="w-full bg-[#144E5A] text-white h-[72px]">
      <div className="px-6 h-full flex justify-between items-center">
        <div className="flex items-center gap-6 w-1/4">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="logo" />
            <div className="text-sm w-52">
              Хөдөлмөр, халамжийн үйлчилгээний ерөнхий газар
            </div>
          </div>
          <div className="">
            <div className="flex items-center gap-2 relative">
              <img src={UserIcon} alt="user" />
              <div>Үйлчлүүлэгч</div>
              <div style={triangleStyle}></div>
            </div>
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
              <div className="text-sm">{user?.user?.first_name}</div>
              <div className="text-sm text-[#A0B6BA]">
                {user?.user?.position}
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

export default Menu;
