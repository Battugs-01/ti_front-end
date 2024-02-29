import React, { Fragment, useState } from "react";
import { RightContentType } from "service/gov-requests";
import { CustomButton } from "pages/government/components/button";
import EditIcon from "assets/icons/edit.svg";
import EyeIcon from "assets/government/icons/eye.svg";
import { CareGiverUpdate } from "../../tabs/all/caregiver-update";
import { Detail } from "../../detail/formModal";

const RightContent: React.FC<RightContentType> = ({ state, date, id }) => {
  const [isEdit, setEdit] = useState<boolean>(false);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const cancelModal = () => {
    setEdit(false);
  };
  const cancelDetail = () => {
    setIsDetail(false);
  };
  switch (state) {
    case 1: {
      return (
        <Fragment>
          <div className="w-full flex items-center gap-8">
            <div className="flex items-center gap-1 text-sm text-[#475467]">
              <div>Мэдээлэл шинэчилсэн:</div>
              <div className="font-bold">{date}</div>
            </div>
            <CustomButton
              title="Мэдээлэл засах"
              icon={<img src={EditIcon} />}
              onClick={() => setEdit(true)}
            />
          </div>
          {isEdit && (
            <CareGiverUpdate
              isStepModal={isEdit}
              cancelStepModal={cancelModal}
              id={id}
            />
          )}
        </Fragment>
      );
    }
    case 2: {
      return (
        <Fragment>
          <div className="w-full flex items-center gap-8">
            <div className="flex items-center gap-1 text-sm text-[#475467]">
              <div>Илгээсэн огноо:</div>
              <div className="font-bold">{date}</div>
            </div>
            <CustomButton
              title="Дэлгэрэнгүй харах"
              icon={<img src={EyeIcon} />}
              onClick={() => setIsDetail(true)}
            />
          </div>
          {isDetail && (
            <Detail
              visibleDetail={isDetail}
              cancelDetail={cancelDetail}
              status={state || 0}
              id={id}
            />
          )}
        </Fragment>
      );
    }
    case 3: {
      return (
        <div className="flex items-center gap-1 text-sm text-[#475467]">
          <div>Илгээсэн огноо:</div>
          <div className="font-bold">{date}</div>
        </div>
      );
    }
    case 5: {
      return (
        <div className="w-full flex items-center gap-8">
          <div className="flex items-center gap-2 text-sm text-[#475467]">
            <div className="flex items-center gap-1">
              <div>Шалтгаан:</div>
              <div className="font-bold">
                {"Эрүүл мэндийн үзлэг зөрчилтэй байна"}
              </div>
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
    case 4: {
      return (
        <div className="flex items-center gap-1 text-sm text-[#475467]">
          <div>Хүлээлэгт оруулсан огноо:</div>
          <div className="font-bold">{date}</div>
        </div>
      );
    }
    default: {
      return (
        <Fragment>
          <div className="w-full flex items-center gap-8">
            <div className="flex items-center gap-1 text-sm text-[#475467]">
              <div>Мэдээлэл шинэчилсэн:</div>
              <div className="font-bold">{date}</div>
            </div>
            <CustomButton
              title="Мэдээлэл засах"
              icon={<img src={EditIcon} />}
              onClick={() => setEdit(true)}
            />
          </div>
          {isEdit && (
            <CareGiverUpdate
              isStepModal={isEdit}
              cancelStepModal={cancelModal}
              id={id}
            />
          )}
        </Fragment>
      );
    }
  }
};

export default RightContent;
