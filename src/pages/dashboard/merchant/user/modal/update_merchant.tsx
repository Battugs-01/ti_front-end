import { ProFormInstance } from "@ant-design/pro-form";
import { IModalForm } from "components/modal";
import { useEffect, useRef } from "react";
import { Merchant } from "service/merchant/type";
import { ActionComponentProps } from "types";
import { FormFields } from "./part/field";
import merchant from "service/merchant";

export const UpdateMerchant = ({
  onFinish,
  onCancel,
  open,
  detail,
}: ActionComponentProps<Merchant>) => {
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    formRef.current?.resetFields();
    formRef.current?.setFieldsValue({
      ...detail,
      phone_locale: detail?.phone.includes("+976") ? "+976" : "",
      phone: detail?.phone.includes("+976")
        ? detail.phone.replace("+976", "")
        : detail?.phone,
    });
  }, [detail, open]);

  return (
    <IModalForm
      open={open}
      formRef={formRef}
      modalProps={{
        onCancel,
      }}
      onOpenChange={() => formRef.current?.resetFields()}
      title="Update Merchant User"
      onRequest={async (values) => {
        values.phone = values.phone_locale + values.phone;
        merchant.update(detail?.id || 0, { ...values });
      }}
      onSuccess={onFinish}
    >
      <FormFields />
    </IModalForm>
  );
};
