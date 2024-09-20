import { PageLoading } from "@ant-design/pro-layout";
import Assesment from "./assessment";
import QuistionHistory from "../quistion-history";
import { useLevelContext } from "../selected-level";

const MainDetailOtherRoles: React.FC = () => {
  const { selectedLevel } = useLevelContext();
  if (!selectedLevel) {
    return <PageLoading />;
  }
  return (
    <>
      <div className="flex flex-col gap-6 ">
        <QuistionHistory selectedLevel={selectedLevel} />
        <Assesment selectedLevel={selectedLevel} />
      </div>
    </>
  );
};

export default MainDetailOtherRoles;
