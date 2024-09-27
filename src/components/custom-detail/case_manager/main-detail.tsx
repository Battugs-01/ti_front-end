import { PageLoading } from "@ant-design/pro-layout";
import QuistionHistory from "../quistion-history";
import { useLevelContext } from "../selected-level";
import Assesment from "../assesment";
import { useContext } from "react";
import { AuthContext } from "context/auth";
import DevPlanEdit from "../dev-plan-table/dev_plan_edit";
import { ScreeningTab } from "config";

const MainDetail: React.FC = () => {
  const { selectedLevel } = useLevelContext();
  const [user] = useContext(AuthContext);
  if (!selectedLevel) {
    return <PageLoading />;
  }
  console.log(selectedLevel?.level, "sda");
  return (
    <>
      <div className="flex flex-col gap-6 ">
        <QuistionHistory selectedLevel={selectedLevel} />
        <Assesment selectedLevel={selectedLevel} />
        {selectedLevel?.level === ScreeningTab.level_3 && <DevPlanEdit />}
      </div>
    </>
  );
};

export default MainDetail;
