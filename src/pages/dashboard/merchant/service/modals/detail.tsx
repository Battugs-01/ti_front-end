import { Divider, Image, Tag } from "antd";
import { IfCondition } from "components/condition";
import {
  ITag,
  ImageList,
  RenderBank,
  RenderServiceSchedule,
  RenderServiceStatus,
  SectionContainer,
} from "components/index";
import LeafletMap from "components/map";
import { IModalForm } from "components/modal";
import { Fragment } from "react";
import file from "service/file";
import {
  MerchantService,
  ServiceStatusType,
} from "service/merchantService/type";
import { ActionComponentProps } from "types";
import { ServiceTab } from "./parts/tab";

export const DetailService = ({
  onCancel,
  detail,
  open,
}: ActionComponentProps<MerchantService>) => {
  return (
    <IModalForm
      title="Details"
      submitter={false}
      open={open}
      modalProps={{ onCancel }}
    >
      <ServiceTab

        companyItems={
          <div className="space-y-5">
            <SectionContainer
              label={"Logo"}
              children={
                <IfCondition
                  condition={!!detail?.logo}
                  whenTrue={
                    <Image
                      src={file.fileToUrl(detail?.logo || "")}
                      height={64}
                      className="rounded-xl"
                    />
                  }
                />
              }
            />
            <SectionContainer
              label={"Banner images"}
              children={
                <IfCondition
                  condition={!!detail?.banners}
                  whenTrue={<ImageList values={detail?.banners} />}
                />
              }
            />
            <Divider />
            <SectionContainer
              label={"Menu images"}
              children={
                <IfCondition
                  condition={!!detail?.menus}
                  whenTrue={
                    <ImageList values={detail?.menus} imageHeight={64} />
                  }
                />
              }
            />
            <Divider />
            <SectionContainer
              label="Company Name"
              children={
                <div className="flex items-center gap-2">
                  <IfCondition
                    condition={!!detail?.logo}
                    whenTrue={
                      <Image
                        width={24}
                        height={24}
                        src={file.fileToUrl(detail?.logo || "")}
                        className="rounded-xl"
                      />
                    }
                  />

                  <div className="font-medium text-gray-700">
                    {detail?.name}
                  </div>
                </div>
              }
            />
            <SectionContainer
              label={"Operation Type"}
              children={
                <>
                  {detail?.operation_types?.map((el, index) => {
                    return (
                      <ITag key={"operation-type-" + index} value={el as any} />
                    );
                  })}
                </>
              }
            />
            <SectionContainer
              label={"Specialty"}
              children={
                <>
                  {detail?.tags?.map((el, index) => {
                    return <ITag value={el} key={"tag-" + index} />;
                  })}
                </>
              }
            />

            <SectionContainer
              label="Price"
              children={
                <>
                  <ITag
                    value={new Array(detail?.price_range).fill("$").join("")}
                  />
                </>
              }
            />
            <SectionContainer
              label="Description (Eng)"
              children={
                <div className="text-gray-700 ">{detail?.description}</div>
              }
            />
            <SectionContainer
              label="Description (Mn)"
              children={
                <div className="text-gray-700 ">{detail?.description_mn}</div>
              }
            />
            <SectionContainer
              label="Tourist Friendly"
              children={

                <Tag color="green" className="rounded-xl ">
                  {detail?.is_tourist_friendly ? "Yes" : "No"}
                </Tag>
              }
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
            <SectionContainer
              label="Email"
              children={<div className="text-gray-700 ">{detail?.email}</div>}
            />
            <Divider />
            <SectionContainer
              label="Location"
              children={
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
                      position={
                        detail?.location
                          ? {
                            val: [detail?.location[0], detail?.location[1]],
                            set: () => { },
                          }
                          : undefined
                      }
                    />
                  </div>
                  {detail?.address}
                </div>
              }
            />
            <SectionContainer
              label="Time Table"
              children={<RenderServiceSchedule hours={detail?.hours} />}
            />
            <SectionContainer
              label="Photos"
              children={<ImageList values={detail?.photos} imageHeight={64} />}
            />
          </div>
        }

        settingsItems={
          <div className="space-y-5">
            <SectionContainer
              label="Status"
              children={<RenderServiceStatus status={detail?.status} />}
            />
            <IfCondition
              condition={detail?.status === ServiceStatusType.sponsored}
              whenTrue={
                <Fragment>
                  <SectionContainer
                    label="Event & ticket"
                    children={
                      <div className="text-gray-700">
                        {detail?.commission_event} %
                      </div>
                    }
                  />
                  <SectionContainer
                    label="Coupon"
                    children={
                      <div className="text-gray-700">
                        {detail?.commission_coupon} %
                      </div>
                    }
                  />
                  <SectionContainer
                    label="Product"
                    children={
                      <div className="text-gray-700">
                        {detail?.commission_product} %
                      </div>
                    }
                  />
                  <SectionContainer
                    label="Bank"
                    children={<RenderBank bank={detail?.account_bank} />}
                  />
                  <SectionContainer
                    label="Account Number"
                    children={
                      <div className="text-gray-700">
                        {detail?.account_number}
                      </div>
                    }
                  />
                  <SectionContainer
                    label="Account Holder"
                    children={
                      <div className="text-gray-700">
                        {detail?.account_holder}
                      </div>
                    }
                  />
                </Fragment>
              }
            />
          </div>
        }
      />
    </IModalForm>
  );
};
