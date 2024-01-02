import { useDebounceFn, useRequest } from "ahooks";
import { Form, message, notification } from "antd";
import { IModalForm } from "components/modal";
import { BUCKET_NAMES } from "config";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import file from "service/file";
import notifications from "service/notifications";
import { NotificationsModel } from "service/notifications/types";
import { ActionComponentProps } from "types";
import { convertFileToUploadFile, getImageSeperate } from "utils/index";
import { FormAudienceSection } from "./part/audience";
import { FormDateSection } from "./part/date";
import { FormDescriptionSection } from "./part/description";

const Update: FC<ActionComponentProps<NotificationsModel>> = ({
  open,
  onCancel,
  detail,
  onFinish,
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
    if (open && detail) {
      form?.setFieldsValue({
        ...detail,
        images: detail?.images?.map((el) => convertFileToUploadFile(el)).flat(),
        registered_date: [
          detail?.registered_start_date,
          detail?.registered_end_date,
        ],
        age: [detail.age_min, detail.age_max],
      });
      checkAudienceAPI.run({
        ...detail,
      });
    }
  }, [open]);

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
      }),
    {
      wait: 500,
    }
  );
  return (
    <>
      <IModalForm
        open={open}
        title="Update Customer Notification"
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: onCancel,
        }}
        onValuesChange={(curr, old) => {
          debounceSet.run();
        }}
        submitTimeout={2000}
        onRequest={async (values) => {
          values.age_min = values.age[0];
          values.age_max = values.age[1];
          values.gender === "all"
            ? (values.is_all = true)
            : (values.is_all = false);
          if (values.registered_date) {
            values.registered_start_date = new Date(values.registered_date[0]);
            values.registered_end_date = new Date(values.registered_date[1]);
          }

          if (values.images && values.images.length > 0) {
            let images = getImageSeperate(values.images);
            if (
              images.changedImages &&
              (images.changedImages?.length || 0) > 0
            ) {
              let newImages = await uploadMulti
                .runAsync({
                  files: images.changedImages,
                  names: images.changedImages.map((el) => el.name),
                  bucket_name: BUCKET_NAMES.notifications,
                })
                .then((el) => el.map((el) => el.path));
              values.images = [...newImages, ...(images.unChangedImages || [])];
            } else {
              values.images = [...(images.unChangedImages || [])];
            }
          }
          if (!detail?.id) {
            message.error("Notification ID not found");
            return;
          }
          if (values.planned_date) {
            values.planned_date = dayjs(values.planned_date);
          }

          return notifications.update(detail?.id, values);
        }}
        onSuccess={onFinish}
      >
        <FormDescriptionSection />
        <FormDateSection />
        <FormAudienceSection formRef={form} />
      </IModalForm>
    </>
  );
};

export default Update;
