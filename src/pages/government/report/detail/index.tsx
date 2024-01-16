import React, { Fragment, useEffect, useState } from "react";
import Header from "./header";
import Info from "./tab/salaryInfo/info";
import { FilterTypeline } from "service/gov-report";
import { RadioChangeEvent } from "antd";
import { IfCondition } from "components/condition";
import CaregiverNews from "./tab/caregiverNews/info";
import MigrationNews from "./tab/migrationNews";
import DCaregiverNews from "./tab/dcaregiverNews";
import { useLocation, useNavigate } from "react-router-dom";

const ReportDetail: React.FC = () => {
  const [tab, setTab] = useState<String>(FilterTypeline.A13);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const url = window.location.pathname.split("/");
    const pathName = url[url.length - 1];
    setTab(pathName);
  }, [location.pathname]);
  const changeTab = (e: RadioChangeEvent) => {
    setTab(e.target.value);
    navigate(`/dashboard/government/report/${e.target.value}`);
  };
  return (
    <div>
      <div className="mb-5">
        <Header changeTab={changeTab} tab={tab} />
      </div>
      <div className="custom-ant-card-padding-remove">
        <IfCondition
          condition={tab === FilterTypeline.A13}
          whenTrue={
            <Fragment>
              <Info />
            </Fragment>
          }
        />
        <IfCondition
          condition={tab === FilterTypeline.A14}
          whenTrue={<CaregiverNews />}
        />
        <IfCondition
          condition={tab === FilterTypeline.A15}
          whenTrue={<MigrationNews />}
        />
        <IfCondition
          condition={tab === FilterTypeline.A16}
          whenTrue={<DCaregiverNews />}
        />
      </div>
    </div>
  );
};

export default ReportDetail;
