import { useRequest } from "ahooks";
import { notification } from "antd";
import {
  ExportButton,
  RenderPaymentChannel,
  SectionField,
} from "components/index";
import { IProFormSelect } from "components/select";
import { ITable } from "components/table";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { FC, useEffect } from "react";
import merchant from "service/merchant";
import order from "service/order";
import { Order, OrderType } from "service/order/type";
import product from "service/product";
import { exportFromTable } from "utils/export";
import { moneyFormat, tableCellFixed } from "utils/index";
import { atomOrderForm } from "../store";
import merchantService from "service/merchantService";

const ConfirmedTab: FC = () => {
  const [form, setForm] = useAtom(atomOrderForm);

  const { data, loading, run } = useRequest(order.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const mustFilter = {
    is_paid: "1",
    type: OrderType.default,
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
      <div className="flex gap-4 ">
        <SectionField label="Merchant">
          <IProFormSelect
            fieldProps={{
              size: "large",
              mode: "multiple",
            }}
            onChange={(e?: number[]) => {
              setForm({
                ...form,
                ...mustFilter,
                merchant_ids: (e?.length || 0) > 0 ? e : undefined,
              });
            }}
            request={merchantService.list}
            fieldNameForLabel="name"
            width={200}
          />
        </SectionField>
        <SectionField label="Product Name">
          <IProFormSelect
            fieldProps={{
              size: "large",
              mode: "multiple",
            }}
            onChange={(e?: number[]) => {
              setForm({
                ...form,
                ...mustFilter,
                product_ids: (e?.length || 0) > 0 ? e : undefined,
              });
            }}
            request={product.list}
            fieldNameForLabel="name"
            width={200}
          />
        </SectionField>
      </div>
      <ITable<Order>
        hideCreateButton
        toolbarItems={
          <ExportButton
            onClick={() => {
              exportFromTable(
                ["Confirmed Orders"],
                window.document.getElementById("main-table") as HTMLElement,
                window
              );
            }}
          />
        }
        loading={loading}
        total={data?.total || 0}
        dataSource={data?.items || []}
        refresh={(values) => run({ ...form, ...values, ...mustFilter })}
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
            render: (_, record) => `${moneyFormat(record.regular_price)}`,
          },
          {
            dataIndex: "purchased_price",
            valueType: "number",
            title: "Total Price",
            render: (_, record) => `${moneyFormat(record.purchased_price)}`,
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
            valueType: "date",
            ...tableCellFixed(200),
            title: "Order Date",
            render: (_, record) =>
              dayjs(record.created_at).format("YYYY-MM-DD HH:mm"),
          },
        ]}
        details={data?.items || []}
      />
    </>
  );
};

export default ConfirmedTab;
