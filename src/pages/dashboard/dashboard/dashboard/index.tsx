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
          description="Үйлчилгээ үзээлсэн тоо"
          label="Давхардсан тоогоор"
          amount={data?.total_merchants}
          percent={data?.merchant_percent}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default DashboardSection;
