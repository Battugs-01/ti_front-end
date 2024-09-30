import { PageLoading } from "@ant-design/pro-layout";
import { useLevelContext } from "./selected-level";
import { ScreeningTab } from "config";
import DevPlanEdit from "./dev-plan-table/dev_plan_edit";
import Assesment from "./assesment";
import QuistionHistory from "./quesion-history";

const MainDetail: React.FC = () => {
  const { selectedLevel } = useLevelContext();
  if (!selectedLevel) {
    return <PageLoading />;
  }

  return (
    <>
      <div className="flex flex-col gap-6 ">
        <QuistionHistory selectedLevel={selectedLevel} />
        {selectedLevel?.level === ScreeningTab.level_3 && (
          <>
            <Assesment selectedLevel={selectedLevel} />
            <DevPlanEdit />
          </>
        )}
      </div>
    </>
  );
};

export default MainDetail;
