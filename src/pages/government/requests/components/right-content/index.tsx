import { Avatar, Badge } from "antd";
import React from "react";
import { RightContentType } from "service/gov-requests";
import GovBadge from "components/badge/government";
import { EditButton } from "components/index";

const color = "#144E5A";

const RightContent: React.FC<RightContentType> = ({ state, date }) => {
  switch (state) {
    case 0: {
      return (
        <div className="w-full flex items-center gap-8">
          <div className="flex items-center gap-1 text-sm text-[#475467]">
            <div>Мэдээлэл шинэчилсэн:</div>
            <div className="font-bold">{date}</div>
          </div>
          <EditButton title="Мэдээлэл засах" />
        </div>
      );
      break;
    }
  }
};

export default RightContent;
