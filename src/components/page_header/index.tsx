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

  const pathName : string[] = location.pathname
    .split("/")
    .filter((el) => el.length > 0)
    ?.slice(1, 2);
  
  const HeaderName = (pathName : string[]) => {
    let result = ""; 
    switch (pathName[0]) {
      case "dashboard":
        result = "Нүүр хуудас"
        break;
      case "customers":
        result = "Бүртгэлийн маягт"
        break;
      default:
          break;
    }
    return result
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <RiHome6Line
          size={20}
          color="#667085"
          className="cursor-pointer"
          onClick={() => navigate("/dashboard/dashboard")}
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
      <div className="w-full bg-gray-100 h-[1px] mb-4 mt-3" />
    </div>
  );
};
