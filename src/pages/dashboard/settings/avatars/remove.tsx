import { ModalForm, ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Typography, message, notification } from "antd";
import { FC, useEffect, useRef } from "react";
import settings, { keys } from "service/settings";
import { ActionComponentProps } from "types";

const Remove: FC<ActionComponentProps<string>> = ({
  detail,
  onFinish,
  onCancel,
  open,
  details,
}) => {
  const formRef = useRef<ProFormInstance<any>>();
  const remove = useRequest(settings.set, {
    manual: true,
    onSuccess: () => {
      message.success("Removed");
      onFinish?.();
    },
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    if (detail) {
      formRef.current?.resetFields();
    }
  }, [detail]);

  return (
    <ModalForm
      open={open}
      modalProps={{
        onCancel,
        okText: "Remove",
        okButtonProps: {
          className: "bg-red-500 hover:bg-red-600 etxt-white rounded-md",
          color: "red",
          danger: true,
        },
        cancelButtonProps: {
          className:
            "hover:bg-gray-100 text-gray-700 border-gray-200 border rounded-md",
        },
        cancelText: "Cancel",
        className: "max-w-lg",
      }}
      className="p-5 "
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      onFinish={async () => {
        const newDetails =
          details?.filter((item) => item !== detail).map((item) => item) || [];
        remove.run(keys.avatars, newDetails);
        onFinish?.();
        return true;
      }}
    >
      <Typography.Title level={4} style={{ marginBottom: 20, marginTop: 20 }}>
        Remove Avatar
      </Typography.Title>
      <Typography.Text style={{ marginBottom: 20 }} className="text-gray-500">
        You are going to {"remove"} an avatar.
      </Typography.Text>
    </ModalForm>
  );
};

export default Remove;
