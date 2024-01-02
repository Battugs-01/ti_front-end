import { Divider, Image, Tag } from "antd";
import { IfCondition } from "components/condition";
import { ITag, SectionContainer } from "components/index";
import { IModalForm } from "components/modal";
import { WEEK_DAY_ARRAY } from "config";
import dayjs from "dayjs";
import file from "service/file";
import { MerchantService } from "service/merchantService/type";
import { ActionComponentProps } from "types";

const OrderDetail = ({
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
      <div className="space-y-5">
        <SectionContainer
          label="Status"
          children={<ITag value={detail?.status} />}
        />
        <Divider />
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
              whenTrue={
                <div className="flex items-center gap-2 ">
                  {detail?.banners?.map((el) => (
                    <Image
                      src={file.fileToUrl(el)}
                      height={64}
                      className="rounded-xl"
                    />
                  ))}
                </div>
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
                    height={64}
                    src={file.fileToUrl(detail?.logo || "")}
                    className="rounded-xl"
                  />
                }
              />

              <div className="font-medium text-gray-700">{detail?.name}</div>
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
              <ITag value={new Array(detail?.price_range).fill("$").join("")} />
            </>
          }
        />
        <SectionContainer
          label="Description"
          children={<div className="text-gray-700 ">{detail?.description}</div>}
        />
        <SectionContainer
          label="Tourist Friendly"
          children={
            <Tag color="green">
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
            <div className="text-gray-700 underline">{detail?.location}</div>
          }
        />
        <SectionContainer
          label="Time Table"
          children={
            <div className="text-gray-700">
              {detail?.hours?.map((el, index) => {
                return (
                  <div
                    className=" flex items-center gap-2"
                    key={"hours-" + index}
                  >
                    <span>
                      {el.week_days
                        .map(
                          (it) =>
                            WEEK_DAY_ARRAY.find(
                              (el) => el.value.toString() === it
                            )?.label
                        )
                        .join("-")}
                    </span>
                    <div className="">
                      <span>{dayjs(el.opening).format(" HH:mm:ss")}</span>
                      <span>{dayjs(el.closing).format("HH:mm:ss")}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          }
        />
        <SectionContainer
          label="Photos"
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
      </div>
    </IModalForm>
  );
};

export default OrderDetail;
