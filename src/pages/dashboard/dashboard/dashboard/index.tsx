import { useRequest } from "ahooks";
import { notification } from "antd";
import DashboardCard from "components/dashboard_card";
import { useAtom } from "jotai";
import { FC, useEffect } from "react";
import dashboard from "service/dashboard";
import { atomFormDashboard } from "../store";
import DashboardAccessCard from "components/access-card";

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
    <div className="grid">
      <div className="flex flex-col gap-6">
        <DashboardCard
          description="Үйлчилгээ үзүүлсэн тоо"
          label="Давхардсан тоогоор"
          amount={data?.total_merchants}
          percent={data?.merchant_percent}
          loading={loading}
        />
        <DashboardAccessCard
          description="Асрамжийн газрын хүртээмж"
          label="Хугацаа дуусах:"
          amount={data?.total_merchants || 12}
          percent={data?.merchant_percent || 12 / 8}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default DashboardSection;
