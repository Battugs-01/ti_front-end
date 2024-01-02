import { useDebounceFn, useRequest } from "ahooks";
import { Divider, Form, notification } from "antd";
import { UploadFile } from "antd/lib/upload";
import { IModalForm } from "components/modal";
import { BUCKET_NAMES } from "config";
import { FC, useEffect } from "react";
import file from "service/file";
import notifications from "service/notifications";
import {
  NotificationType,
  NotificationsModel,
} from "service/notifications/types";
import { ActionComponentProps } from "types";
import { FormAudienceSection } from "./part/audience";
import { FormDateSection } from "./part/date";
import { FormDescriptionSection } from "./part/description";

const Create: FC<ActionComponentProps<NotificationsModel>> = ({
  onFinish,
  open,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const checkAudienceAPI = useRequest(notifications.audienceCheck, {
    manual: true,
  });
  const uploadMulti = useRequest(file.uploads, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    if (open) {
      checkAudienceAPI.run({
        gender: "all",
        nation: "all",
      });
    }
  }, [form, open]);

  const debounceSet = useDebounceFn(
    () =>
      checkAudienceAPI.run({
        ...form.getFieldsValue(),
        images: undefined,
        age_min: form.getFieldValue("age")?.[0],
        age_max: form.getFieldValue("age")?.[1],
        is_all: form.getFieldValue("gender") === "all" ? true : false,
        registered_start_date: form.getFieldValue("registered_date")?.[0],
        registered_end_date: form.getFieldValue("registered_date")?.[1],
        type: NotificationType.customer,
      }),
    {
      wait: 500,
    }
  );

  return (
    <>
      <IModalForm
        open={open}
        title="Create Customer Notification"
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: onCancel,
        }}
        initialValues={{
          gender: "all",
          nation: "all",
          is_planned: false,
          age: [0, 0],
        }}
        onValuesChange={() => {
          debounceSet.run();
        }}
        footer={
          <div>
            Estimated audience size:{" "}
            <span className="font-bold">
              {checkAudienceAPI?.data?.total || 0} users
            </span>
          </div>
        }
        submitTimeout={2000}
        onRequest={async (values) => {
          if (values.images && values.images.length > 0) {
            values.images = await uploadMulti
              .runAsync({
                names: values.images?.map((el: UploadFile) => el?.name),
                files: values.images,
                bucket_name: BUCKET_NAMES.notifications,
              })
              .then((el) => el.map((el) => el.path));
          }
          values.age_min = values.age?.[0];
          values.age_max = values.age?.[1];
          values.gender === "all"
            ? (values.is_all = true)
            : (values.is_all = false);
          values.planned_date = new Date(values.planned_date);
          if (values.registered_date) {
            values.registered_start_date = new Date(values.registered_date[0]);
            values.registered_end_date = new Date(values.registered_date[1]);
          }
          values.type = NotificationType.customer;
          return notifications.create(values);
        }}
        onSuccess={onFinish}
      >
        <FormDescriptionSection />
        <FormDateSection />
        <Divider />
        <FormAudienceSection formRef={form} />
      </IModalForm>
    </>
  );
};

export default Create;
