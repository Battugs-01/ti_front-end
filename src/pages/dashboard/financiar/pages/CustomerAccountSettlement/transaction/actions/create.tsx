import { ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { IModalForm } from "components/modal";
import moment from "moment";
import { useRef } from "react";
import transaction from "service/fininaciar/accountSettlement/transaction";
import { ActionComponentProps } from "types";
import { Info } from "./parts/info";

export const CreateService = ({ ...rest }: ActionComponentProps<any>) => {
  const formRef = useRef<ProFormInstance>();

  const create = useRequest(transaction.create, {
    manual: true,
  });

  return (
    <IModalForm
      open={rest.open}
      title="Дансны зузаатгал нэмэх"
      formRef={formRef}
      onOpenChange={() => {
        formRef.current?.resetFields();
      }}
      width={1000}
      scrollToFirstError={true}
      modalProps={{ maskClosable: false, onCancel: rest.onCancel }}
      cancelText={"Буцах"}
      okText={"Хадгалах"}
      className="px-3"
      onRequest={async (values) => {
        if (!!values) {
          if (
            await create.runAsync({
              ...values,
              created_at: moment(values.created_at).toDate(),
              transaction_type: "debit",
            })
          ) {
            return true;
          }
        }
      }}
      onSuccess={rest.onFinish}
    >
      <Info />
    </IModalForm>
  );
};
