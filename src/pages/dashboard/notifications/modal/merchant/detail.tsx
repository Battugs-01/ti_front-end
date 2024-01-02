import { Divider } from "antd";
import Badge from "components/badge";
import { ImageList, SectionContainer } from "components/index";
import { IModalForm } from "components/modal";
import { FC } from "react";
import { NotificationsModel } from "service/notifications/types";
import { ActionComponentProps } from "types";
import { renderEnDate } from "utils/index";

export const DetailMerchant: FC<ActionComponentProps<NotificationsModel>> = ({
  open,
  onCancel,
  detail,
}) => {
  return (
    <>
      <IModalForm
        title="Details Merchant Notification"
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
            label="Reach"
            children={<>{detail?.reach_count}</>}
          />
        </div>
      </IModalForm>
    </>
  );
};
