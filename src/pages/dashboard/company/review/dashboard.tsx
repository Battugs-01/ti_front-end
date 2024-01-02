import { useRequest } from "ahooks";
import { Card, notification } from "antd";
import { useEffect } from "react";
import review from "service/review";

type Props = {
  label: string;
  value?: any;
};
const DashboardCard = ({ label, value }: Props) => {
  return (
    <Card
      headStyle={{
        display: "none",
      }}
      className=" shadow-sm"
    >
      <span className="text-gray-600 font-normal">{label} </span>
      <div className="text-gray-900 text-2xl font-medium mt-3">{value ?? 0}</div>
    </Card>
  );
};

type PropsDashboard = {
  serviceId: number;
};

export const Dashboard = ({ serviceId }: PropsDashboard) => {
  const dashboard = useRequest(review.dashboard, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    if (serviceId) dashboard.run(serviceId);
  }, [serviceId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      <DashboardCard
        label="Taste"
        value={dashboard.data?.average_taste?.toFixed(1)}
      />
      <DashboardCard
        label="Environment"
        value={dashboard.data?.average_environment?.toFixed(1)}
      />
      <DashboardCard
        label="Service"
        value={dashboard.data?.average_service?.toFixed(1)}
      />
      <DashboardCard
        label="Price"
        value={dashboard.data?.average_price?.toFixed(1)}
      />
    </div>
  );
};
