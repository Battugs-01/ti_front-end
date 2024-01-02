import { Checkbox } from "antd";
import { ITag, IfCondition, SectionContainer } from "components/index";
import { IModalForm } from "components/modal";
import {
  PRODUCT_CATEGORY_ARRAY,
  SERVICE_CATEGORY_TYPES,
  WEEK_DAY_ARRAY,
} from "config";
import {
  NotificationSettings,
  NotificationSettingsType,
} from "service/notificationSettings/type";
import { ActionComponentProps } from "types";

export const DetailSettings = ({
  detail,
  onCancel,
  open,
}: ActionComponentProps<NotificationSettings>) => {
  return (
    <IModalForm
      modalProps={{ onCancel }}
      open={open}
      submitter={false}
      title="Detail Settings Notification"
    >
      <div className="flex flex-col gap-4">
        <SectionContainer label="Title" children={detail?.title} />
        <SectionContainer label="Description" children={detail?.description} />
        <SectionContainer label="Type" children={detail?.type} />
        <SectionContainer
          label="Active"
          children={<Checkbox checked={detail?.is_active} />}
        />

        <IfCondition
          condition={detail?.type === NotificationSettingsType.interval}
          whenTrue={
            <>
              <SectionContainer
                label="Service Categories"
                children={
                  <div className="flex items-center gap-2">
                    {detail?.service_categories?.map((el, index) => {
                      return (
                        <ITag
                          key={index}
                          value={
                            SERVICE_CATEGORY_TYPES.find((dt) => dt.value === el)
                              ?.label
                          }
                        />
                      );
                    })}
                  </div>
                }
              />
              <SectionContainer
                label="Product Categories"
                children={
                  <div className="flex items-center gap-2">
                    {detail?.product_categories?.map((el, index) => {
                      return (
                        <ITag
                          key={index}
                          value={
                            PRODUCT_CATEGORY_ARRAY.find((dt) => dt.value === el)
                              ?.label
                          }
                        />
                      );
                    })}
                  </div>
                }
              />
              <SectionContainer
                label="Inteval Sales"
                children={`${detail?.interval_min}-${detail?.interval_max}`}
              />
              <SectionContainer
                label="Week Day"
                children={
                  WEEK_DAY_ARRAY.find((el) => el.value === detail?.week_day)
                    ?.label
                }
              />
            </>
          }
          whenFalse={
            <SectionContainer
              label="Interval Minute"
              children={`${detail?.interval_minute}`}
            />
          }
        />
      </div>
    </IModalForm>
  );
};
