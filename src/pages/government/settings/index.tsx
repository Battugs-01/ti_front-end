import { SetStateAction, useState } from "react";
import { Header } from "./header";
import { RadioType } from "service/gov-settings";
import { IfCondition } from "components/condition";
import { RightSettings } from "./tab/rightSettings";
import { FormList } from "./tab/formList";
import { PermissionSettings } from "./tab/permissionSettings";

const SettingsPage: React.FC = () => {
  const [tab, setTab] = useState<String>(RadioType.settings);

  const changeTab = (e: SetStateAction<any>) => {
    setTab(e.target.value);
  };
  return (
    <div>
      <Header changeTab={changeTab} />
      <IfCondition
        condition={tab === RadioType.settings}
        whenTrue={<PermissionSettings />}
      />
      <IfCondition
        condition={tab === RadioType.forms}
        whenTrue={<FormList />}
      />
    </div>
  );
};

export default SettingsPage;
