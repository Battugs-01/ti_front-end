import { Divider } from "antd";
import {
  ImageList,
  RenderDateStatus,
  RenderProductStatus,
  SectionContainer,
} from "components/index";
import { IModalForm } from "components/modal";
import dayjs from "dayjs";
import { Product } from "service/product/type";
import { ActionComponentProps } from "types";
import { diffDates, firstLastNames, moneyFormat } from "utils/index";

export const DetailBanner = ({
  onCancel,
  onFinish,
  open,
  detail,
}: ActionComponentProps<Product>) => {
  return (
    <IModalForm
      open={open}
      modalProps={{
        onCancel,
      }}
      submitter={false}
      title="Details"
    >
      <div className="space-y-5">
        <SectionContainer
          label="Banner images"
          children={<ImageList values={detail?.photos} />}
        />
        <Divider />
        <SectionContainer
          label="Status"
          children={<RenderProductStatus status={detail?.status} />}
        />
        <SectionContainer
          label="Host"
          children={
            <div className="text-gray-700">{detail?.service?.name}</div>
          }
        />
        <SectionContainer
          label="Start date"
          children={
            <div className="text-gray-700">
              {dayjs(detail?.start_date).format("MMM D , YYYY")}
            </div>
          }
        />
        <SectionContainer
          label="End date"
          children={
            <div className="text-gray-700">
              {dayjs(detail?.end_date).format("MMM D , YYYY")}
            </div>
          }
        />
        <SectionContainer
          label="Due date"
          children={
            <div className="text-gray-700">
              {diffDates(detail?.end_date, detail?.start_date, "days")} day
            </div>
          }
        />
        <Divider />

        <SectionContainer
          label="Price"
          children={
            <div className="text-gray-700">
              {moneyFormat(detail?.regular_price)}
            </div>
          }
        />
        <SectionContainer
          label="Total price"
          children={
            <div className="text-gray-700">
              {moneyFormat(
                (detail?.regular_price ?? 0) *
                  diffDates(detail?.end_date, detail?.start_date, "days")
              )}
            </div>
          }
        />
        <Divider />
        <SectionContainer
          label="Created date"
          children={
            <div className="text-gray-700">
              {dayjs(detail?.created_at).format("MMM DD, YYYY HH:mm")}
            </div>
          }
        />
        <SectionContainer
          label="Employee"
          children={
            <div className="text-gray-700">
              {detail?.created_user?.full_name}
            </div>
          }
        />
      </div>
    </IModalForm>
  );
};
