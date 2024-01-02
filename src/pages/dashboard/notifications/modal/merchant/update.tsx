import { useDebounceFn, useRequest } from "ahooks";
import { Form, UploadFile, notification } from "antd";
import { IModalForm } from "components/modal";
import { BUCKET_NAMES } from "config";
import file from "service/file";
import notifications from "service/notifications";
import {
  NotificationType,
  NotificationsModel,
} from "service/notifications/types";
import { ActionComponentProps } from "types";
import { FormFields } from "./part/fields";
import { convertFileToUploadFile, getImageSeperate } from "utils/index";
import { useEffect } from "react";

export const UpdateMerchant = ({
  open,
  onCancel,
  onFinish,
  detail,
}: ActionComponentProps<NotificationsModel>) => {
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

  const debounceSet = useDebounceFn(
    () =>
      checkAudienceAPI.run({
        ...form.getFieldsValue(),
        images: undefined,
        service_ids:
          (form.getFieldValue("service_ids")?.length || 0) > 0
            ? form.getFieldValue("service_ids")
            : undefined,
        type: NotificationType.merchant,
      }),
    {
      wait: 500,
    }
  );

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        ...detail,
        images: detail?.images?.map((el) => convertFileToUploadFile(el)).flat(),
      });
      checkAudienceAPI.run({ ...detail });
    }
  }, [form, open]);
  return (
    <IModalForm
      open={open}
      title="Update Merchant Notification"
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: onCancel,
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
          let images = getImageSeperate(values.images);
          values.images = images.unChangedImages;
          if (images.changedImages && (images.changedImages?.length || 0) > 0) {
            let newImages = await uploadMulti
              .runAsync({
                names: values.images?.map((el: UploadFile) => el?.name),
                files: values.images,
                bucket_name: BUCKET_NAMES.notifications,
              })
              .then((el) => el.map((el) => el.path));
            values.images = [...newImages, ...values.images];
          }
        }
        values.type = NotificationType.merchant;
        values.planned_date = new Date(values.planned_date);
        return notifications.update(detail?.id || 0, values);
      }}
      onSuccess={onFinish}
    >
      <FormFields />
    </IModalForm>
  );
};
