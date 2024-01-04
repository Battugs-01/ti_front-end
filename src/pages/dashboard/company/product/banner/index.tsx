import { useRequest } from "ahooks";
import { Badge, message, Image, Progress, notification } from "antd";
import { ExportButton, ITable, RenderProductStatus } from "components/index";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { DetailBanner } from "pages/dashboard/products/banner/detail";
import { UpdateBanner } from "pages/dashboard/products/banner/update";
import { useEffect } from "react";
import file from "service/file";
import merchantService from "service/merchantService";
import product from "service/product";
import { Product } from "service/product/type";
import { diffDates, moneyFormat, tableCellFixed } from "utils/index";
import { atomProductForm } from "../store";
import { exportFromTable } from "utils/export";

export const BannerList = () => {
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
      refresh={run}
      hideCreateButton
      total={list.data?.total}
      dataSource={list.data?.items}
      loading={list.loading}
      toolbarItems={
        <ExportButton
          onClick={() => {
            exportFromTable(
              ["Banner Products"],
              window.document.getElementById("main-table") as HTMLElement,
              window
            );
          }}
        />
      }
      columns={[
        {
          ...tableCellFixed(142),
          dataIndex: "name",
          title: "Image",
          render: (_, record) => (
            <Image
              src={
                record.banner
                  ? file.fileToUrl(record.banner)
                  : "/background/login.png"
              }
              height={40}
              className="rounded"
            />
          ),
        },
        {
          ...tableCellFixed(100),
          dataIndex: "status",
          title: "Status",
          render: (_, record) => <RenderProductStatus status={record.status} />,
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
              <div className="flex items-center gap-2">
                <Progress
                  strokeColor={"#144E5A"}
                  percent={
                    dayjs(record.end_date).isAfter(dayjs())
                      ? ((totaldays - current) * 100) / totaldays
                      : 0
                  }
                  showInfo={false}
                />
                <div className="text-gray-700 font-medium">
                  {current <= totaldays ? totaldays - current : 0}
                </div>
              </div>
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
      DetailComponent={DetailBanner}
      UpdateComponent={UpdateBanner}
      RemoveModelConfig={{
        action: product.remove,
        config: (record) => {
          return {
            title: "Remove",
            uniqueKey: record?.id,
            display: record?.name,
          };
        },
      }}
    />
  );
};
