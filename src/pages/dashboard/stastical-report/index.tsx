import { Radio } from "antd";
import { IfCondition } from "components/condition";
import { StatisticalTab } from "config";
import { useState } from "react";
import Statistical from "./statistical";
import CareFosiList from "./care-fosi";

const StasticalReport = () => {
  const [tab, setTab] = useState<StatisticalTab>(StatisticalTab.statistical);
  return (
    <>
      <Radio.Group
        defaultValue={StatisticalTab.statistical}
        size="large"
        onChange={(e) => {
          setTab(e.target.value);
        }}
      >
        <Radio.Button value={StatisticalTab.statistical}>
          Statistical
        </Radio.Button>
        <Radio.Button value={StatisticalTab.careFoci}>
          By Care Foci List
        </Radio.Button>
      </Radio.Group>
      <div className="mt-7"></div>
      <IfCondition
        condition={StatisticalTab.statistical === tab}
        whenTrue={<Statistical />}
      />
      <IfCondition
        condition={StatisticalTab.careFoci === tab}
        whenTrue={<CareFosiList />}
      />
    </>
  );
};

export default StasticalReport;
