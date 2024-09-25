import ProForm, {
  ModalForm,
  ModalFormProps,
  ProFormDatePicker,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import ProFormDatePickerYear from "@ant-design/pro-form/es/components/DatePicker/YearPicker";
import { Button, Col, Row } from "antd";
import { SectionContainer } from "components/index";
import { IModalForm } from "components/modal";
import { FORM_ITEM_RULE } from "config";
import { useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";

type PropsCancel = ModalFormProps & {
  onCancel: () => void;
  visible: boolean;
  onFinish?: () => void;
};

export const DevPlanEndModal = ({
  onCancel,
  onFinish,
  visible,
  ...rest
}: PropsCancel) => {
  const formRef = useRef<ProFormInstance>();
  const intl = useIntl();

  //   const cancelRequest = useRequest(requested.cancelRequest, {
  //     manual: true,
  //     onSuccess: () => {
  //       notification.success({
  //         message: "Амжилттай",
  //       }),
  //         onFinish && onFinish();
  //     },

  //     onError: (err) => {
  //       notification.error({
  //         message: err.message,
  //       }),
  //         onFinish && onFinish();
  //     },
  //   });

  return (
    <ModalForm
      {...rest}
      modalProps={{ maskClosable: false, onCancel, className: "rounded " }}
      labelAlign="left"
      layout="vertical"
      title={
        <div className="text-lg font-semibold text-gray-900">
          {intl.formatMessage({ id: "development_plan" })}
        </div>
      }
      width={550}
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      className="pt-3"
      open={visible === true}
      submitter={{
        render: ({ submit: cancelRequest }) => {
          return (
            <div className="flex items-center gap-3">
              <Button onClick={onCancel} size="large" type="default">
                <FormattedMessage id="cancel" />
              </Button>
              <Button onClick={cancelRequest} size="large" type="primary">
                <FormattedMessage id="save" />
              </Button>
            </div>
          );
        },
      }}
      //   onFinish={async (values) => {
      //     if (
      //       !!data &&
      //       (await cancelRequest.runAsync(data.id, { ...values, status: 7 }))
      //     ) {
      //       return true;
      //     }
      //     return false;
      //   }}
    >
      <div className="">
        <SectionContainer
          label={intl.formatMessage({ id: "next_assessment" })}
          children={
            <ProFormRadio.Group
              name="delivered_type"
              radioType="button"
              options={[
                {
                  label: intl.formatMessage({ id: "yes" }),
                  value: 1,
                },
                {
                  label: intl.formatMessage({ id: "no" }),
                  value: 2,
                },
              ]}
            />
          }
        />

        <ProFormDatePicker
          name="birth_date"
          label={
            <div className="text-base font-medium">
              {intl.formatMessage({ id: "implement_date" })}
            </div>
          }
        />

        <div className="text-lg font-medium m-0 p-0">
          <FormattedMessage id="risk_level" />
        </div>
        <ProFormRadio.Group
          name="permission_level"
          className="flex gap-2 mt-0 pt-0"
          layout="vertical"
          options={[
            {
              label: (
                <div className="flex flex-col m-0 p-0 mt-4">
                  <span className="m-0 p-0 text-base font-medium text-gray-700">
                    Өндөр
                  </span>
                  <span className="m-0 p-0 text-sm font-normal text-gray-600">
                    Яаралтай хэрэгжүүлж эхлэх шаардлагатай
                  </span>
                </div>
              ),
              value: 1,
            },
            {
              label: (
                <div className="flex flex-col m-0 p-0 mt-4">
                  <span className="m-0 p-0 text-base font-medium text-gray-700">
                    Дунд
                  </span>
                  <span className="m-0 p-0 text-sm font-normal text-gray-600">
                    Дараагийн хэдэн 7 хоног дотор эхлэх хэрэгтэй
                  </span>
                </div>
              ),
              value: 2,
            },
            {
              label: (
                <div className="flex flex-col m-0 p-0 mt-4">
                  <span className="m-0 p-0 text-base font-medium text-gray-700">
                    Бага
                  </span>
                  <span className="m-0 p-0 text-sm font-normal text-gray-600">
                    Дараагийн хэдэн сар дотор эхлэх хэрэгтэй
                  </span>
                </div>
              ),
              value: 3,
            },
          ]}
        />
        <ProFormTextArea
          name="description"
          placeholder="Дэлгэрэнгүй оруулна уу..."
          label={<div className="text-base font-medium">Тэмдэглэл</div>}
        />
      </div>
    </ModalForm>
  );
};
