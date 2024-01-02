import { useRequest } from "ahooks";
import { notification } from "antd";
import { ExportButton, IProgress } from "components/index";
import { ITable } from "components/table";
import { useEffect } from "react";
import order from "service/order";
import { OrderType } from "service/order/type";
import { exportFromTable } from "utils/export";
type Props = {
  serviceId: number;
};
export const SubscriptionList = ({ serviceId }: Props) => {
  const list = useRequest(order.list, {
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
    manual: true,
  });

  useEffect(() => {
    if (serviceId) {
      run();
    }
  }, [serviceId]);

  const run = (values?: any) =>
    list.run({
      service_id: serviceId,
      type: OrderType.subscription,
      ...values,
    });

  return (
    <ITable
      hideCreateButton
      total={list.data?.total}
      dataSource={list.data?.items}
      loading={list.loading}
      refresh={run}
      toolbarItems={
        <ExportButton
          onClick={() => {
            exportFromTable(
              ["Subscription"],
              window.document.getElementById("main-table") as HTMLElement,
              window
            );
          }}
        />
      }
      columns={[
        {
          dataIndex: "subscription_name",
          title: "Subscription Name",
        },
        {
          dataIndex: "subscription_duration",
          title: "Subscription Duration",
          render: (_, record) => {
            return (
              <IProgress
                isDayDuration
                startDate={record.created_at}
                endDate={record.subscription_end_date}
              />
            );
          },
        },
        {
          dataIndex: "subscription_description",
          title: "Subscription Description",
        },
      ]}
    />
  );
};
