import { ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { IModalForm } from "components/modal";
import { useRef } from "react";
import customerCompany from "service/fininaciar/customerCompany";
import { ActionComponentProps } from "types";
import { CustomerCompanyForm } from "../components";
import { MODAL_TITLES, BUTTON_TEXTS } from "../constants";

/**
 * Component for creating a new customer company
 */
export const CreateService = ({ ...rest }: ActionComponentProps<any>) => {
  const formRef = useRef<ProFormInstance>();

  const create = useRequest(customerCompany.create, {
    manual: true,
    // onError: (err) => {
    //   notification.error({
    //     message: err.message,
    //   });
    // },
  });

  return (
    <IModalForm
      open={rest.open}
      title={MODAL_TITLES.CREATE}
      formRef={formRef}
      onOpenChange={() => {
        formRef.current?.resetFields();
      }}
      width={1000}
      scrollToFirstError={true}
      modalProps={{ maskClosable: false, onCancel: rest.onCancel }}
      cancelText={BUTTON_TEXTS.CANCEL}
      okText={BUTTON_TEXTS.SAVE}
      className="px-3"
      onRequest={async (values) => {
        if (!!values) {
          if (
            await create.runAsync({
              ...values,
            })
          ) {
            return true;
          }
        }
      }}
      onSuccess={rest.onFinish}
    >
      <CustomerCompanyForm isCreate={true} />
    </IModalForm>
  );
};
