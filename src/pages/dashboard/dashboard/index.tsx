import { notification, Radio } from "antd";
import { IfCondition } from "components/condition";
import { DashboardTab, UserRoleType } from "config";
import { AuthContext } from "context/auth";
import { useContext, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Admin } from "./admin";
import { Other } from "./other";
import { useRequest } from "ahooks";
import agencyList from "service/settings/agency_list";

const Dashboard: React.FC = () => {
  const [tab, setTab] = useState<DashboardTab>(DashboardTab.all);
  const [user] = useContext(AuthContext);
  const listAgency = useRequest(
    async () => agencyList.list({ current: 1, pageSize: 20 }),
    {
      onError: (err) => {
        notification.error({
          message: err,
        });
      },
    }
  );
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
            size="large"
          >
            <Radio.Button value={DashboardTab.all}>
              <FormattedMessage id="all" />
            </Radio.Button>
            {listAgency?.data?.items?.slice(0, 5).map((item) => (
              <Radio.Button key={item.id} value={item.id}>
                {item.name}
              </Radio.Button>
            ))}
          </Radio.Group>
          <div className="mt-6">
            <IfCondition
              condition={tab === DashboardTab.all}
              whenTrue={<Admin />}
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
