import { ProFormInstance } from "@ant-design/pro-form";
import { IModalForm } from "components/modal";
import { useEffect, useRef } from "react";
import merchantService from "service/merchantService";
import { MerchantService } from "service/merchantService/type";
import { ActionComponentProps } from "types";
import { FormFields } from "./parts/fields";
export const UpdatePermission = ({
  onCancel,
  onFinish,
  open,
  detail,
}: ActionComponentProps<MerchantService>) => {
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    formRef.current?.resetFields();
    formRef.current?.setFieldsValue({ ...detail });
  }, [detail]);

  return (
    <IModalForm
      title="Permission"
      open={open}
      formRef={formRef}
      modalProps={{
        onCancel,
      }}
      onSuccess={onFinish}
      onRequest={async (values) => {
        return merchantService.update(detail?.id || 0, {
          ...detail,
          ...values,
        });
      }}
    >
      <FormFields />
    </IModalForm>
  );
};
