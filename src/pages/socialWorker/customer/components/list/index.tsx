import { Avatar, Badge } from "antd";
import React from "react";
import { ListProps } from "service/gov-requests";
import GovBadge from "components/badge/government";
import RightContent from "../right-content";
// import RightContent from "../right-content";

const color = "#144E5A";

const List: React.FC<ListProps> = ({
  image,
  name,
  surname,
  registrationNumber,
  state,
  date,
}) => {
  return (
    <div
      className="bg-white"
      style={{
        borderBottom: "1px solid #EAECF0",
      }}
    >
      <div className="flex items-center p-4 justify-between">
        <div className="flex items-center gap-4">
          <Avatar size={36} style={{ background: color }} shape="circle">
            {image}
          </Avatar>
          <div className="font-bold uppercase">{name}</div>
          <div>{surname}</div>
          <Badge status="default" />
          <div className="text-[#475467]">{registrationNumber}</div>
          <GovBadge status={state} />
        </div>
        <div>
          <RightContent date={date} state={state} />
        </div>
      </div>
    </div>
  );
};

export default List;