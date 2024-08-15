import { DevPlan } from "./dev_plan";
import { SeniorsDevPlan } from "./seniors_devplan";

const DevelopmentPlan: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      <SeniorsDevPlan />
      <DevPlan />
    </div>
  );
};

export default DevelopmentPlan;
