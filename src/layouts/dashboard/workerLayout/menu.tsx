import Logo from "assets/government/img/menuLogo.png";
import UserIcon from "assets/government/icons/user.svg";
import NotificationIcon from "assets/government/icons/notification.svg";
import LogoutIcon from "assets/government/icons/logout.svg";
import { Avatar, Badge } from "antd";
import { useAuthContext } from "context/auth";
import { useNavigate } from "react-router-dom";
import { Action } from "context/type";
import auth from "service/auth";

const Menu: React.FC = () => {
  const [_, setAuth] = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="w-full bg-[#144E5A] text-white h-[72px]">
      <div className="px-6 h-full flex justify-between items-center">
        <div className="flex items-center gap-6 w-1/4">
          <div className="flex items-center gap-2 w-2/3">
            <img src={Logo} alt="logo" />
            <div>Хөдөлмөр, халамжийн үйлчилгээний ерөнхий газар</div>
          </div>
          <div className="w-1/3">
            <div className="flex items-center gap-2">
              <img src={UserIcon} alt="user" />
              <div>Үйлчлүүлэгч</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Badge count={2} size="small">
            <img src={NotificationIcon} alt="notf" />
          </Badge>
          <div className="flex items-center gap-3">
            <Avatar>BA</Avatar>
            <div className="flex flex-col justify-center items-start">
              <div className="text-sm">{"E.Battulga"}</div>
              <div className="text-sm text-[#A0B6BA]">{"Social worker"}</div>
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
