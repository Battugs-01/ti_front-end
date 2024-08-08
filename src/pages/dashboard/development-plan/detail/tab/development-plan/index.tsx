import { CustomCard, PageCard } from "components/card";
import NotFound from "./not-found";
import { Badge } from "antd";
import dayjs from "dayjs";

interface DevelopmentPlanTabType {
  data: {}[];
}

const DevelopmentPlanTab: React.FC<DevelopmentPlanTabType> = ({ data }) => {
  if (data?.length === 0 || !data) {
    return <NotFound />;
  }
  return (
    <CustomCard title="Development Plan">
      <div className="flex gap-2">
        <div>
          Agency <span className="font-bold">“Говь гурван сайхан” ХХК</span>
        </div>
        <Badge status="default" />
        <div>
          CM in charge <span className="font-bold">Гантулга</span>
        </div>
        <Badge status="default" />
        <div>
          Assessment Date{" "}
          <span className="font-bold">
            {dayjs(new Date()).format("DD/MM/YYYY")}
          </span>
        </div>
        <Badge status="default" />
        <div>
          Date of Next Review{" "}
          <span className="font-bold">
            {dayjs(new Date()).format("DD/MM/YYYY")}
          </span>
        </div>
      </div>
    </CustomCard>
  );
};

export default DevelopmentPlanTab;
