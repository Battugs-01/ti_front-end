import { SetStateAction, useState } from "react";
import Header from "./components/header";
import { TabType } from "service/gov-orphan";
import { IfCondition } from "components/condition";
import { Employees } from "./tabs/employees";
import { Caregivers } from "./tabs/caregivers";
import { Report } from "./tabs/report";
import { Form } from "./tabs/form";

const data = [
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    status: 1,
    emplopyees: 13,
    plan: 16,
    bedNumber: 46,
    bedNumberMax: 50,
    report: 3,
    reportMax: 4,
    donation: 4357590,
    id: 12,
    date: Date.now(),
    name: "Davaatulga",
  },
];
const OrphanDetail: React.FC = () => {
  const [tab, setTab] = useState<String>(TabType.employees);
  const changeTab = (e: SetStateAction<String>) => {
    setTab(e);
  };
  return (
    <div className="custom-ant-card-padding-border-remove">
      <div className="mb-4">
        <Header changeTab={changeTab} data={data} />
      </div>
      <IfCondition
        condition={tab === TabType.employees}
        whenTrue={<Employees />}
      />
      <IfCondition condition={tab === TabType.care} whenTrue={<Caregivers />} />
      <IfCondition condition={tab === TabType.report} whenTrue={<Report />} />
      <IfCondition condition={tab === TabType.form} whenTrue={<Form />} />
    </div>
  );
};

export default OrphanDetail;
