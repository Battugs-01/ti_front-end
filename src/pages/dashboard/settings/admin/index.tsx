import { Radio } from "antd";
import { IfCondition } from "components/condition";
import { SettingsTab } from "config";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Userlist } from "./user_list";

export const Admin: React.FC = () => {
  const [tab, setTab] = useState<SettingsTab>(SettingsTab.user_list);

  return (
    <>
      <Radio.Group
        optionType="button"
        defaultValue={tab}
        options={[
          {
            value: SettingsTab.user_list,
            label: <FormattedMessage id="user_list" />,
          },
        ]}
        size="large"
        onChange={(e: any) => {
          setTab(e.target.value);
        }}
      />
      <div className="mt-7"></div>

      <IfCondition
        condition={SettingsTab.user_list === tab}
        whenTrue={<Userlist />}
      />
    </>
  );
};
