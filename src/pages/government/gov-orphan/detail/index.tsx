import { SetStateAction, useEffect, useState } from "react";
import Header from "./components/header";
import { TabType } from "service/gov-orphan";
import { IfCondition, IfDataCondition } from "components/condition";
import { Employees } from "./tabs/employees";
import { Caregivers } from "./tabs/caregivers";
import { Report } from "./tabs/report";
import { Form } from "./tabs/form";
import { useRequest } from "ahooks";
import orphanUser from "service/gov-orphan/requests";
import { useParams } from "react-router-dom";

const OrphanDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const detail = useRequest(() => orphanUser.getOrphan(id));
  const [tab, setTab] = useState<String>(TabType.employees);
  const changeTab = (e: SetStateAction<String>) => {
    setTab(e);
  };
  return (
    <div className="custom-ant-card-padding-border-remove">
      <div className="mb-4">
        <Header changeTab={changeTab} data={detail?.data} tab={tab} />
      </div>
      <IfDataCondition
      data={detail?.data}
      condition={tab === TabType.employees}
      whenTrue={<Employees data={detail?.data} 
      />}
      />
      <IfCondition  condition={tab === TabType.care} whenTrue={<Caregivers />} />
      <IfCondition condition={tab === TabType.report} whenTrue={<Report />} />
      <IfCondition condition={tab === TabType.form} whenTrue={<Form />} />
    </div>
  );
};

export default OrphanDetail;
