import { ModalForm } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import orphanElderly from "service/social-worker/customer";
import { UnderReview } from "./under_review";

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
        submitter={false}
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
