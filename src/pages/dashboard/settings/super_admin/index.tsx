import { Radio } from "antd";
import { IfCondition } from "components/condition";
import { SettingsTab } from "config";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { AgencyList } from "./agency_list";
import { StackholderList } from "./stackholder_list";

export const SuperAdmin: React.FC = () => {
  const [tab, setTab] = useState<SettingsTab>(SettingsTab.agency_list);

  return (
    <>
      <Radio.Group
        optionType="button"
        defaultValue={tab}
        options={[
          {
            value: SettingsTab.agency_list,
            label: <FormattedMessage id="agency_list" />,
          },
          {
            value: SettingsTab.stakeholder_list,
            label: <FormattedMessage id="stakeholder_list" />,
          },
        ]}
        size="large"
        onChange={(e: any) => {
          setTab(e.target.value);
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
    </>
  );
};
