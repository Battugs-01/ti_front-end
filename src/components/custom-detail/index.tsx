import { PageLoading } from "@ant-design/pro-layout";
import { ScreeningTab } from "config";
import { ScreeningListType } from "service/screening_list/type";
import Assesment from "./assesment";
import DevPlanEdit from "./dev-plan-table/dev_plan_edit";
import QuistionHistory from "./quesion-history";
import { useLevelContext } from "./selected-level";

interface MainDetailProps {
  customerMainData: ScreeningListType;
}
const MainDetail: React.FC<MainDetailProps> = ({ customerMainData }) => {
  const { selectedLevel } = useLevelContext();

  if (!selectedLevel || !customerMainData) {
    return <PageLoading />;
  }

  return (
    <>
      <div className="flex flex-col gap-6 ">
        <QuistionHistory selectedLevel={selectedLevel} />
        {selectedLevel?.level === ScreeningTab.level_3 && (
          <>
            <Assesment selectedLevel={selectedLevel} />
            <DevPlanEdit customerMainData={customerMainData} />
          </>
        )}
      </div>
    </>
  );
};

export default MainDetail;
