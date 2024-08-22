import { Radio, Segmented } from "antd";
import { IfCondition } from "components/condition";
import { SettingsTab } from "config";
import { useState } from "react";
import PermissionControl from "./permission-control";
import CareFosi from "./care-fosi";
import { FormattedMessage } from "react-intl";

const Settings: React.FC = () => {
  const [tab, setTab] = useState<SettingsTab>(SettingsTab.permission);
  return (
    <>
      <Segmented
        options={[
          {
            value: SettingsTab.permission,
            label: <FormattedMessage id="permission_control" />,
          },
          {
            value: SettingsTab.careFoci,
            label: <FormattedMessage id="care_foci_list" />,
          },
        ]}
        size="large"
        onChange={(e: any) => {
          setTab(e);
        }}
      />

      <div className="mt-7"></div>
      <IfCondition
        condition={SettingsTab.permission === tab}
        whenTrue={<PermissionControl />}
      />
      <IfCondition
        condition={SettingsTab.careFoci === tab}
        whenTrue={<CareFosi />}
      />
    </>
  );
};

export default Settings;
