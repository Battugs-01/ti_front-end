import { Avatar, Badge } from "antd";
import React from "react";
import { ListProps } from "service/gov-requests";
import RightContent from "../right-content";
import CareGiverBadge from "components/badge/caregiver";

const color = "#144E5A";

const List: React.FC<ListProps> = ({
  url,
  image,
  name,
  surname,
  registrationNumber,
  state,
  date,
  id,
}) => {
  return (
    <div
      className="bg-white"
      style={{
        borderBottom: "1px solid #EAECF0",
      }}
    >
      <div className="flex items-center p-4 justify-between">
        <div className="flex items-center gap-2">
          <Avatar
            size={36}
            style={{ background: color }}
            shape="circle"
            src={`http://103.41.112.73:9000/${url}`}
          />
          <div className="font-bold uppercase">{name}</div>
          <div>{surname}</div>
          <Badge status="default" />
          <div className="text-[#475467]">{registrationNumber}</div>
          <CareGiverBadge status={state} />
        </div>
        <div>
          <RightContent date={date} state={state || 0} id={id} />
        </div>
      </div>
    </div>
  );
};

export default List;
