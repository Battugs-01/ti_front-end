import { Divider } from "antd";
import Badge from "components/badge";
import { ImageList, SectionContainer } from "components/index";
import { IModalForm } from "components/modal";
import { FC } from "react";
import { NotificationsModel } from "service/notifications/types";
import { ActionComponentProps } from "types";
import { GENDERS_CONFIG } from "utils/constants";
import { moneyFormat, renderEnDate } from "utils/index";

const Detail: FC<ActionComponentProps<NotificationsModel>> = ({
  open,
  onCancel,
  detail,
}) => {
  return (
    <>
      <IModalForm
        title="Details"
        submitter={false}
        open={open}
        modalProps={{ onCancel }}
      >
        <div className="flex flex-col gap-4">
          <SectionContainer
            label="Status"
            children={
              <Badge
                title={detail?.is_published ? "Sent" : "Planned"}
                color={detail?.is_published ? "green" : "blue"}
              />
            }
          />
          <SectionContainer label="Title" children={<>{detail?.title}</>} />
          <SectionContainer
            label="Merchant Name"
            children={<>{detail?.service?.name}</>}
          />
          <SectionContainer
            label="Description"
            children={<>{detail?.description}</>}
          />
          <SectionContainer
            label=""
            children={<ImageList values={detail?.images} imageHeight={100} />}
          />
          <SectionContainer
            label="Created Date"
            children={<>{renderEnDate(detail?.created_at, true)}</>}
          />
          <SectionContainer
            label="Publish Date"
            children={<>{renderEnDate(detail?.planned_date, true)}</>}
          />
          <Divider />
          <SectionContainer
            label="Gender"
            children={
              <Badge
                title={
                  GENDERS_CONFIG.find((e) => e.key === detail?.gender)?.label ||
                  detail?.gender ||
                  ""
                }
                color={
                  detail?.gender === "male"
                    ? "blue"
                    : detail?.gender === "all"
                      ? "green"
                      : "pink"
                }
              />
            }
          />
          <SectionContainer
            label="Age"
            children={
              <Badge
                title={
                  detail?.age_min?.toString() +
                  "-" +
                  detail?.age_max?.toString()
                }
                color="gray"
              />
            }
          />
          <SectionContainer
            label="Sales Data"
            children={
              <>
                {moneyFormat(detail?.sales_min, "mnt") +
                  " - " +
                  moneyFormat(detail?.sales_max, "mnt")}
              </>
            }
          />

          <SectionContainer
            label="Reach"
            children={
              <>
                {detail?.customer_notifications?.reduce(
                  (pre, curr) => (curr.is_seen ? pre + 1 : pre),
                  0
                )}
                /{detail?.reach_count}
              </>
            }
          />
          <SectionContainer
            label="Registered Date"
            children={
              <>
                {renderEnDate(detail?.registered_start_date)} -{" "}
                {renderEnDate(detail?.registered_end_date)}
              </>
            }
          />
          <SectionContainer
            label="Employee"
            children={<>{detail?.merchant?.full_name}</>}
          />
        </div>
      </IModalForm>
    </>
  );
};

export default Detail;
