import { Avatar, Badge } from "antd";
import React from "react";
import { ListProps } from "service/gov-requests";
import RightContent from "../right-content";
import CareGiverBadge from "components/badge/caregiver";
import moment from "moment";

const color = "#144E5A";

const List: React.FC<ListProps> = ({
  data
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
            src={`http://103.41.112.73:9000/${data?.elderly?.profile?.physical_path}`}
          />
          <div className="font-bold uppercase">{data?.elderly?.first_name}</div>
          <div>{data?.elderly?.last_name}</div>
          <Badge status="default" />
          <div className="text-[#475467]">{data?.elderly?.rd}</div>
          <CareGiverBadge status={data?.status} />
        </div>
        <div>
          <RightContent updatedDate={moment(data?.updated_at).format("l")} date={moment(data?.created_at).format("l")} state={data?.status || 0} id={data?.elderly_id} />
        </div>
      </div>
    </div>
  );
};

export default List;
