import { BsChevronRight } from "react-icons/bs";
import { RiHome6Line } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

export type Props = {
  title?: String;
  subTitle?: String;
};
export const PageHeader = ({ title, subTitle }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathName: string[] = location.pathname
    .split("/")
    .filter((el) => el.length > 0)
    ?.slice(2, 3);
  const HeaderName = (pathName: string[]) => {
    let result = "";
    switch (pathName[0]) {
      case "requests":
        result = "Хүсэлт";
        break;
      case "report":
        result = "Тайлан";
        break;
      case "caregiver":
        result = "Асруулагч";
        break;
      case "orphan":
        result = "Асрамжийн газар";
        break;
      case "settings":
        result = "Тохиргоо";
        break;
      case "feedback":
        result = "Санал, хүсэлт";
        break;
      case "employees":
        result = "Ажилчдын жагсаалт";
        break;
      default:
        break;
    }
    return result;
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <RiHome6Line
          size={20}
          color="#667085"
          className="cursor-pointer"
          onClick={() => navigate("dashboard/government/requests")}
        />

        <div className="text-lg text-gray-300">/</div>

        <div className="flex items-center gap-2 ">
          {pathName.map((index) => {
            return (
              <div className="flex items-center gap-2" key={index}>
                <p className="font-medium text-sm text-gray-700 capitalize">
                  {HeaderName(pathName)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
