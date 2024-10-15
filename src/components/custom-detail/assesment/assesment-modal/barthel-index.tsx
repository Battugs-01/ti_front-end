import {
  ModalForm,
  ModalFormProps,
  ProFormInstance,
} from "@ant-design/pro-form";
import { useRef } from "react";
import { useIntl } from "react-intl";
import { BarthelIndexElement } from "service/screening_list/type";

type PropsCancel = ModalFormProps & {
  onCancel: () => void;
  data: BarthelIndexElement[];
};

export const BartherIndexModal = ({ data, onCancel }: PropsCancel) => {
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
          {intl.formatMessage({ id: "barthel_index" }).toUpperCase()}
        </div>
      }
      width={550}
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      className="pt-3"
      open={!!data}
    >
      <div className="flex flex-col gap-3">
        {data?.map((item) => (
          <div key={item?.id} className="grid grid-cols-2">
            <div className="text-gray-900 font-medium text-sm col-span-1">
              {localStorage?.getItem("web.locale") === "en"
                ? item?.barthel_index?.name_en || item?.barthel_index?.name
                : item?.barthel_index?.name}
            </div>
            <div className="text-gray-700 font-normal text-sm col-span-1">
              {localStorage?.getItem("web.locale") === "en"
                ? item?.answer?.answer_en || item?.answer?.answer
                : item?.answer?.answer}
            </div>
          </div>
        ))}
      </div>
    </ModalForm>
  );
};
