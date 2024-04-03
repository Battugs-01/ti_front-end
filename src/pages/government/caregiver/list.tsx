import { Avatar, Badge } from "antd";
import React, { useState } from "react";
import { ElderlyListProps } from "service/gov-requests";
import CareGiverBadge from "components/badge/caregiver";
import moment from "moment";
import { CustomButton } from "../components/button";
import EyeIcon from "assets/government/icons/eye.svg";
import { Detail } from "./detail";
import file from "service/file";

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
            src={file.fileToUrl(data?.elderly?.profile?.physical_path || "")}
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
              <Avatar
                src={file.fileToUrl(
                  data?.care_center?.logo?.physical_path || ""
                )}
                size={18}
              />
              <div className="font-bold">
                {data?.care_center?.organization_name}
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
