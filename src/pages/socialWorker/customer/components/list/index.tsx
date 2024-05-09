import { Avatar, Badge } from "antd";
import React from "react";
import { ListProps } from "service/gov-requests";
import RightContent from "../right-content";
import CareGiverBadge from "components/badge/caregiver";
import moment from "moment";
import { CareCenter } from "service/social-worker/customer/type";
import file from "service/file";
import dayjs from "dayjs";

const color = "#144E5A";

const List: React.FC<ListProps> = ({ data, refreshList }) => {
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
            src={file.fileToUrl(data?.elderly?.profile?.physical_path || "")}
          />
          <div className="font-bold uppercase">{data?.elderly?.first_name}</div>
          <div>{data?.elderly?.last_name}</div>
          <Badge status="default" />
          <div className="text-[#475467]">{data?.elderly?.rd}</div>
          <CareGiverBadge status={data?.status} />
        </div>
        <div>
          <RightContent
            refreshList={refreshList}
            updatedDate={dayjs(data?.updated_at).format("YYYY/MM/DD HH:MM")}
            date={dayjs(data?.created_at).format("YYYY/MM/DD HH:MM")}
            state={data?.status || 0}
            elderly_id={data?.elderly_id}
            id={data?.id}
            careCenter={data?.care_center as CareCenter}
            rd={data?.elderly?.rd}
            description={data?.description}
          />
        </div>
      </div>
    </div>
  );
};

export default List;
