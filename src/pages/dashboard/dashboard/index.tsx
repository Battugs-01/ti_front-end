import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { notification, Radio } from "antd";
import { IfCondition } from "components/condition";
import { DashboardTab, UserRoleType } from "config";
import { AuthContext } from "context/auth";
import { useContext, useState } from "react";
import { FormattedMessage } from "react-intl";
import agencyList from "service/settings/agency_list";
import { Admin } from "./admin";
import { OtherAgency } from "./admin/other_agency";
import { Other } from "./other_roles";

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
      {user?.user?.role === UserRoleType.super_admin ||
      user?.user?.role === UserRoleType.stack_holder ? (
        <>
          {listAgency.loading && <PageLoading />}
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

            <IfCondition
              condition={tab !== DashboardTab.all}
              whenTrue={<OtherAgency id={tab as unknown as number} />}
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
