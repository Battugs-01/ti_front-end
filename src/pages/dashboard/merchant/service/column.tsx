import { ProColumns } from "@ant-design/pro-table";
import { Checkbox, Tag } from "antd";
import {
  ITag,
  RenderServiceSchedule,
  RenderStatusRequest,
  Star,
} from "components/index";
import { Tags } from "components/tags";
import { SERVICE_CATEGORY_TYPES, SERVICE_OPERATION_TYPES } from "config";
import { MerchantService } from "service/merchantService/type";
import { fillDollar, tableCellFixed } from "utils/index";

export const ServiceBaseColumns: ProColumns<MerchantService, any>[] = [
  {
    ...tableCellFixed(180),
    dataIndex: "name",
    title: "Name",

    render: (_, record) => (
      <span className="text-md text-gray-900 font-medium">{record.name}</span>
    ),
  },
  {
    dataIndex: "phone",
    valueType: "string",
    title: "Phone number",
    className: "text-gray-600",
  },
  {
    dataIndex: "email",
    valueType: "string",
    title: "Email",
    className: "text-gray-600",
  },
  {
    dataIndex: "operationType",
    title: "Operation Type",
    render: (_, record) => (
      <Tags
        array={record.operation_types}
        key="-"
        options={SERVICE_OPERATION_TYPES}
      />
    ),
  },
  {
    dataIndex: "categories",
    valueType: "string",
    title: "Category",
    render: (_, record) => (
      <Tags
        array={record?.categories ?? []}
        key="-"
        options={SERVICE_CATEGORY_TYPES}
      />
    ),
  },
];

export const ServiceColumnSpecialty: ProColumns<MerchantService, any> = {
  ...tableCellFixed(180),
  dataIndex: "tags",
  valueType: "string",
  title: "Specialty",
  render: (_, record) => (
    <Tags array={record.tags ?? []} key="specialty-tag-" />
  ),
};
export const ServiceColumnPrice: ProColumns<MerchantService, any> = {
  dataIndex: "price",
  valueType: "number",
  title: "Price",
  render: (_, record) => <ITag value={fillDollar(record.price_range)} />,
};
export const ServiceColumnTourisFriendly: ProColumns<MerchantService, any> = {
  dataIndex: "is_tourist_friendly",
  title: "Tourist Friendly",
  render: (_, record) => (
    <Tag
      className="rounded-full"
      color={record.is_tourist_friendly ? "green" : "silver"}
    >
      {record.is_tourist_friendly ? "Yes" : "No"}
    </Tag>
  ),
};
export const ServiceColumnRequestStatus: ProColumns<MerchantService, any> = {
  ...tableCellFixed(100),
  dataIndex: "status_request",
  title: "Status",
  render: (_, record) => <RenderStatusRequest status={record.status_request} />,
};
export const ServiceColumnTimeTable: ProColumns<MerchantService, any> = {
  ...tableCellFixed(300),
  title: "Time Table",
  dataIndex: "timeTable",
  render: (_, record) => <RenderServiceSchedule hours={record.hours} />,
};
export const ServiceColumnReview: ProColumns<MerchantService, any> = {
  title: "Review",
  dataIndex: "review",
  render: (_, record) => <Star value={record.total_rating || 0} />,
};
export const ServiceColumnClicks: ProColumns<MerchantService, any> = {
  title: "Clicks",
  dataIndex: "total_click",
};

export const ServiceColumnIsActive: ProColumns<MerchantService, any> = {
  title: "Active",
  dataIndex: "is_active",
  render: (_, record) => <Checkbox checked={record.is_active} />,
};
