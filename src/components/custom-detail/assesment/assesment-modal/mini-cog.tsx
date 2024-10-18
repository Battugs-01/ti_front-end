import {
  ModalForm,
  ModalFormProps,
  ProFormInstance,
} from "@ant-design/pro-form";
import { Flex, Image } from "antd";
import { useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import file from "service/file";
import { Minicog as MinicogType } from "service/screening_list/type";

type PropsCancel = ModalFormProps & {
  onCancel: () => void;
  data: MinicogType;
};

export const MiniCogModal = ({ data, onCancel }: PropsCancel) => {
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
          {intl.formatMessage({ id: "mini_cog" }).toUpperCase()}
        </div>
      }
      width={550}
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      className="pt-3"
      open={!!data}
    >
      <Flex vertical gap={"24px"}>
        <Flex className="flex flex-row justify-between">
          <div className="flex flex-col gap-0 text-gray-900 font-medium text-sm">
            <FormattedMessage id="recall_three_word" />
            <div className="m-0 p-0 font-normal">
              {data?.word_point} <FormattedMessage id="point" />
            </div>
          </div>
          <div>{data?.words || "-"}</div>
        </Flex>
        <Flex className="flex flex-row justify-between">
          <div className="flex flex-col gap-0 text-gray-900 font-medium text-sm">
            <FormattedMessage id="time_drawing" />
            <div className="m-0 p-0 font-normal">
              {data?.clock_point} <FormattedMessage id="point" />
            </div>
          </div>
          <Image
            width={100}
            src={file.fileToUrl(
              data?.clock?.physical_path ?? "fallback-image-path.jpg"
            )}
          />
        </Flex>
      </Flex>
    </ModalForm>
  );
};
