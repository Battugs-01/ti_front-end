import { useRequest } from "ahooks";
import { notification } from "antd";
import Badge from "components/badge";
import { ExportButton, IProgress, ITable } from "components/index";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { DetailNews } from "pages/dashboard/products/news/detail";
import { UpdateNews } from "pages/dashboard/products/news/update";
import { useEffect } from "react";
import merchantService from "service/merchantService";
import product from "service/product";
import { Product } from "service/product/type";
import { diffDates, moneyFormat, tableCellFixed } from "utils/index";
import { atomProductForm } from "../store";
import { exportFromTable } from "utils/export";

export const NewsList = () => {
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
    form.serviceId && list.run(form.serviceId, { type: form.tab, ...values });

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
              ["News Products"],
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
          title: "Title",
        },
        {
          ...tableCellFixed(200),
          dataIndex: "status",
          title: "Status",
          render: (_, record) => {
            let isActive = dayjs(record.end_date).isAfter(dayjs());
            return (
              <Badge
                title={isActive ? "Active" : "Ended"}
                color={isActive ? "green" : "gray"}
              />
            );
          },
        },
        {
          ...tableCellFixed(200),
          dataIndex: "start_date",
          title: "Start date",
          render: (_, record) => dayjs(record.start_date).format("MMM D HH:mm"),
        },
        {
          ...tableCellFixed(200),
          dataIndex: "end_date",
          title: "End date",
          render: (_, record) => dayjs(record.end_date).format("MMM D HH:mm"),
        },

        {
          ...tableCellFixed(300),
          dataIndex: "due_date",
          title: "Due Date",
          render: (_, record) => {
            let totaldays = diffDates(
              record.end_date,
              record.start_date,
              "days"
            );
            let current = diffDates(
              dayjs().toDate(),
              record.start_date,
              "days"
            );
            return (
              <IProgress
                percent={
                  dayjs(record.end_date).isAfter(dayjs())
                    ? ((totaldays - current) * 100) / totaldays
                    : 0
                }
                days={current <= totaldays ? totaldays - current : 0}
              />
            );
          },
        },

        {
          ...tableCellFixed(200),
          dataIndex: "regular_price",
          title: "Price",
          render: (_, record) => moneyFormat(record.regular_price),
        },

        {
          ...tableCellFixed(200),
          dataIndex: "amount",
          title: "Amount",
          render: (_, record) => {
            let totalDays = diffDates(
              record.end_date,
              record.start_date,
              "days"
            );
            let totalAmount =
              totalDays > 0 ? moneyFormat(totalDays * record.regular_price) : 0;
            return `${totalAmount} ₮`;
          },
        },
      ]}
      DetailComponent={DetailNews}
      UpdateComponent={UpdateNews}
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
