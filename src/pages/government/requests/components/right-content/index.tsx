import React, { useState } from "react";
import { RightContentType } from "service/gov-requests";
import { CustomButton } from "pages/government/components/button";
import { Avatar, Badge, Cascader } from "antd";
import EditIcon from "assets/icons/edit.svg";
import CheckIcon from "assets/icons/check.svg";
import TransferIcon from "assets/icons/transfer.svg";
import LoomIcon from "assets/government/icons/loom.svg";
import ArrowIcon from "assets/icons/arrow.svg";
import IBadge from "components/badge";

const color = "#144E5A";

const RightContent: React.FC<RightContentType> = ({
  state,
  date,
  showDetail,
  time,
}) => {
  switch (state) {
    case 0: {
      return (
        <div className="w-full flex items-center gap-8">
          <div className="flex items-center gap-1 text-sm text-[#475467]">
            <div>Мэдээлэл шинэчилсэн:</div>
            <div className="font-bold">{date}</div>
          </div>
          <CustomButton title="Мэдээлэл засах" icon={<img src={EditIcon} />} />
        </div>
      );
    }
    case 1: {
      return (
        <div className="w-full flex items-center gap-8">
          <div className="flex items-center gap-1 text-sm text-[#475467]">
            <img src={LoomIcon} />
            <div className="font-bold">Батсүмбэрийн Улсын асрамжийн газар</div>
            <Badge status="default" />
            <div>Огноо:</div>
            <div className="font-bold">{date}</div>
            <Badge status="default" />
            <div className="font-bold">17:36</div>
          </div>
          {/* <CustomButton title="Хуваарьлах" icon={<img src={CheckIcon} />} /> */}
          <CustomButton title="Дэлгэрэнгүй" />
        </div>
      );
    }
    case 2: {
      return (
        <div className="w-full flex items-center gap-8">
          <div className="flex items-center gap-1 text-sm text-[#475467]">
            <div>Сүүлд ирсэн:</div>
            <div className="font-bold">{date}</div>
          </div>
          <CustomButton title="Хүлээн авах" icon={<img src={CheckIcon} />} />
        </div>
      );
    }
    case 3: {
      return (
        <div className="w-full flex items-center gap-8">
          <div className="flex items-center gap-2 text-sm text-[#475467]">
            <Badge status="default" />
            <div>Гарах огноо:</div>
            <div className="font-bold">{date}</div>
          </div>
          <CustomButton title="Шилжүүлэх" icon={<img src={TransferIcon} />} />
        </div>
      );
    }
    case 4: {
      return (
        <div className="w-full flex items-center gap-8">
          <div className="flex items-center gap-1 text-sm text-[#475467]">
            <Avatar shape="circle" size={"small"}>
              БА
            </Avatar>
            <div className="font-bold">Б.Баярмаа</div>
            <IBadge color="gray" title="БГД 2-р хорооны нийгмийн ажилтан" />
            <Badge status="default" />
            <div>Огноо:</div>
            <div className="font-bold">{date}</div>
            <Badge status="default" />
            <div className="font-bold">17:36</div>
          </div>
          <CustomButton title="Дэлгэрэнгүй" onClick={showDetail} />
        </div>
      );
    }
    default: {
      return (
        <div className="w-full flex items-center gap-8">
          <div className="flex items-center gap-1 text-sm text-[#475467]">
            <Avatar shape="circle" size={"small"}>
              БА
            </Avatar>
            <div className="font-bold">Б.Баярмаа</div>
            <IBadge color="gray" title="БГД 2-р хорооны нийгмийн ажилтан" />
            <Badge status="default" />
            <div>Огноо:</div>
            <div className="font-bold">{date}</div>
            <Badge status="default" />
            <div className="font-bold">{time}</div>
          </div>
          <CustomButton title="Дэлгэрэнгүй" onClick={showDetail} />
        </div>
      );
    }
  }
};

export default RightContent;
