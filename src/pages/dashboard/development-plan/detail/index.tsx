import Info from "./info";
import MainDetail from "./main-detail";

const DevelopmentPlanDetail: React.FC = () => {
  return (
    <div className="grid grid-cols-5 gap-6">
      <div className="col-span-1">
        <Info />
      </div>
      <div className="col-span-4">
        <MainDetail />
      </div>
    </div>
  );
};

export default DevelopmentPlanDetail;
