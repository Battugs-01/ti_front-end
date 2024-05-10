import { useRequest } from "ahooks";
import { Badge } from "antd";
import EyeIcon from "assets/government/icons/eye.svg";
import CheckIcon from "assets/government/icons/white-check.svg";
import EditIcon from "assets/icons/edit.svg";
import IBadge from "components/badge";
import moment from "moment";
import { CustomButton } from "pages/government/components/button";
import React, { Fragment, useState } from "react";
import { RightContentType } from "service/gov-requests";
import orphanElderly from "service/social-worker/customer";
import {
  ElderlyInterface,
  ElderlyStatus,
} from "service/social-worker/customer/type";
import { Detail } from "../../detail/formModal";
import { WaitDetail } from "../../wait-detail";

const RightContent: React.FC<RightContentType> = ({ data, refreshList }) => {
  const [isEdit, setEdit] = useState<ElderlyInterface>();
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const elderly = useRequest(async () => orphanElderly.getElderly(data?.id), {
    manual: true,
  });

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
          <div className="w-full flex items-center gap-8 flex-wrap xl:flex-nowrap">
            <div className="flex items-center gap-1 text-sm text-[#475467] flex-wrap xl:flex-nowrap">
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
                setEdit(data?.elderly);
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
          <div className="w-full flex items-center gap-8 flex-wrap xl:flex-nowrap">
            <div className="flex items-center gap-2 text-sm text-[#475467] flex-wrap xl:flex-nowrap">
              <div className="font-bold">
                {`${data?.created_user?.last_name.substring(0, 1)}.${
                  data?.created_user?.first_name
                }`}
              </div>
              <IBadge color="gray" title={data?.created_user?.position} />
              <Badge status="default" />
              <div>Илгээсэн огноо:</div>
              <div className="font-bold">
                {moment(data?.updated_at).format("YYYY/MM/DD HH:mm")}
              </div>
              <Badge status="default" />
              <div className="font-bold">
                {moment(data?.updated_at).format("HH:mm")}
              </div>
            </div>
            <CustomButton
              icon={<img src={CheckIcon} />}
              title="Шийдвэрлэх"
              onClick={() => setIsDetail(true)}
            />
          </div>
          {isDetail && (
            <Detail
              refreshList={refreshList}
              visibleDetail={isDetail}
              cancelDetail={cancelDetail}
              status={data?.status || 0}
              id={data?.id}
              elderly_id={data?.elderly_id}
            />
          )}
        </Fragment>
      );
    }
    case ElderlyStatus.WaitDistrict: {
      return (
        <Fragment>
          <div className="w-full flex items-center gap-8 flex-wrap xl:flex-nowrap">
            <div className="flex items-center gap-1 text-sm text-[#475467] flex-wrap xl:flex-nowrap">
              <div>Илгээсэн огноо:</div>
              <div className="font-bold">
                {moment(data?.updated_at).format("YYYY/MM/DD HH:mm")}
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
              id={data?.id}
            />
          )}
        </Fragment>
      );
    }
    case ElderlyStatus.ElderlyRequestSendSendToCareCenter: {
      return (
        <Fragment>
          <div className="w-full flex items-center gap-8 flex-wrap xl:flex-nowrap">
            <div className="flex items-center gap-1 text-sm text-[#475467] flex-wrap xl:flex-nowrap">
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
              id={data?.id}
            />
          )}
        </Fragment>
      );
    }
    case ElderlyStatus.ElderlyAllocated: {
      return (
        <div className="w-full flex items-center gap-8 flex-wrap xl:flex-nowrap">
          <div className="flex items-center gap-2 text-sm text-[#475467] flex-wrap xl:flex-nowrap">
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
    case ElderlyStatus.ReturnSum: {
      return (
        <Fragment>
          <div className="w-full flex items-center gap-8 flex-wrap xl:flex-nowrap">
            <div className="flex items-center gap-2 text-sm text-[#475467] flex-wrap xl:flex-nowrap">
              <div className="font-bold">
                {`${data?.created_user?.last_name.substring(0, 1)}.${
                  data?.created_user?.first_name
                }`}
              </div>
              <IBadge color="gray" title={data?.created_user?.position} />
              <Badge status="default" />
              <div>Илгээсэн огноо:</div>
              <div className="font-bold">
                {moment(data?.updated_at).format("YYYY/MM/DD HH:mm")}
              </div>
              <Badge status="default" />
              <div className="font-bold">
                {moment(data?.updated_at).format("HH:mm")}
              </div>
            </div>
            <CustomButton
              title="Шалтгаан харах"
              icon={<img src={EyeIcon} />}
              onClick={() => setIsDetail(true)}
            />
          </div>
          {isDetail && (
            <WaitDetail
              visibleDetail={isDetail}
              cancelDetail={cancelDetail}
              status={data?.status || 0}
              id={data?.id}
            />
          )}
        </Fragment>
      );
    }
    default: {
      return (
        <Fragment>
          <div className="w-full flex items-center gap-8 flex-wrap xl:flex-nowrap">
            <div className="flex items-center gap-1 text-sm text-[#475467] flex-wrap xl:flex-nowrap">
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
                setEdit(elderly?.data?.elderly);
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
