import { Divider, Image, Tag } from "antd";
import { IfCondition } from "components/condition";
import {
  ITag,
  ImageList,
  RenderServiceSchedule,
  RenderServiceStatus,
  RenderStatusRequest,
  SectionContainer,
} from "components/index";
import LeafletMap from "components/map";
import file from "service/file";
import { MerchantService, ServiceStatusType } from "service/merchantService/type";

type Props = {
  detail?: MerchantService;
};
export const ServiceDetail = ({ detail }: Props) => {

  return (
    <div className="space-y-5">
      <SectionContainer
        label="Status"
        children={
          detail?.status === ServiceStatusType.initial ? <RenderStatusRequest status={detail.status_request} /> :
            <RenderServiceStatus status={detail?.status} />
        } />
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
              <ImageList values={detail?.banners} />
            }
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
              <ImageList values={detail?.menus} />
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
                  height={24}
                  width={24}
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
              return <ITag key={"operation-type-" + index} value={el as any} />;
            })}
          </>
        }
      />
      <SectionContainer
        label={"Specialty"}
        children={
          <>
            {detail?.tags?.map((el, index) => {
              return <ITag value={el} key={"tag-detail-" + index} />;
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
          <Tag color="green" className="rounded-xl">{detail?.is_tourist_friendly ? "Yes" : "No"}</Tag>
        }
      />
      <Divider />
      <SectionContainer
        label="Website"
        children={
          <a>
            <span className=" underline text-gray-700">{detail?.website}</span>
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
          </div>
        }
      />
      <SectionContainer
        label="Time Table"
        children={<RenderServiceSchedule hours={detail?.hours} />}
      />
      <SectionContainer
        label="Photos"
        children={
          <ImageList values={detail?.photos} />
        }
      />
    </div>
  );
};
