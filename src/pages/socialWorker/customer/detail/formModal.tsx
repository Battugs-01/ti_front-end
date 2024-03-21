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

type DetailProps = {
  visibleDetail?: boolean;
  cancelDetail?: () => void;
  id?: number;
  status?: Number;
};

export const Detail: React.FC<DetailProps> = ({
  visibleDetail,
  cancelDetail,
  id,
  status,
}) => {
  // ? TODO
  const [edit, setEdit] = useState<ElderlyInterface>();
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
        title={
          <div className="p-6">
            <div className="font-semibold flex items-center gap-3">
              <div>Үйлчлүүлэгчийн дэлгэрэнгүй мэдээлэл</div>
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
                        onsubmit && onsubmit();
                        setEdit(elderlyDetail?.data);
                      }}
                      icon={<img src={EditIcon} alt="edit" />}
                      title={<div className="text-base">Мэдээлэл засах</div>}
                    />
                  )}
                </div>
              </div>
            );
          },
        }}
        // onFinish={async (values) => {
        //   const ordinances = await ordinancesFile.runAsync({
        //     file: values?.ordinances_file_ids[0].originFileObj,
        //   });
        //   const welfare = await welfareFile.runAsync({
        //     file: values?.welfare_document_file_ids[0].originFileObj,
        //   });
        //   distributeOrphan.run(
        //     {
        //       care_center_id: values?.care_center_id,
        //       status: 3,
        //       ordinances_file_ids: [ordinances[0]?.id],
        //       welfare_document_file_ids: [welfare[0]?.id],
        //     },
        //     id
        //   );
        // }}
      >
        <UnderReview data={elderlyDetail?.data} />
      </ModalForm>
      <CareGiverUpdate
        cancelStepModal={cancelModal}
        data={edit}
        id={elderlyDetail?.data?.id || 0}
      />
    </div>
  );
};
