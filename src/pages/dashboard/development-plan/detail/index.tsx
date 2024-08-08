import Info from "./info";
import MainDetail from "./main-detail";

const DevelopmentPlanDetail: React.FC = () => {
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
