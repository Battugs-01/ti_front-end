import { Divider, Image } from "antd";
import Badge from "components/badge";
import {
  IfCondition,
  RenderProductStatus,
  SectionContainer,
} from "components/index";
import LeafletMap from "components/map";
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
          label="Event name"
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
          label="Start date"
          children={
            <div>{dayjs(detail?.start_date).format("YYYY-MM-DD HH:mm")}</div>
          }
        />
        <SectionContainer
          label="End date"
          children={
            <div>{dayjs(detail?.end_date).format("YYYY-MM-DD HH:mm")}</div>
          }
        />
        <SectionContainer
          label="Ticket"
          children={<Badge color="green" title="Yes" />}
        />
        <SectionContainer
          label="Description"
          children={<div className="text-gray-700">{detail?.description}</div>}
        />
        <Divider />
        <SectionContainer
          label="Website"
          children={
            <a>
              <span className=" underline text-gray-700">
                {detail?.website}
              </span>
            </a>
          }
        />
        <SectionContainer
          label="Phone number"
          children={<div className="text-gray-700 ">{detail?.phone}</div>}
        />
        <Divider />
        <SectionContainer
          label="Event images"
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

        <SectionContainer
          label="Location"
          children={
            <div>
              <div className="text-gray-700 underline">
                <div
                  style={{
                    height: "300px",
                    width: "100%",
                    marginBottom: "20px",
                    position: "relative",
                  }}
                >
                  <LeafletMap
                    markers={
                      detail?.location
                        ? [
                            {
                              latitude: detail?.location[0],
                              longitude: detail?.location[1],
                              name: detail?.name,
                            },
                          ]
                        : []
                    }
                  />
                </div>
                {detail?.address}
              </div>
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
                label="Discount start date"
                children={dayjs(detail?.discount_start_date).format(
                  "YYYY-MM-DD HH:mm"
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
