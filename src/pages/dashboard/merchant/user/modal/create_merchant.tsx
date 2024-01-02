import { IModalForm } from "components/modal";
import { Merchant } from "service/merchant/type";
import { ActionComponentProps } from "types";
import { FormFields } from "./part/field";
import merchant from "service/merchant";
import { ProFormInstance } from "@ant-design/pro-form";
import { useEffect, useRef } from "react";

export const CreateMerchant = ({
  onFinish,
  onCancel,
  open,
}: ActionComponentProps<Merchant>) => {
  const formRef = useRef<ProFormInstance>();

  return (
    <IModalForm
      open={open}
      modalProps={{
        onCancel,
      }}
      formRef={formRef}
      onOpenChange={() => formRef.current?.resetFields()}
      title="Create Merchant User"
      onRequest={merchant.create}
      onSuccess={onFinish}
    >
      <FormFields />
    </IModalForm>
  );
};
