import { Avatar, Badge } from "antd";
import CustomPagination from "components/pagination";
import React from "react";
import { CareListProps } from "service/care-information/types";

const color = "#144E5A";

const List: React.FC<CareListProps> = ({ image, name, brand }) => {
  return (
    <>
      <div className="bg-[#F5F8F8] flex flex-col items-center p-8 rounded-2xl mt-4">
        <Avatar
          size={102}
          style={{ background: color }}
          shape="circle"
          src={image}
        />
        <span className="text-base text-[#144E5A] font-medium">{name}</span>
        <span className="text-xs text-gray-500">{brand}</span>
      </div>
    </>
  );
};

export default List;
