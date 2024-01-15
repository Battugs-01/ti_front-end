import { SetStateAction, useState } from "react";
import Header from "./components/header";
import { DetailType } from "service/gov-requests";
import { IfCondition } from "components/condition";
import { HistoryMigration } from "./tabs/historyMigration";
import { PensionInfo } from "./tabs/pensionInfo";
import { DevPlan } from "./tabs/devPlan";
import { PersonalCase } from "./tabs/personalCase";
import { FoodCard } from "./tabs/foodCard";
import { DiagnosticCard } from "./tabs/diagnosticCard";

const data = [
  {
    image: "BE",
    name: "Battulga",
    surname: "Enkhtur",
    registrationNumber: "МИ95091515",
    state: 1,
    date: Date.now(),
    id: 95,
  },
];

const CaregiverDetail: React.FC = () => {
  const [tab, setTab] = useState<String>(DetailType.history);
  const changeTab = (e: SetStateAction<String>) => {
    setTab(e);
  };
  return (
    <div>
      <div className="custom-ant-card-padding-border-remove mb-6">
        <Header changeTab={changeTab} data={data} />
      </div>
      <IfCondition
        condition={tab === DetailType.history}
        whenTrue={<HistoryMigration />}
      />
      <IfCondition
        condition={tab === DetailType.case}
        whenTrue={<PersonalCase />}
      />
      <IfCondition condition={tab === DetailType.plan} whenTrue={<DevPlan />} />
      <IfCondition
        condition={tab === DetailType.pension}
        whenTrue={<PensionInfo />}
      />
      <IfCondition
        condition={tab === DetailType.food}
        whenTrue={<FoodCard />}
      />
      <IfCondition
        condition={tab === DetailType.diagnostic}
        whenTrue={<DiagnosticCard />}
      />
    </div>
  );
};
export default CaregiverDetail;
