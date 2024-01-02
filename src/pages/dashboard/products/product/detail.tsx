import { Divider, Image } from "antd";
import {
  IfCondition,
  RenderProductStatus,
  SectionContainer,
} from "components/index";
import { IModalForm } from "components/modal";
import dayjs from "dayjs";
import file from "service/file";
import { Product } from "service/product/type";
import { ActionComponentProps } from "types";
import { moneyFormat } from "utils/index";

export const DetailProduct = ({
  open,
  onCancel,
  detail,
}: ActionComponentProps<Product>) => {
  return (
    <IModalForm
      title="Details"
      modalProps={{ onCancel }}
      open={open}
      submitter={false}
    >
      <div className="space-y-5">
        <SectionContainer
          label="Banner images"
          children={
            <div className="flex items-center gap-2">
              <Image
                src={
                  !!detail?.banner && detail.banner.trim().length > 0
                    ? file.fileToUrl(detail?.banner)
                    : "/background/login.png"
                }
                height={64}
                className="rounded-xl"
              />
            </div>
          }
        />

        <Divider />
        <SectionContainer
          label="Product name"
          children={<span className="  text-gray-700">{detail?.name}</span>}
        />
        <SectionContainer
          label="Company name"
          children={
            <div className="  text-gray-700">{detail?.service?.name}</div>
          }
        />
        <SectionContainer
          label="Status"
          children={<RenderProductStatus status={detail?.status} />}
        />

        <SectionContainer
          label="Description"
          children={<div className="text-gray-700">{detail?.description}</div>}
        />
        <Divider />
        <SectionContainer
          label="Dates"
          children={`${dayjs(detail?.start_date).format(
            "YYYY-MM-DD HH:mm"
          )}-${dayjs(detail?.end_date).format("YYYY-MM-DD HH:mm")}`}
        />
        <Divider />
        <SectionContainer
          label="Product images"
          children={
            <div className="flex items-center gap-2">
              {detail?.photos?.map((el, index) => {
                return (
                  <Image
                    src={file.fileToUrl(el)}
                    key={"photo-" + index}
                    height={64}
                    className="rounded-xl"
                  />
                );
              })}
            </div>
          }
        />

        <Divider />
        <SectionContainer
          label="Regular price"
          children={moneyFormat(detail?.regular_price, "mnt")}
        />
        <SectionContainer label="Unit" children={detail?.limit} />
        <IfCondition
          condition={detail?.has_discount ?? false}
          whenTrue={
            <>
              <SectionContainer
                label="Discount"
                children={detail?.discount_percentage + "%"}
              />
              <SectionContainer
                label="Discount price"
                children={moneyFormat(
                  ((detail?.regular_price || 0) *
                    (detail?.discount_percentage || 0)) /
                    100,
                  "mnt"
                )}
              />
              <SectionContainer
                label="Discount end date"
                children={dayjs(detail?.discount_end_date).format(
                  "YYYY-MM-DD HH:mm"
                )}
              />
            </>
          }
        />
        <Divider />

        <SectionContainer
          label="Created date"
          children={dayjs(detail?.created_at).format("MMM DD, YYYY HH:mm")}
        />
        <SectionContainer
          label="Employee"
          children={<div>{detail?.created_user?.full_name}</div>}
        />
      </div>
    </IModalForm>
  );
};
