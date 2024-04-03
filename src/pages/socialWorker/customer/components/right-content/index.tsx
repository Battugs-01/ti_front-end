import React, { Fragment, useState } from "react";
import { RightContentType } from "service/gov-requests";
import { CustomButton } from "pages/government/components/button";
import EditIcon from "assets/icons/edit.svg";
import EyeIcon from "assets/government/icons/eye.svg";
import { CareGiverUpdate } from "../../tabs/all/caregiver-update";
import { Detail } from "../../detail/formModal";
import {
  ElderlyInterface,
  ElderlyStatus,
} from "service/social-worker/customer/type";
import { useRequest } from "ahooks";
import orphanElderly from "service/social-worker/customer";
import { Avatar } from "antd";
import file from "service/file";

const RightContent: React.FC<RightContentType> = ({
  state,
  date,
  id,
  updatedDate,
  careCenter,
  refreshList,
  rd,
}) => {
  const [isEdit, setEdit] = useState<ElderlyInterface>();
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const elderly = useRequest(async () => orphanElderly.getElderly(id), {
    manual: true,
  });

  const cancelModal = () => {
    setEdit(undefined);
  };
  const cancelDetail = () => {
    setIsDetail(false);
  };
  switch (state) {
    case ElderlyStatus.ElderlySave: {
      return (
        <Fragment>
          <div className="w-full flex items-center gap-8">
            <div className="flex items-center gap-1 text-sm text-[#475467]">
              <div>Мэдээлэл шинэчилсэн:</div>
              <div className="font-bold">{updatedDate}</div>
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
          {isEdit && (
            <CareGiverUpdate
              refreshList={refreshList}
              data={isEdit}
              cancelStepModal={cancelModal}
              id={id}
            />
          )}
        </Fragment>
      );
    }
    case ElderlyStatus.ElderlyRequestSendToDistrict: {
      return (
        <Fragment>
          <div className="w-full flex items-center gap-8">
            <div className="flex items-center gap-1 text-sm text-[#475467]">
              <div>Илгээсэн огноо:</div>
              <div className="font-bold">{updatedDate}</div>
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
              rd={rd}
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
              <div className="font-bold">{updatedDate}</div>
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
              rd={rd}
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
              <div className="font-bold">{updatedDate}</div>
            </div>
            {/* <CustomButton
              title="Дэлгэрэнгүй харах"
              icon={<img src={EyeIcon} />}
              // onClick={() => setIsDetail(true)}
            /> */}
          </div>
          {isDetail && (
            <Detail
              visibleDetail={isDetail}
              cancelDetail={cancelDetail}
              status={state || 0}
              id={id}
              rd={rd}
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
              <div className="font-bold">{date}</div>
            </div>
          </div>
          <CustomButton title="Мэдээлэл засах" icon={<img src={EditIcon} />} />
        </div>
      );
    }
    case ElderlyStatus.ElderlyWaiting: {
      return (
        <Fragment>
          <div className="flex items-center gap-8 text-sm text-[#475467]">
            <div className="flex items-center gap-1 text-sm text-[#475467]">
              <div>Хүлээлэгт оруулсан огноо:</div>
              <div className="font-bold">{updatedDate}</div>
            </div>
            <CustomButton
              title="Дэлгэрэнгүй харах"
              icon={<img src={EyeIcon} />}
              onClick={() => setIsDetail(true)}
            />
          </div>
          {isDetail && (
            <Detail
              refreshList={refreshList}
              visibleDetail={isDetail}
              cancelDetail={cancelDetail}
              status={state || 0}
              id={id}
              rd={rd}
            />
          )}
        </Fragment>
      );
    }
    case ElderlyStatus.ElderlyTakingCare: {
      return (
        <Fragment>
          <div className="flex items-center gap-8 text-sm text-[#475467]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-sm text-[#475467]">
                <Avatar
                  size={18}
                  src={file.fileToUrl(careCenter?.logo?.physical_path || "")}
                />
                <div className="font-bold">{careCenter?.organization_name}</div>
              </div>
              <div className="flex items-center gap-1 text-sm text-[#475467]">
                <div>Хүлээж авсан огноо:</div>
                <div className="font-bold">{updatedDate}</div>
              </div>
            </div>
            <CustomButton
              title="Дэлгэрэнгүй харах"
              icon={<img src={EyeIcon} />}
              onClick={() => setIsDetail(true)}
            />
          </div>
          {isDetail && (
            <Detail
              refreshList={refreshList}
              visibleDetail={isDetail}
              cancelDetail={cancelDetail}
              status={state || 0}
              id={id}
              rd={rd}
            />
          )}
        </Fragment>
      );
    }
    case ElderlyStatus.ReturnSum: {
      return (
        <Fragment>
          <div className="w-full flex items-center gap-8">
            <div className="flex items-center gap-1 text-sm text-[#475467]">
              <div>Илгээсэн огноо:</div>
              <div className="font-bold">{updatedDate}</div>
            </div>
            <CustomButton
              title="Дэлгэрэнгүй харах"
              icon={<img src={EyeIcon} />}
              onClick={() => setIsDetail(true)}
            />
          </div>
          {isDetail && (
            <Detail
              refreshList={refreshList}
              visibleDetail={isDetail}
              cancelDetail={cancelDetail}
              status={state || 0}
              id={id}
              rd={rd}
            />
          )}
        </Fragment>
      );
    }
    default: {
      return (
        <Fragment>
          <div className="w-full flex items-center gap-8">
            <div className="flex items-center gap-1 text-sm text-[#475467]">
              <div>Мэдээлэл шинэчилсэн:</div>
              <div className="font-bold">{updatedDate}</div>
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
          {isEdit && (
            <CareGiverUpdate
              data={isEdit}
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
