import { ModalForm } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import orphanElderly from "service/social-worker/customer";
import { UnderReview } from "./under_review";
import { CustomButton } from "pages/government/components/button";
import EditIcon from "assets/government/icons/edit-white.svg";
import { CareGiverUpdate } from "../tabs/all/caregiver-update";
import { useState } from "react";
import { ElderlyInterface } from "service/social-worker/customer/type";
import CareGiverBadge from "components/badge/caregiver";
import { Spin } from "antd";
import { PageLoading } from "@ant-design/pro-layout";

type DetailProps = {
  refreshList?: () => void;
  visibleDetail?: boolean;
  cancelDetail?: () => void;
  id?: number;
  status?: Number;
  rd?: string;
  elderly_id: number;
};

export const Detail: React.FC<DetailProps> = ({
  visibleDetail,
  cancelDetail,
  id,
  status,
  refreshList,
  rd,
}) => {
  // ? TODO
  const [edit, setEdit] = useState<ElderlyInterface>();
  const [loading, setLoading] = useState<boolean>(false);
  const elderlyDetail = useRequest(() => orphanElderly.getElderly(id));
  const cancelModal = () => {
    setEdit(undefined);
  };
  return (
    <div>
      <ModalForm
        width={1330}
        open={visibleDetail}
        modalProps={{ onCancel: cancelDetail }}
        loading={loading}
        title={
          <div className="p-6">
            <div className="font-semibold flex items-center gap-3">
              <div>Үйлчлүүлэгчийн дэлгэрэнгүй мэдээлэл ({rd})</div>
              <CareGiverBadge status={status} />
            </div>
          </div>
        }
        submitter={{
          render: ({ submit: onsubmit }) => {
            return (
              <div className="flex justify-end items-center w-full  p-6 border-t border-solid border-b-0 border-l-0 border-r-0 border-gray-300">
                <div className="flex items-center gap-2">
                  {status === 9 && (
                    <CustomButton
                      onClick={() => {
                        cancelDetail;
                        onsubmit && onsubmit();
                        setEdit(elderlyDetail?.data?.elderly);
                      }}
                      icon={<img src={EditIcon} alt="edit" />}
                      title="Мэдээлэл засах"
                    />
                  )}
                </div>
              </div>
            );
          },
        }}
      >
        <UnderReview data={elderlyDetail?.data} />
      </ModalForm>

      {edit && (
        <CareGiverUpdate
          // setLoading={setLoading}
          status={status || 0}
          refreshList={refreshList}
          cancelStepModal={cancelModal}
          data={edit}
          id={elderlyDetail?.data?.elderly?.id || 0}
        />
      )}
    </div>
  );
};
