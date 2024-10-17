import {
  ModalForm,
  ModalFormProps,
  ProFormInstance,
} from "@ant-design/pro-form";
import { Image } from "antd";
import { useRef } from "react";
import { useIntl } from "react-intl";
import file from "service/file";

type PropsCancel = ModalFormProps & {
  onCancel: () => void;
  data: any;
};

export const FamilyPicModal = ({ data, onCancel }: PropsCancel) => {
  const formRef = useRef<ProFormInstance>();
  const intl = useIntl();

  return (
    <ModalForm
      modalProps={{ maskClosable: false, onCancel, className: "rounded " }}
      labelAlign="left"
      layout="vertical"
      submitter={false}
      title={
        <div className="text-lg font-semibold text-gray-900">
          {intl.formatMessage({ id: "family_pic" }).toUpperCase()}
        </div>
      }
      width={550}
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      className="pt-3"
      open={!!data}
    >
      <div className="flex items-center justify-center">
        <Image
          width={100}
          src={file.fileToUrl(
            data?.psychological_resources?.family_draw?.physical_path ??
              "fallback-image-path.jpg"
          )}
        />
      </div>
    </ModalForm>
  );
};
