import { ModalForm, ProFormInstance, ProFormText } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { message } from "antd";
import { Ledger } from "service/feild_registration/type";
import ledger from "service/fininaciar/accountSettlement/ledger";
import { useEffect, useRef } from "react";

interface Props {
  open: boolean;
  onCancel: () => void;
  onFinish: () => void;
  detail?: Ledger;
}
const UpdateLedger = ({ open, onCancel, onFinish, detail }: Props) => {
  const formRef = useRef<ProFormInstance>();
  const updateLedger = useRequest(ledger.update, {
    manual: true,
    onError: (error) => {

      message.error(error.message);
    },
  });
  useEffect(() => {
    if (open) {
      formRef.current?.setFieldsValue({
        ...detail,
      });
    }
  }, [open]);

  return (
    <ModalForm
      formRef={formRef}
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onCancel();
          formRef.current?.resetFields();
        }
      }}
      title="Данс засах"
      onFinish={async (values) => {
        if (await updateLedger.runAsync(detail?.id || 0, values)) {
            onFinish();
            return true;
        }
        return false;
      }}
    >
      <ProFormText
        name="name"
        label="Дансны код"
        rules={[
            { required: true, message: "Дансны код оруулна уу" },
        ]}
      />
    </ModalForm>
  );
};

export default UpdateLedger;
