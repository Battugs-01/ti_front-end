import { useRequest } from "ahooks";
import { notification } from "antd";
import { ExportButton, ITable } from "components/index";
import { FC, useEffect } from "react";
import order from "service/order";
import { Order } from "service/order/type";
import { exportFromTable } from "utils/export";
import { renderEnDate } from "utils/index";

interface Props {
  customerId?: number;
}

const OrdersTab: FC<Props> = ({ customerId }) => {
  const { data, run, loading } = useRequest(order.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    if (customerId) {
      run({
        page: 0,
        limit: 20,
        customer_id: customerId,
        is_paid: "1",
      });
    }
  }, [customerId]);

  return (
    <>
      <ITable<Order>
        style={{ marginTop: "20px" }}
        loading={loading}
        hideCreateButton
        total={data?.total || 0}
        refresh={(values) => run({ customer_id: customerId, ...values })}
        dataSource={data?.items}
        toolbarItems={
          <ExportButton
            onClick={() => {
              exportFromTable(
                ["Orders"],
                window.document.getElementById("main-table") as HTMLElement,
                window
              );
            }}
          />
        }


        columns={[
          {
            dataIndex: "order_uuid",
            valueType: "string",
            title: "Order №",
          },
          {
            dataIndex: "product",
            valueType: "string",
            title: "Event Name",
            render: (_, record) => record.product?.name,
          },
          {
            dataIndex: "event_date",
            valueType: "string",
            title: "Event Date",
            render: (_, record) => renderEnDate(record.product?.start_date),
          },
          {
            dataIndex: "unit",
            valueType: "string",
            title: "Unit",
          },
          {
            dataIndex: "purchased_price",
            valueType: "string",
            title: "Price",
          },
          {
            dataIndex: "email",
            valueType: "string",
            title: "Email",
          },
          {
            dataIndex: "customer_phone",
            valueType: "string",
            title: "Phone",
          },
          {
            dataIndex: "created_at",
            valueType: "date",
            title: "Date",
          },
          {
            dataIndex: "status",
            valueType: "string",
            title: "Host",
            render: (_, record) => record.service?.name,
          },
        ]}
      />
    </>
  );
};

export default OrdersTab;
