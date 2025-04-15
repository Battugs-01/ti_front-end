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
import customerCompany from "service/fininaciar/customerCompany";

const CustomerCompanyRemove: FC<ActionComponentProps<any>> = ({
  detail,
  onFinish,
  onCancel,
  open,
}) => {
  const formRef = useRef<ProFormInstance<DeleteConfirm>>();

  const remove = useRequest(customerCompany.deleteA, {
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
      onFinish={async (_values: any) => {
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
                Та "<strong>{detail?.name}</strong>" -г сонгосон байна.
                Сонголтоо баталгаажуулна уу. Энэ үйлдлийг буцаах боломжгүй.
                Хэрэв та итгэлтэй байгаа бол "<strong>{detail?.name}</strong>"
                гэж оруулна уу.
              </div>
            </div>
          }
          placeholder={"компанийн нэр"}
          rules={[
            {
              required: true,
              whitespace: false,
              pattern: new RegExp(`${detail?.name}`),
              message: `Та компанийн нэрээ оруулна уу`
            },
          ]}
        />
      </div>
    </ModalForm>
  );
};

export default CustomerCompanyRemove;
