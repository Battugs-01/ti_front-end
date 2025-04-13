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
import ledger from "service/fininaciar/accountSettlement/ledger";

const LedgerRemove: FC<ActionComponentProps<any>> = ({
  detail,
  onFinish,
  onCancel,
  open,
}) => {
  const formRef = useRef<ProFormInstance<DeleteConfirm>>();

  const remove = useRequest(ledger.deleteA, {
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
        if (detail) await remove.run(detail.id);
        return true;
      }}
    >
      <div>
        <ProFormText
          name="confirm"
          label={
            <div>
              <div className="mb-2">
                Та "<strong>{detail?.name}</strong>" данс -г сонгосон байна.
                Сонголтоо баталгаажуулна уу. Энэ үйлдлийг буцаах боломжгүй.
                Хэрэв та итгэлтэй байгаа бол "<strong>{detail?.name}</strong>"
                гэж оруулна уу.
              </div>
            </div>
          }
          placeholder={"данc"}
          rules={[
            {
              required: true,
              whitespace: false,
              pattern: new RegExp(`${detail?.name}`),
              message: `Та дансны нэрээ оруулна уу`
            },
          ]}
        />

        <ProFormSelect
          name="delete_transaction"
          tooltip="Устгах гүйлгээг сонговол дансны бүх гүйлгээг устгана"
          label="Дансны бүх гүйлгээг устгах"
          initialValue={{ label: "Устгахгүй", value: "not_delete" }}
          options={[
            {
              label: "Устгах",
              value: "delete",
            },
            {
              label: "Устгахгүй",
              value: "not_delete",
            },
          ]}
        />
      </div>
    </ModalForm>
  );
};

export default LedgerRemove;
