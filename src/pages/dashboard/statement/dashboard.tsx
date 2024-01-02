import { useRequest } from "ahooks";
import { message } from "antd";
import DashboardCard from "components/dashboard_card";
import { useAtom } from "jotai";
import { useEffect } from "react";
import statement from "service/statement";
import { atomStatementStore } from "./store";

export const Dashboard = () => {
  const [form] = useAtom(atomStatementStore);
  const dashboard = useRequest(statement.dashboard, {
    manual: true,
    onError: (err) => message.error(err.message),
  });

  useEffect(() => {
    dashboard.run({ ...form });
  }, [form]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
      <DashboardCard
        label="Total Order"
        amount={dashboard.data?.total_order_amount}
        isMoney
        loading={dashboard.loading}
      />
      <DashboardCard
        label="Total Commission"
        amount={dashboard.data?.total_commission_amount}
        isMoney
        loading={dashboard.loading}
      />
      <DashboardCard
        label="Events & Ticket"
        amount={dashboard.data?.total_event_amount}
        isMoney
        loading={dashboard.loading}
      />
      <DashboardCard
        label="Coupon"
        amount={dashboard.data?.total_coupon_amount}
        isMoney
        loading={dashboard.loading}
      />
      <DashboardCard
        label="Product"
        amount={dashboard.data?.total_product_amount}
        isMoney
        loading={dashboard.loading}
      />
    </div>
  );
};
