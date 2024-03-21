import { ModalForm } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import orphanElderly from "service/social-worker/customer";
import { UnderReview } from "../components/under_review";
import CareGiverBadge from "components/badge/caregiver";

type DetailProps = {
  visibleDetail?: boolean;
  cancelDetail?: () => void;
  id?: number;
  status?: number;
};

export const WaitDetail: React.FC<DetailProps> = ({
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
                <div className="flex items-center gap-2"></div>
              </div>
            );
          },
        }}
      >
        <UnderReview data={elderlyDetail?.data} />
      </ModalForm>
    </div>
  );
};
