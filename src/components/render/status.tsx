import { Tag } from "antd";
import Badge from "components/badge";
import dayjs from "dayjs";
import {
  ServiceStatusRequestType,
  ServiceStatusType,
} from "service/merchantService/type";
import { LatestCarestType, ProductStatusType } from "service/product/type";

type PropsOrder = {
  status?: string;
};
let globalClass = "border-0 font-medium ";
export const RenderOrderStatus = ({ status }: PropsOrder) => {
  let className = globalClass;
  switch (status) {
    case "pending":
      className += "text-warning-700 bg-warning-50 capitalize";
      break;
    case "confirm":
      className += "text-success-700  bg-success-50 capitalize";
      break;
    default:
      break;
  }
  return <Tag className={className}>{status}</Tag>;
};

type PropsLatestCarest = {
  status?: LatestCarestType;
};
export const PropsLatestCarest = ({ status }: PropsLatestCarest) => {
  let className = globalClass;
  let text = "";
  switch (status) {
    case LatestCarestType.inprogress:
      className += " bg-success-50 text-success-700 font-xs";
      text = "Асаргаанд байгаа";
      break;
    case LatestCarestType.notStarted:
      className += " bg-orange-50 text-orange-700 font-xs";
      text = "Давтан ирсэн";
      break;
    case LatestCarestType.ended:
      className += " bg-orange-100 text-orange-700 font-xs";
      text = "Ended";
      break;
    case LatestCarestType.cancelled:
      className += " bg-gray-100 text-gray-700 font-xs";
      text = "Давтан ирсэн";
      break;
    default:
      break;
  }
  return <Tag className={className}>{text}</Tag>;
};

type PropsProduct = {
  status?: ProductStatusType;
};
export const RenderProductStatus = ({ status }: PropsProduct) => {
  let className = globalClass;
  let text = "";
  switch (status) {
    case ProductStatusType.inprogress:
      className += " bg-success-50 text-success-700";
      text = "In progress";
      break;
    case ProductStatusType.cancelled:
      className += " bg-orange-50 text-orange-700";
      text = "Cancelled";
      break;
    case ProductStatusType.ended:
      className += " bg-orange-100 text-orange-700";
      text = "Ended";
      break;
    case ProductStatusType.notStarted:
      className += " bg-gray-50 text-gray-700";
      text = "Not started";
      break;

    default:
      break;
  }
  return <Tag className={className}>{text}</Tag>;
};

type PropsStatusRequest = {
  status?: ServiceStatusRequestType;
};

export const RenderStatusRequest = ({ status }: PropsStatusRequest) => {
  let className = globalClass;
  switch (status) {
    case ServiceStatusRequestType.cancelled:
      className += " bg-warning-50 text-warning-700";
      break;
    case ServiceStatusRequestType.pending:
      className += " bg-error-50 text-error-700";
    default:
      break;
  }
  return <Tag className={className}>{status}</Tag>;
};

export const RenderServiceStatus = ({
  status,
}: {
  status?: ServiceStatusType;
}) => {
  let className = globalClass;
  let text = "";
  switch (status) {
    case ServiceStatusType.verified:
      className += " bg-green-50 text-green-500";
      text = "Verified";
      break;
    case ServiceStatusType.sponsored:
      className += " bg-blue-50 text-blue-500";
      text = "Sponsored";
      break;
      break;
    case ServiceStatusType.manual:
      className += " bg-yellow-50 text-yellow-500";
      text = "Manually added";
      break;
    case ServiceStatusType.initial:
      className += " bg-gray-50 text-gray-500";
      text = "Request";
      break;

    default:
      break;
  }
  return <Tag className={className}>{text}</Tag>;
};

export const RenderDateStatus = ({
  startDate,
  endDate,
}: {
  startDate?: Date;
  endDate?: Date;
}) => {
  const isActive = dayjs(endDate).isAfter(startDate);
  return (
    <Badge
      title={isActive ? "Active" : "Ended"}
      color={isActive ? "green" : "gray"}
    />
  );
};
