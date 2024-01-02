import { useRequest } from "ahooks";
import { notification } from "antd";
import Badge from "components/badge";
import { ExportButton, ITable, RenderProductStatus } from "components/index";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { DetailProduct } from "pages/dashboard/products/modal/detail";
import { UpdateCoupon } from "pages/dashboard/products/coupon/update";
import { useEffect } from "react";
import merchantService from "service/merchantService";
import product from "service/product";
import { Product } from "service/product/type";
import { moneyFormat, tableCellFixed } from "utils/index";
import { atomProductForm } from "../store";
import { exportFromTable } from "utils/export";

export const CouponList = () => {
  const [form] = useAtom(atomProductForm);

  const list = useRequest(merchantService.products, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    if (form.serviceId) {
      run();
    }
  }, [form]);

  const run = (values?: any) =>
    form.serviceId &&
    list.run(form.serviceId, { type: form.tab, is_order: true, ...values });

  return (
    <ITable<Product>
      hideCreateButton
      total={list.data?.total}
      dataSource={list.data?.items}
      loading={list.loading}
      refresh={run}
      toolbarItems={
        <ExportButton
          onClick={() => {
            exportFromTable(
              ["Coupon Products"],
              window.document.getElementById("main-table") as HTMLElement,
              window
            );
          }}
        />
      }
      columns={[
        {
          ...tableCellFixed(200),
          dataIndex: "name",
          title: "Name",
        },
        {
          ...tableCellFixed(200),
          dataIndex: "status",
          title: "Status",
          render: (_, record) => <RenderProductStatus status={record.status} />,
        },
        {
          ...tableCellFixed(200),
          title: "Duration of use",
          render: (_, record) =>
            `${dayjs(record.start_date).format("D MMM, YYYY")}-${dayjs(
              record.end_date
            ).format("D MMM, YYYY")}`,
        },
        {
          ...tableCellFixed(200),
          title: "Ticket",
          render: (_, record) => {
            let isValid = (record.orders?.length || 0) < record.limit;
            return (
              <Badge
                title={isValid ? "Yes" : "No"}
                color={isValid ? "green" : "gray"}
              />
            );
          },
        },
        {
          ...tableCellFixed(200),
          title: "Unit Solid",
          render: (_, record) =>
            `${record.orders?.length || 0}/${record.limit}`,
        },
        {
          ...tableCellFixed(200),
          dataIndex: "regular_price",
          title: "Price",
          render: (_, record) => moneyFormat(record.regular_price),
        },
        {
          ...tableCellFixed(200),
          dataIndex: "discount_percentage",
          title: "Discount",
          render: (_, record) => `${record.discount_percentage}%`,
        },
        {
          ...tableCellFixed(200),
          dataIndex: "amount",
          title: "Amount",
          render: (_, record) =>
            `${moneyFormat(
              ((record.discount_percentage * 100) / record.regular_price) *
              record.unit_sold,
              "mnt"
            )}`,
        },
      ]}
      DetailComponent={DetailProduct}
      UpdateComponent={UpdateCoupon}
      RemoveModelConfig={{
        action: product.remove,
        config: (record) => {
          return {
            title: "Remove",
            uniqueKey: record?.id ?? 0,
            display: record?.name,
          };
        },
      }}
    />
  );
};
