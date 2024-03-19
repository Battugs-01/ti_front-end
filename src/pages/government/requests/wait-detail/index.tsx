import { ModalForm } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import orphanElderly from "service/social-worker/customer";
import { UnderReview } from "../components/under_review";

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
            <div className="font-semibold">
              Үйлчлүүлэгчийн дэлгэрэнгүй мэдээлэл (РЕ96124578)
            </div>
          </div>
        }
        submitter={false}
      >
        <UnderReview data={elderlyDetail?.data} />
      </ModalForm>
    </div>
  );
};
