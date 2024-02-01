import React from "react";
import { RightContentType } from "service/gov-requests";
import { CustomButton } from "pages/government/components/button";
import EditIcon from "assets/icons/edit.svg";


const RightContent: React.FC<RightContentType> = ({ state, date }) => {
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
        <div className="flex items-center gap-1 text-sm text-[#475467]">
            <div>Илгээсэн огноо:</div>
            <div className="font-bold">{date}</div>
          </div>
      );
    }
    case 2: {
      return (
        <div className="w-full flex items-center gap-8">
        <div className="flex items-center gap-2 text-sm text-[#475467]">
          <div className="flex items-center gap-1">
          <div>Шалтгаан:</div>
          <div className="font-bold">{"Эрүүл мэндийн үзлэг зөрчилтэй байна"}</div>
          </div>
          <div className="flex items-center gap-1">
          <div>Ирсэн огноо:</div>
          <div className="font-bold">{date}</div>
          </div>
        </div>
        <CustomButton title="Мэдээлэл засах" icon={<img src={EditIcon} />} />
      </div>
      );
    }
    case 3: {
      return (
        <div className="flex items-center gap-1 text-sm text-[#475467]">
            <div>Хүлээлэгт оруулсан огноо:</div>
            <div className="font-bold">{date}</div>
          </div>
      );
    }
    default: {
      return <div> - </div>;
    }
  }
};

export default RightContent;
