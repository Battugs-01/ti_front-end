import { Segmented } from "antd";
import { IfCondition } from "components/condition";
import { SettingsTab } from "config";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { AgencyList } from "./agency_list";
import { StackholderList } from "./stackholder_list";
import { Userlist } from "./user_list";

const Settings: React.FC = () => {
  const [tab, setTab] = useState<SettingsTab>(SettingsTab.agency_list);
  return (
    <>
      <Segmented
        options={[
          {
            value: SettingsTab.agency_list,
            label: <FormattedMessage id="agency_list" />,
          },
          {
            value: SettingsTab.stakeholder_list,
            label: <FormattedMessage id="stakeholder_list" />,
          },
          {
            value: SettingsTab.user_list,
            label: <FormattedMessage id="user_list" />,
          },
        ]}
        size="large"
        onChange={(e: any) => {
          setTab(e);
        }}
      />

      <div className="mt-7"></div>

      <IfCondition
        condition={SettingsTab.agency_list === tab}
        whenTrue={<AgencyList />}
      />
      <IfCondition
        condition={SettingsTab.stakeholder_list === tab}
        whenTrue={<StackholderList />}
      />
      <IfCondition
        condition={SettingsTab.user_list === tab}
        whenTrue={<Userlist />}
      />
    </>
  );
};

export default Settings;
