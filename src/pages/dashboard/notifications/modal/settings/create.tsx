import { ProFormInstance } from "@ant-design/pro-form";
import { IModalForm } from "components/modal";
import { useRef } from "react";
import notificationSettings from "service/notificationSettings";
import { ActionComponentProps } from "types";
import { FormGeneralFields } from "./part/general";
import { FormIntervalTypeFields } from "./part/interval_type";
import { FormOrderTypeFields } from "./part/when_order_type";

export const CreateSettings = ({
  open,
  onCancel,
  onFinish,
}: ActionComponentProps<any>) => {
  const formRef = useRef<ProFormInstance>();
  return (
    <IModalForm
      open={open}
      title="Create Settings Notification"
      formRef={formRef}
      autoFocusFirstInput
      onOpenChange={() => formRef.current?.resetFields()}
      modalProps={{
        destroyOnClose: true,
        onCancel: onCancel,
      }}
      submitTimeout={2000}
      onRequest={async (values) => {
        return notificationSettings.create(values);
      }}
      onSuccess={onFinish}
    >
      <FormGeneralFields />
      <FormIntervalTypeFields />
      <FormOrderTypeFields />
    </IModalForm>
  );
};
