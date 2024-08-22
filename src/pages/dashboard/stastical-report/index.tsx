import { Radio, Segmented } from "antd";
import { IfCondition } from "components/condition";
import { StatisticalTab } from "config";
import { useState } from "react";
import Statistical from "./statistical";
import CareFosiList from "./care-fosi";
import { FormattedMessage } from "react-intl";

const StasticalReport = () => {
  const [tab, setTab] = useState<StatisticalTab>(StatisticalTab.statistical);
  return (
    <>
      <Segmented
        options={[
          {
            value: StatisticalTab.statistical,
            label: <FormattedMessage id="statistical" />,
          },
          {
            value: StatisticalTab.careFoci,
            label: <FormattedMessage id="by_care_foci" />,
          },
        ]}
        size="large"
        onChange={(e: any) => {
          setTab(e);
        }}
      />
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
