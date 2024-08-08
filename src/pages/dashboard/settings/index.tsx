import { Radio } from "antd";
import { IfCondition } from "components/condition";
import { SettingsTab } from "config";
import { useState } from "react";
import PermissionControl from "./permission-control";
import CareFosi from "./care-fosi";

const Settings: React.FC = () => {
  const [tab, setTab] = useState<SettingsTab>(SettingsTab.permission);
  return (
    <>
      <Radio.Group
        defaultValue={SettingsTab.permission}
        size="large"
        onChange={(e) => {
          setTab(e.target.value);
        }}
      >
        <Radio.Button value={SettingsTab.permission}>
          Permission control
        </Radio.Button>
        <Radio.Button value={SettingsTab.careFoci}>Care Foci List</Radio.Button>
      </Radio.Group>
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
