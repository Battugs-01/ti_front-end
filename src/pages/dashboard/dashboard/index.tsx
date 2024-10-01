import { Radio, Segmented } from "antd";
import { IfCondition } from "components/condition";
import { DashboardTab, ScreeningTab } from "config";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { All } from "./all";
import { Darkhan } from "./darkhan";

const Dashboard: React.FC = () => {
  const [tab, setTab] = useState<DashboardTab>(DashboardTab.all);
  return (
    <div>
      <Radio.Group
        optionType="button"
        value={tab}
        onChange={(e) => {
          setTab(e.target.value);
        }}
        options={[
          {
            label: <FormattedMessage id="all" />,
            value: DashboardTab.all,
          },
          {
            label: <FormattedMessage id="darkhan" />,
            value: DashboardTab.darkhan,
          },
          {
            label: <FormattedMessage id="mandal" />,
            value: DashboardTab.mandal,
          },
          {
            label: <FormattedMessage id="achlalt" />,
            value: DashboardTab.achlalt,
          },
        ]}
        size="large"
      />
      <div className="mt-6">
        <IfCondition condition={tab === DashboardTab.all} whenTrue={<All />} />
        <IfCondition
          condition={tab === DashboardTab.darkhan}
          whenTrue={<Darkhan />}
        />
      </div>
    </div>
  );
};

export default Dashboard;
