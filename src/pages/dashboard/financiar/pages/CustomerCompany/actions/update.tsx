import { ProFormInstance } from "@ant-design/pro-form";
import { IModalForm } from "components/modal";
import { useEffect, useRef } from "react";
import customerCompany from "service/fininaciar/customerCompany";
import { ActionComponentProps } from "types";
import { CustomerCompanyForm } from "../components";
import { MODAL_TITLES, BUTTON_TEXTS } from "../constants";

/**
 * Component for updating an existing customer company
 */
export const UpdateCustomerCompany = ({
  onCancel,
  onFinish,
  open,
  detail,
}: ActionComponentProps<any>) => {
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (open) {
      formRef.current?.setFieldsValue({
        ...detail,
        ledger_name: detail?.ledger?.name,
      });
    }
  }, [open]);

  return (
    <IModalForm
      open={open}
      formRef={formRef}
      title={MODAL_TITLES.UPDATE}
      cancelText={BUTTON_TEXTS.CANCEL}
      width={1000}
      okText={BUTTON_TEXTS.SAVE}
      modalProps={{ maskClosable: false, onCancel }}
      onRequest={async (values) => {
        if (
          await customerCompany.update(
            {
              ...values,
            },
            detail?.id || 0
          )
        ) {
          return true;
        }
      }}
      onSuccess={onFinish}
    >
      <CustomerCompanyForm isCreate={false} />
    </IModalForm>
  );
};
