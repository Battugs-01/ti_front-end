import { ProFormInstance } from "@ant-design/pro-form";
import { SectionContainer } from "components/index";
import { IModalForm } from "components/modal";
import { IProFormSelect } from "components/select";
import { FORM_ITEM_RULE } from "config";
import { useRef } from "react";
import merchantService from "service/merchantService";
import { MerchantService } from "service/merchantService/type";
import { ActionComponentProps } from "types";
import { FormFields } from "./parts/fields";

export const CreatePermission = ({
  onCancel,
  onFinish,
  open,
}: ActionComponentProps<MerchantService>) => {
  const formRef = useRef<ProFormInstance>();

  return (
    <IModalForm
      title="Create"
      open={open}
      formRef={formRef}
      modalProps={{
        onCancel,
      }}
      onOpenChange={() => formRef.current?.resetFields()}
      onSuccess={onFinish}
      onRequest={merchantService.createPermission}
    >
      <SectionContainer
        label="Services"
        children={
          <IProFormSelect
            filter={{ is_not_relation_product: true }}
            name={"service_ids"}
            request={merchantService.list}
            mode="multiple"
            rules={FORM_ITEM_RULE()}
          />
        }
      />
      <FormFields />
    </IModalForm>
  );
};
