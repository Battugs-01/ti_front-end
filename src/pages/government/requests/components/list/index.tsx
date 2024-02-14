import { Avatar, Badge } from "antd";
import React, { useState } from "react";
import { ListProps } from "service/gov-requests";
import GovBadge from "components/badge/government";
import RightContent from "../right-content";
import { FormModal } from "../../tabs/decide/detail/formModal";

const color = "#144E5A";

const List: React.FC<ListProps> = ({
  name,
  surname,
  registrationNumber,
  date,
  time,
  id,
}) => {
  const [visibleDetail, setDetail] = useState<boolean>(false);
  const showDetail = () => {
    setDetail(true);
  };
  const cancelDetail = () => {
    setDetail(false);
  };
  return (
    <div
      className="bg-white w-full"
      style={{
        borderBottom: "1px solid #EAECF0",
      }}
    >
      <div className="w-full flex items-center p-4 justify-between">
        <div className="flex items-center gap-4">
          <Avatar size={36} style={{ background: color }} shape="circle">
            {name?.substring(0, 2).toUpperCase()}
          </Avatar>
          <div className="font-bold uppercase">{name}</div>
          <div>{surname}</div>
          <Badge status="default" />
          <div className="text-[#475467]">{registrationNumber}</div>
          <GovBadge />
        </div>
        <div>
          <RightContent date={date} time={time} showDetail={showDetail} />
        </div>
      </div>
      {visibleDetail && (
        <FormModal
          visibleDetail={visibleDetail}
          cancelDetail={cancelDetail}
          id={id}
        />
      )}
    </div>
  );
};

export default List;
