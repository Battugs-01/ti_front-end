import { Avatar, Badge } from "antd";
import React from "react";
import { ElderlyListProps } from "service/gov-requests";
import RightContent from "../right-content";
import CareGiverBadge from "components/badge/caregiver";
import moment from "moment";

const color = "#144E5A";

const List: React.FC<ElderlyListProps> = ({ data, refreshList }) => {
  return (
    <div
      className="bg-white"
      style={{
        borderBottom: "1px solid #EAECF0",
      }}
    >
      <div className="flex items-center p-4 justify-between flex-wrap xl:flex-nowrap">
        <div className="flex items-center gap-2 flex-wrap xl:flex-nowrap">
          <Avatar
            size={36}
            style={{ background: color }}
            shape="circle"
            src={`https://adb-view.qpartners.tech/${data?.elderly?.profile?.physical_path}`}
          />
          <div className="font-bold uppercase">{data?.elderly?.first_name}</div>
          <div>{data?.elderly?.last_name}</div>
          <Badge status="default" />
          <div className="text-[#475467]">{data?.elderly?.rd}</div>
          <CareGiverBadge status={data?.status} />
        </div>
        <div>
          <RightContent
            data={data}
            refreshList={refreshList}
            elderly_id={data?.elderly_id}
          />
        </div>
      </div>
    </div>
  );
};

export default List;
