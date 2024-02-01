import React, { FC } from "react";

interface Props {
  status?: 0 | 1 | 2 | 3 | Number;
  desc?: String;
}

const CareGiverBadge: FC<Props> = ({ status, desc }) => {
  let text = "Хадгалагдсан";
  let colorClass = "bg-gray-100 text-gray-700";
  switch (status) {
    case 0:
      text = "Хадгалагдсан";
      colorClass = "bg-gray-100 text-gray-700";
      break;
    case 1:
      text = "Хүсэлт илгээсэн";
      colorClass = "bg-[#FFFAEB] text-[#B54708]";
      break;
    case 2:
      text = "Буцаагдсан";
      colorClass = "bg-red-50 text-red-700";
      break;
    case 3:
      text = "Хүлээлэгт оруулсан";
      colorClass = "bg-blue-50 text-blue-700";
      break;
    default:
      colorClass = "bg-gray-100 text-gray-700";
      break;
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium truncate ${colorClass}`}
    >
      {desc || text}
    </span>
  );
};

export default CareGiverBadge;
