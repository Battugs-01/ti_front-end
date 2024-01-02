import { useRequest } from "ahooks";
import { Checkbox, notification } from "antd";
import { ExportButton, ITable, RenderPaymentChannel } from "components/index";
import { useEffect, useState } from "react";

import { ConfirmButton } from "components/button/action";
import { useAtom } from "jotai";
import { Order } from "service/order/type";
import statement from "service/statement";
import { exportFromTable } from "utils/export";
import { moneyFormat } from "utils/index";
import { Commission } from "./part/commission";
import { atomStatementStore } from "./store";
import { BsCheck2Circle, BsCircle } from "react-icons/bs";

export const ListStatement = () => {
  const [form] = useAtom(atomStatementStore);
  const [selectedOrderIDS, setSelectedOrderIDS] = useState<number[]>([]);

  const { data, loading, run } = useRequest(statement.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    refresh();
  }, [form]);

  const refresh = (values?: any) =>
    run({
      ...form,
      ...values,
    });

  const confirm = useRequest(statement.confirm, {
    manual: true,
    onSuccess: () => {
      setSelectedOrderIDS([]);
      refresh();
    },
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  console.log(data);

  return (
    <>
      <ITable<Order>
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys) => {
            setSelectedOrderIDS(selectedRowKeys as any);
          },
        }}
        hideCreateButton
        toolbarItems={
          <div className="flex items-center gap-2">
            <ExportButton
              onClick={() => {
                exportFromTable(
                  ["Statement"],
                  window.document.getElementById("main-table") as HTMLElement,
                  window
                );
              }}
            />
            <ConfirmButton
              size="large"
              disabled={selectedOrderIDS.length <= 0}
              loading={confirm.loading}
              onClick={() => {
                if (selectedOrderIDS.length > 0) {
                  confirm.run({ order_ids: selectedOrderIDS, ...form });
                }
              }}
            />
          </div>
        }
        total={data?.total || 0}
        dataSource={data?.items}
        columns={[
          {
            title: "Merchant Name",
            dataIndex: "name",
            valueType: "string",
            render: (_, record) => record.service?.name,
          },
          {
            dataIndex: "account_bank",
            title: "Bank",
            render: (_, record) => (
              <RenderPaymentChannel channel={record?.payment_channel} />
            ),
          },
          {
            dataIndex: "regular_price",

            title: "Price",
            width: 100,
            render: (_, record) => moneyFormat(record.regular_price, "mnt"),
          },
          {
            dataIndex: "purchased_price",
            valueType: "number",
            title: "Total Price",
            width: 100,
            render: (_, record) => moneyFormat(record.purchased_price, "mnt"),
          },
          {
            title: "Commission (Product Type)",
            width: 150,
            render: (_, record) => {
              return (
                <Commission
                  totalOrderAmount={record.purchased_price}
                  commissionPercent={record.commission}
                  totalCommissionAmount={record.commission_amount}
                />
              );
            },
          },
          {
            title: "Transfer amount",
            sorter: true,
            dataIndex: "transfer_amount",
            render: (_, record) =>
              moneyFormat(record.purchased_price - record.commission_amount) +
              " ₮",
          },
          {
            title: "Confirmed",
            dataIndex: "is_confirmed",
            render: (_, record) => <Checkbox checked={record.is_confirmed} />,
          },
          {
            title: "Employee",
            dataIndex: "employee",
            valueType: "string",
          },
        ]}
        loading={loading}
        refresh={refresh}
      />
    </>
  );
};
