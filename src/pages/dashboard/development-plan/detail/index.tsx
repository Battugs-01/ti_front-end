import { useLocation } from "react-router-dom";
import Info from "./info";
import MainDetail from "./main-detail";

const DevelopmentPlanDetail: React.FC = () => {
  // const location = useLocation();
  // const pathnames = location.pathname.split("/");
  // console.log(pathnames[pathnames.length - 1], "location");
  return (
    <div className="grid xl:grid-cols-5 grid-cols-1 gap-6">
      <div className="xl:col-span-1">
        <Info />
      </div>
      <div className="xl:col-span-4">
        <MainDetail />
      </div>
    </div>
  );
};

export default DevelopmentPlanDetail;
