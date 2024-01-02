import { useRequest } from "ahooks";
import { notification } from "antd";
import DashboardCard from "components/dashboard_card";
import { useAtom } from "jotai";
import { FC, useEffect } from "react";
import dashboard from "service/dashboard";
import { atomFormDashboard } from "../store";

const DashboardSection: FC = () => {
  const { data, run, loading } = useRequest(dashboard.dashboardStats, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  const [form] = useAtom(atomFormDashboard);

  const fetch = (values?: any) => {
    run({
      ...form,
      ...values,
    });
  };

  useEffect(() => {
    fetch();
  }, [form]);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-6  gap-6">
        <DashboardCard
          label="Total Merchants"
          amount={data?.total_merchants}
          percent={data?.merchant_percent}
          loading={loading}
        />
        <DashboardCard
          label="Total Income"
          amount={data?.total_income}
          percent={data?.income_percent}
          loading={loading}
        />
        <DashboardCard
          label="Total Online Customers"
          amount={data?.total_online_customers}
          percent={data?.online_customer_percent}
          loading={loading}
        />
        <DashboardCard
          label="Total Commission"
          amount={data?.total_commission_amount}
          percent={data?.commission_percent}
          loading={loading}
        />
        <DashboardCard
          label="Total Sales/Order"
          amount={data?.total_sales}
          percent={data?.sales_percent}
          loading={loading}
        />
        <DashboardCard
          label="Total Customers"
          amount={data?.total_customers}
          percent={data?.customer_percent}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default DashboardSection;
