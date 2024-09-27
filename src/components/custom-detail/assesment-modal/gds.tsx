import {
  ModalForm,
  ModalFormProps,
  ProFormInstance,
} from "@ant-design/pro-form";
import BooleanBadge from "components/badge/boolean";
import OtherBadge from "components/badge/other";
import { useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Gds } from "service/screening_list/type";

type PropsCancel = ModalFormProps & {
  onCancel: () => void;
  data: Gds;
};

export const GDSModal = ({ data, onCancel }: PropsCancel) => {
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
          {intl.formatMessage({ id: "geriatric_depression" }).toUpperCase()}
        </div>
      }
      width={650}
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      className="pt-3"
      open={!!data}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-row justify-between">
          <div className="text-gray-900 font-medium text-sm">
            <FormattedMessage id="satisfied_with_your_life" />
          </div>
          <div className="text-gray-700 font-normal text-sm ">
            <OtherBadge status={data?.is_life_satisfied} />
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-gray-900 font-medium text-sm">
            <FormattedMessage id="often_sad" />
          </div>
          <div className="text-gray-700 font-normal text-sm ">
            <BooleanBadge status={data?.is_often_sad} />
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-gray-900 font-medium text-sm">
            <FormattedMessage id="feel_helpless" />
          </div>
          <div className="text-gray-700 font-normal text-sm ">
            <BooleanBadge status={data?.is_feel_weak} />
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-gray-900 font-medium text-sm">
            <FormattedMessage id="go_out_something_new" />
          </div>
          <div className="text-gray-700 font-normal text-sm ">
            <BooleanBadge status={data?.is_rather_stay_home} />
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-gray-900 font-medium text-sm">
            <FormattedMessage id="you_are_useless" />
          </div>
          <div className="text-gray-700 font-normal text-sm ">
            <BooleanBadge status={data?.is_feel_useless} />
          </div>
        </div>
      </div>
    </ModalForm>
  );
};
