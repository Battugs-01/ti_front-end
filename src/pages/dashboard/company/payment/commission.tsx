import { ProFormDateRangePicker } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { notification } from "antd";
import { ExportButton, ITable, RenderPaymentChannel } from "components/index";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import order from "service/order";
import { Order, OrderType } from "service/order/type";
import { exportFromTable } from "utils/export";
import { moneyFormat, tableCellFixed } from "utils/index";

type Props = {
  serviceId: number;
};
export const CommissionList = ({ serviceId }: Props) => {
  const [dateFilter, setDateFilter] = useState<Date[]>();
  const list = useRequest(order.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  useEffect(() => {
    if (serviceId) {
      run();
    }
  }, [serviceId, dateFilter]);

  const run = (values?: any) =>
    list.run({
      service_id: serviceId,
      type: OrderType.default,
      is_transfered: "0",
      created_at: dateFilter,
      is_paid: "1",
      ...values,
    });

  return (
    <ITable<Order>
      hideCreateButton
      total={list.data?.total}
      dataSource={list.data?.items}
      refresh={(values) => run(values)}
      toolbarItems={
        <div className="custom-ant-item-margin-remove flex gap-2">
          <ProFormDateRangePicker
            fieldProps={{
              onChange: (values) => {
                setDateFilter(values?.map((el) => dayjs(el).toDate()));
              },
            }}
          />
          <ExportButton
            onClick={() => {
              exportFromTable(
                ["Commission"],
                window.document.getElementById("main-table") as HTMLElement,
                window
              );
            }}
          />
        </div>
      }
      columns={[
        {
          ...tableCellFixed(200),
          dataIndex: "created_at",
          title: "Date",
          render: (_, record) =>
            dayjs(record.created_at).format("D, MMM YYYY, HH:mm"),
        },
        {
          ...tableCellFixed(200),
          dataIndex: "payment_channel",
          title: "Bank",
          render: (_, record) => (
            <div className="flex items-center gap-2">
              <RenderPaymentChannel
                channel={record.payment_channel}
                hideLabel
              />
              <div className="text-gray-700 font-medium">
                {record.service?.account_bank}
              </div>
            </div>
          ),
        },
        {
          ...tableCellFixed(200),
          dataIndex: "regular_price",
          title: "Amount",
          render: (_, record) => moneyFormat(record.regular_price) + " ₮",
        },
        {
          ...tableCellFixed(200),
          dataIndex: "Commission",
          title: "Commission",
          render: (_, record) => record.commission + " %",
        },
        {
          ...tableCellFixed(200),
          title: "Transfer amount",
          render: (_, record) => {
            return (
              <div>
                {moneyFormat(
                  record.purchased_price - record.commission_amount
                ) + " ₮"}
              </div>
            );
          },
        },
      ]}
    />
  );
};
