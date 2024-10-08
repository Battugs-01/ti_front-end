import { Radio } from "antd";
import { IfCondition } from "components/condition";
import { DashboardTab, UserRoleType } from "config";
import { AuthContext } from "context/auth";
import { useContext, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Admin } from "./admin";
import { Other } from "./other";

const Dashboard: React.FC = () => {
  const [tab, setTab] = useState<DashboardTab>(DashboardTab.all);
  const [user] = useContext(AuthContext);
  return (
    <div>
      {user?.user?.role === UserRoleType.super_admin ? (
        <>
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
            <IfCondition
              condition={tab === DashboardTab.all}
              whenTrue={<Admin />}
            />
            <IfCondition
              condition={tab === DashboardTab.darkhan}
              whenTrue={<>Tab</>}
            />
          </div>
        </>
      ) : (
        <Other />
      )}
    </div>
  );
};

export default Dashboard;
