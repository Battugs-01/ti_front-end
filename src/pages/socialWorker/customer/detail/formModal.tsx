import { ModalForm } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import orphanElderly from "service/social-worker/customer";
import { UnderReview } from "./under_review";
import { CustomButton } from "pages/government/components/button";
import EditIcon from "assets/government/icons/edit.svg";

type DetailProps = {
  visibleDetail?: boolean;
  cancelDetail?: () => void;
  id?: number;
  status?: number;
};

export const Detail: React.FC<DetailProps> = ({
  visibleDetail,
  cancelDetail,
  id,
  status,
}) => {
  // ? TODO
  const elderlyDetail = useRequest(() => orphanElderly.getElderly(id));
  return (
    <div>
      <ModalForm
        width={1330}
        open={visibleDetail}
        modalProps={{ onCancel: cancelDetail }}
        title={
          <div className="p-6">
            <div className="font-semibold">
              Үйлчлүүлэгчийн дэлгэрэнгүй мэдээлэл (РЕ96124578)
            </div>
          </div>
        }
        submitter={{
          render: ({ submit: onsubmit }) => {
            return (
              <div className="flex justify-end items-center">
                <div className="flex items-center gap-2">
                  <CustomButton
                    onClick={() => {
                      onsubmit && onsubmit();
                    }}
                    extraIcon={<img src={EditIcon} />}
                    title="Мэдээлэл засах"
                  />
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
    </div>
  );
};
