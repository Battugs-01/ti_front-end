import { useRequest } from "ahooks";
import { Avatar, notification } from "antd";
import DashboardCard from "components/dashboard_card";
import { useAtom } from "jotai";
import { useEffect } from "react";
import file from "service/file";
import merchantService from "service/merchantService";
import { calculateDeadlineDate, calculatePreviousDeadline } from "utils/index";
import { atomDashboardForm } from "../store";

type Props = {
  serviceId: number;
};
export const Statistics = ({ serviceId }: Props) => {
  const [form] = useAtom(atomDashboardForm);

  const dashboard = useRequest(merchantService.dashboard, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    let currDate = calculateDeadlineDate(form.deadline as any);
    dashboard.run(serviceId, {
      ...form,
      current_full_date: currDate,
      previous_full_date: calculatePreviousDeadline(form.deadline, currDate),
    });
  }, [form]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-5  gap-6">
      <DashboardCard
        label="Total income"
        amount={dashboard.data?.total_income}
        percent={dashboard.data?.income_percent}
        isMoney
        loading={dashboard.loading}
      />
      <DashboardCard
        label="Commission"
        amount={dashboard.data?.total_commission}
        percent={dashboard.data?.commission_percent}
        isMoney
        loading={dashboard.loading}
      />
      <DashboardCard
        label="Total Sales"
        amount={dashboard.data?.total_sales}
        percent={dashboard.data?.sales_percent}
        loading={dashboard.loading}
      />
      <DashboardCard
        label="Total Costumers"
        amount={dashboard.data?.total_customers}
        percent={dashboard.data?.customer_percent}
        loading={dashboard.loading}
      />
      <DashboardCard
        label="Reviews"
        amount={dashboard.data?.review?.total}
        loading={dashboard.loading}
        customItem={
          <Avatar.Group maxCount={4}>
            {dashboard.data?.review?.avatar_urls?.map((el, index) => {
              return (
                <Avatar
                  key={"review-" + index}
                  src={file.fileToUrl(el) ?? "/background/login.png"}
                />
              );
            })}
          </Avatar.Group>
        }
      />
    </div>
  );
};
