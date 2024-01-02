import { Form } from "antd";
import { IModalForm } from "components/modal";
import { useEffect } from "react";
import notificationSettings from "service/notificationSettings";
import { NotificationSettings } from "service/notificationSettings/type";
import { ActionComponentProps } from "types";
import { FormGeneralFields } from "./part/general";
import { FormIntervalTypeFields } from "./part/interval_type";
import { FormOrderTypeFields } from "./part/when_order_type";

export const UpdateSettings = ({
  open,
  onCancel,
  onFinish,
  detail,
}: ActionComponentProps<NotificationSettings>) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form?.resetFields();
    if (open) {
      form?.setFieldsValue({ ...detail });
    }
  }, [open]);

  return (
    <IModalForm
      open={open}
      title="Update Settings Notification"
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: onCancel,
      }}
      onRequest={async (values) => {
        return notificationSettings.update(detail?.id || 0, {
          ...detail,
          ...values,
        });
      }}
      onSuccess={onFinish}
    >
      <FormGeneralFields />
      <FormIntervalTypeFields />
      <FormOrderTypeFields />
    </IModalForm>
  );
};
