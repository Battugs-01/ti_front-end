import React, { Fragment, useState } from "react";
import { RightContentType } from "service/gov-requests";
import { CustomButton } from "pages/government/components/button";
import EditIcon from "assets/icons/edit.svg";
import EyeIcon from "assets/government/icons/eye.svg";
import {
  ElderlyInterface,
  ElderlyStatus,
} from "service/social-worker/customer/type";
import { useRequest } from "ahooks";
import orphanElderly from "service/social-worker/customer";
import { Detail } from "../../detail/formModal";
import moment from "moment";
import { Badge } from "antd";
import { WaitDetail } from "../../wait-detail";

const RightContent: React.FC<RightContentType> = ({ data }) => {
  const [isEdit, setEdit] = useState<ElderlyInterface>();
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const elderly = useRequest(
    async () => orphanElderly.getElderly(data?.elderly_id),
    {
      manual: true,
    }
  );

  const cancelModal = () => {
    setEdit(undefined);
  };
  const cancelDetail = () => {
    setIsDetail(false);
  };
  switch (data?.status) {
    case ElderlyStatus.ElderlySave: {
      return (
        <Fragment>
          <div className="w-full flex items-center gap-8">
            <div className="flex items-center gap-1 text-sm text-[#475467]">
              <div>Мэдээлэл шинэчилсэн:</div>
              <div className="font-bold">
                {moment(data?.created_at).format("l")}
              </div>
            </div>
            <CustomButton
              title="Мэдээлэл засах"
              icon={<img src={EditIcon} />}
              onClick={async () => {
                const data = await elderly?.runAsync();
                setEdit(data);
              }}
            />
          </div>
          {/* {isEdit && (
            <CareGiverUpdate
              data={isEdit}
              cancelStepModal={cancelModal}
              id={id}
            />
          )} */}
        </Fragment>
      );
    }
    case ElderlyStatus.ElderlyRequestSendToDistrict: {
      return (
        <Fragment>
          <div className="w-full flex items-center gap-8">
            <div className="flex items-center gap-2 text-sm text-[#475467]">
              <div className="font-bold">
                {`${data?.created_user?.last_name.substring(0, 1)}.${
                  data?.created_user?.first_name
                }`}
              </div>
              <Badge status="default" />
              <div>Илгээсэн огноо:</div>
              <div className="font-bold">
                {moment(data?.created_at).format("l")}
              </div>
              <Badge status="default" />
              <div className="font-bold">
                {moment(data?.created_at).format("HH:mm")}
              </div>
            </div>
            <CustomButton
              title={<div className="py-2 px-4">Шийдвэрлэх</div>}
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
        </Fragment>
      );
    }
    case ElderlyStatus.WaitDistrict: {
      return (
        <Fragment>
          <div className="w-full flex items-center gap-8">
            <div className="flex items-center gap-1 text-sm text-[#475467]">
              <div>Илгээсэн огноо:</div>
              <div className="font-bold">
                {moment(data?.created_at).format("l")}
              </div>
            </div>
            <CustomButton
              title="Дэлгэрэнгүй харах"
              icon={<img src={EyeIcon} />}
              onClick={() => setIsDetail(true)}
            />
          </div>
          {isDetail && (
            <WaitDetail
              visibleDetail={isDetail}
              cancelDetail={cancelDetail}
              status={data?.status || 0}
              id={data?.elderly_id}
            />
          )}
        </Fragment>
      );
    }
    case ElderlyStatus.ElderlyRequestSendSendToCareCenter: {
      return (
        <Fragment>
          <div className="w-full flex items-center gap-8">
            <div className="flex items-center gap-1 text-sm text-[#475467]">
              <div>Огноо:</div>
              <div className="font-bold">
                {moment(data?.created_at).format("l")}
              </div>
            </div>
            <CustomButton
              title="Дэлгэрэнгүй харах"
              icon={<img src={EyeIcon} />}
              onClick={() => setIsDetail(true)}
            />
          </div>
          {isDetail && (
            <WaitDetail
              visibleDetail={isDetail}
              cancelDetail={cancelDetail}
              status={data?.status || 0}
              id={data?.elderly_id}
            />
          )}
        </Fragment>
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
              <div className="font-bold">
                {moment(data?.created_at).format("l")}
              </div>
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
          <div className="font-bold">
            {moment(data?.created_at).format("l")}
          </div>
        </div>
      );
    }
    case ElderlyStatus.ReturnSum: {
      return (
        <div className="flex items-center gap-1 text-sm text-[#475467]">
          <div>Буцаагдсан огноо:</div>
          <div className="font-bold">
            {moment(data?.created_at).format("l")}
          </div>
        </div>
      );
    }
    default: {
      return (
        <Fragment>
          <div className="w-full flex items-center gap-8">
            <div className="flex items-center gap-1 text-sm text-[#475467]">
              <div>Мэдээлэл шинэчилсэн:</div>
              <div className="font-bold">
                {moment(data?.created_at).format("l")}
              </div>
            </div>
            <CustomButton
              title="Мэдээлэл засах"
              icon={<img src={EditIcon} />}
              onClick={() => {
                elderly?.run();
                setEdit(elderly?.data);
              }}
            />
          </div>
          {/* {isEdit && (
            <CareGiverUpdate
              data={isEdit}
              cancelStepModal={cancelModal}
              id={id}
            />
          )} */}
        </Fragment>
      );
    }
  }
};

export default RightContent;
