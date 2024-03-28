import { Avatar, Badge } from "antd";
import React, { useState } from "react";
import { ElderlyListProps } from "service/gov-requests";
import CareGiverBadge from "components/badge/caregiver";
import moment from "moment";
import { CustomButton } from "../components/button";
import EyeIcon from "assets/government/icons/eye.svg";
import { Detail } from "./detail";

const color = "#144E5A";

const List: React.FC<ElderlyListProps> = ({ data, refreshList }) => {
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const cancelDetail = () => {
    setIsDetail(false);
  };
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
          <div className="w-full flex items-center gap-8">
            <div className="flex items-center gap-2 text-sm text-[#475467]">
              <div className="font-bold">
                {`${data?.created_user?.last_name.substring(0, 1)}.${
                  data?.created_user?.first_name
                }`}
              </div>
              <Badge status="default" />
              <div>Огноо:</div>
              <div className="font-bold">
                {moment(data?.updated_at).format("l")}
              </div>
            </div>
            <CustomButton
              title="Дэлгэрэнгүй"
              icon={<img src={EyeIcon} />}
              onClick={() => setIsDetail(true)}
            />
          </div>
          {isDetail && (
            <Detail
              visibleDetail={isDetail}
              cancelDetail={cancelDetail}
              status={data?.status || 0}
              id={data?.elderly_id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
