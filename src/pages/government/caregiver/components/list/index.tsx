import { Avatar, Badge } from "antd";
import React from "react";
import { ListElderlyProps } from "service/gov-requests";
import GovBadge from "components/badge/government";
import { RightContent } from "../rightContent/index";
import { Link } from "react-router-dom";
import moment from "moment";

const color = "#144E5A";

const List: React.FC<ListElderlyProps> = ({ data }) => {
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
            {data?.image}
          </Avatar>
          <div className="font-bold uppercase">
            <Link className="text-gray-900" to={`${data?.id}`}>
              {name}
            </Link>
          </div>
          <div>{data?.surname}</div>
          <Badge status="default" />
          <div className="text-[#475467]">{}</div>
          <GovBadge status={data?.state} />
        </div>
        <div>
          <RightContent
            date={moment(data?.date).format("l")}
            state={data?.state}
          />
        </div>
      </div>
    </div>
  );
};

export default List;
