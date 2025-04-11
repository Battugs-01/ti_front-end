import {
  ModalForm,
  ProFormCheckbox,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-form";
import { deleteConfirm, deleteConfirmReg } from "config";
import { FC, useRef } from "react";
import { ActionComponentProps, DeleteConfirm } from "types";
import { useRequest } from "ahooks";
import { message } from "antd";
import transaction from "service/fininaciar/accountSettlement/transaction";

const TransactionRemove: FC<ActionComponentProps<any>> = ({
  detail,
  onFinish,
  onCancel,
  open,
}) => {
  const formRef = useRef<ProFormInstance<DeleteConfirm>>();

  const remove = useRequest(transaction.deleteA, {
    manual: true,
    onSuccess: () => {
      message.success({
        content: `амжилттай устгалаа`,
        style: { color: "#027A48" },
      });
      onFinish?.();
    },
    onError: (err) => message.error(err.message),
  });

  return (
    <ModalForm<DeleteConfirm>
      width={500}
      open={open}
      formRef={formRef}
      requiredMark={false}
      onOpenChange={(isOpen) => {
        if (!isOpen) onCancel?.();
      }}
      modalProps={{
        bodyStyle: {
          paddingBottom: 0,
          paddingTop: "0.382rem",
        },
        onCancel: onCancel,
      }}
      submitter={{
        searchConfig: {
          resetText: "Буцах",
          submitText: "Устгах",
        },
        submitButtonProps: {
          danger: true,
        },
      }}
      onFinish={async (_values) => {
        if (detail) await remove.run(detail.id, _values);
        return true;
      }}
    >
      <div>
        <ProFormText
          name="confirm"
          label={
            <div>
              <div className="mb-2">
                Та "<strong>{detail?.amount}</strong>" -ний дүнтэй{" "}
                <strong>{detail?.transaction_type}</strong> төрөлтэй{" "}
                <strong>{detail?.ledger.name}</strong> данс -г сонгосон байна.
                Сонголтоо баталгаажуулна уу. Энэ үйлдлийг буцаах боломжгүй.
                Хэрэв та итгэлтэй байгаа бол "<strong>{deleteConfirm}</strong>"
                гэж оруулна уу.
              </div>
              <div>
                Хэрэв та энэ гүйлгээг устгавал{" "}
                <strong>{detail?.ledger.name}</strong> данстай{" "}
                <strong>{detail?.ledger?.customer_company?.name}</strong>{" "}
                харилцагч компанийн данс руу <strong>{detail?.amount}</strong>{" "}
                -ний дүн буцаалт хийгдэнэ.
              </div>
            </div>
          }
          placeholder={deleteConfirm}
          rules={[
            {
              required: true,
              whitespace: false,
              pattern: deleteConfirmReg,
              message: `Устгахдаа итгэлтэй байвал "${deleteConfirm}" гэж бөглөнө үү`,
            },
          ]}
        />

        <ProFormSelect
          name="is_refund"
          label="Буцаалт хийх эсэх"
          initialValue={{ label: "Буцаалт хийх", value: "refund" }}
          options={[
            { label: "Буцаалт хийх", value: "refund" },
            { label: "Буцаалт хийхгүй", value: "no_refund" },
          ]}
        />
      </div>
    </ModalForm>
  );
};

export default TransactionRemove;
