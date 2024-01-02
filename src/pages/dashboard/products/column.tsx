import { ProColumns } from "@ant-design/pro-table";
import Badge from "components/badge";
import { IProgress, ITag, RenderProductStatus } from "components/index";
import dayjs from "dayjs";
import { Product } from "service/product/type";
import {
  capitalizate,
  diffDates,
  isValidDate,
  moneyFormat,
  tableCellFixed,
} from "utils/index";

export const ProductColumnStatus: ProColumns<Product, any> = {
  ...tableCellFixed(150),
  dataIndex: "status",
  title: "Status",
  render: (_, record) => <RenderProductStatus status={record.status} />,
};
export const ProductColumnType: ProColumns<Product, any> = {
  dataIndex: "type",
  title: "Type",
  render: (_, record) => capitalizate(record.category),
};
export const ProductColumnName: ProColumns<Product, any> = {
  ...tableCellFixed(150),
  dataIndex: "name",
  title: "Name",
  render: (_, record) => (
    <span className="text-md text-gray-900 font-medium">{record.name}</span>
  ),
};
export const ProductColumnDiscountDuration: ProColumns<Product, any> = {
  ...tableCellFixed(200),
  title: "Discount Duration",
  render: (_, record) => {
    return (
      <IProgress
        isDayDuration
        endDate={record.discount_end_date}
        startDate={record.discount_start_date}
      />
    );
  },
};
export const ProductColumnHost: ProColumns<Product, any> = {
  ...tableCellFixed(150),
  dataIndex: "service",
  title: "Merchant",
  render: (_, record) => `${record.service?.name || "-"}`,
};
export const ProductColumnLimitation: ProColumns<Product, any> = {
  dataIndex: "has_limit",
  title: "Limitation",
  render: (_, record) => (
    <ITag value={record.has_limit ? "Limited" : "Unlimited"} />
  ),
};
export const ProductColumnUnitSold: ProColumns<Product, any> = {
  dataIndex: "unit_sold",
  title: "Unit sold",
  render: (_, record) =>
    `${record.unit_sold ?? 0}/${record.original_limit ?? 0}`,
};
export const ProductColumnPrice: ProColumns<Product, any> = {
  ...tableCellFixed(150),
  title: "Price",
  dataIndex: "regular_price",
  render: (_, record) => `${moneyFormat(record.regular_price, "mnt") || "-"}`,
};
export const ProductColumnDiscount: ProColumns<Product, any> = {
  title: "Discount",
  dataIndex: "discount",
  render: (_, record) => `${record.discount_percentage} %`,
};
export const ProductColumnAmount: ProColumns<Product, any> = {
  ...tableCellFixed(150),
  title: "Amount",
  dataIndex: "amount",
  render: (_, record) =>
    `${
      moneyFormat(
        (record.regular_price * record.discount_percentage) / 100,
        "mnt"
      ) || "-"
    }`,
};
export const ProductColumnDates: ProColumns<Product, any>[] = [
  {
    ...tableCellFixed(150),
    title: "Start Date",
    dataIndex: "start_date",
    valueType: "dateTime",
    render: (_, record) =>
      isValidDate(record.start_date)
        ? dayjs(record.start_date).format("D MMM, YYYY")
        : "-",
  },
  {
    ...tableCellFixed(150),
    title: "End Date",
    dataIndex: "end_date",
    valueType: "dateTime",
    render: (_, record) =>
      isValidDate(record.end_date)
        ? dayjs(record.end_date).format("D MMM, YYYY")
        : "-",
  },
];
export const ProductColumnDiscountDates: ProColumns<Product, any>[] = [
  {
    ...tableCellFixed(150),
    title: "Discount Start Date",
    dataIndex: "discount_start_date",
    valueType: "dateTime",
    render: (_, record) =>
      isValidDate(record.discount_start_date)
        ? dayjs(record.discount_start_date).format("D MMM, YYYY")
        : "-",
  },
  {
    ...tableCellFixed(150),
    title: "Discount End Date",
    dataIndex: "discount_end_date",
    valueType: "dateTime",
    render: (_, record) =>
      isValidDate(record.discount_end_date)
        ? dayjs(record.discount_end_date).format("D MMM, YYYY")
        : "-",
  },
];
export const ProductColumnTicket: ProColumns<Product, any> = {
  title: "Ticket",
  dataIndex: "status",
  render: (_, record) => (
    <Badge
      title={record.limit > record.unit_sold ? "Yes" : "No"}
      color={record.limit > record.unit_sold ? "green" : "gray"}
    />
  ),
};
export const ProductColumnDateProgress: ProColumns<Product, any> = {
  ...tableCellFixed(250),
  dataIndex: "due_date",
  title: "Due date",
  render: (_, record) => (
    <IProgress
      isDayDuration
      endDate={record.end_date}
      startDate={record.start_date}
    />
  ),
};
export const ProductColumnTotalPrice: ProColumns<Product, any> = {
  ...tableCellFixed(150),
  title: "Total Price",
  dataIndex: "total_price",
  render: (_, record) =>
    `${
      moneyFormat(
        record.regular_price *
          diffDates(record.end_date, record.start_date, "days"),
        "mnt"
      ) || "-"
    }`,
};
