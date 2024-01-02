import { useRequest } from "ahooks";
import { notification } from "antd";
import { ExportButton, RenderPaymentChannel } from "components/index";
import { ITable } from "components/table";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { FC, useEffect } from "react";
import order from "service/order";
import { Order, OrderType } from "service/order/type";
import { exportFromTable } from "utils/export";
import { moneyFormat, tableCellFixed } from "utils/index";
import { atomOrderForm } from "../store";

const NotPickedUpTab: FC = () => {
  const [form] = useAtom(atomOrderForm);

  const { data, loading, run } = useRequest(order.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  // const check = useRequest(order.check, {
  //   manual: true,
  //   onError: (err) =>
  //     notification.error({
  //       message: err.message,
  //     }),
  //   onSuccess: (e) => {
  //     if (e.is_paid) {
  //       notification.success({
  //         message: "Paid",
  //       });
  //       refresh();
  //     } else {
  //       notification.error({
  //         message: "Unpaid",
  //       });
  //     }
  //   },
  // });

  const mustFilter = {
    is_paid: "0",
    type: OrderType.default,
    is_payment_succeed: "1",
  };

  useEffect(() => {
    run({
      ...form,
      ...mustFilter,
      created_at: form.full_date,
    });
  }, [form]);

  return (
    <>
      <ITable<Order>
        hideCreateButton
        toolbarItems={
          <ExportButton
            onClick={() => {
              exportFromTable(
                ["Not picked up Orders"],
                window.document.getElementById("main-table") as HTMLElement,
                window
              );
            }}
          />
        }
        loading={loading}
        total={data?.total || 0}
        dataSource={data?.items || []}
        refresh={(values) => run({ ...form, ...mustFilter, ...values })}
        columns={[
          {
            dataIndex: "order_uuid",
            valueType: "string",
            title: "Order №",
          },
          {
            dataIndex: "customer_name",
            title: "Customer Name",
          },
          {
            dataIndex: "customer_email",
            title: "Customer Email",
            render: (_, record) => (
              <span className="text-md text-gray-600 font-medium">
                {record.customer?.email}
              </span>
            ),
          },
          {
            dataIndex: "service",
            valueType: "string",
            title: "Merchant Name",
            render: (_, record) => `${record.service?.name || "-"}`,
          },
          {
            dataIndex: "product_name",
            valueType: "string",
            title: "Product Name",
          },
          {
            dataIndex: "unit",
            valueType: "number",
            title: "Unit",
          },
          {
            dataIndex: "regular_price",
            valueType: "number",
            title: "Price",
            render: (_, record) =>
              `${moneyFormat(record.regular_price, "mnt")}`,
          },
          {
            dataIndex: "purchased_price",
            valueType: "number",
            title: "Total Price",
            render: (_, record) =>
              `${moneyFormat(record.purchased_price, "mnt")}`,
          },
          {
            dataIndex: "payment_channel",
            valueType: "string",
            title: "Payment Channel",
            render: (_, record) => (
              <RenderPaymentChannel channel={record.payment_channel} />
            ),
          },

          {
            dataIndex: "created_at",
            ...tableCellFixed(200),
            valueType: "date",
            title: "Order Date",
            render: (_, record) =>
              dayjs(record.created_at).format("YYYY-MM-DD HH:mm"),
          },
        ]}
        details={data?.items || []}
      // customActions={(record) => {
      //   return (
      //     <CheckButton
      //       tooltipTitle="Check Payment"
      //       loading={check.loading && check.params?.[0] === record.order_uuid}
      //       disabled={
      //         check.loading && check.params?.[0] === record.order_uuid
      //       }
      //       onClick={() => {
      //         check.run(record.order_uuid);
      //       }}
      //     />
      //   );
      // }}
      />
    </>
  );
};

export default NotPickedUpTab;
