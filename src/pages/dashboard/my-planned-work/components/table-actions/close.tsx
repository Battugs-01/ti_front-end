import ProForm, {
  ModalForm,
  ModalFormProps,
  ProFormInstance,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import { useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import screenList from "service/screening_list";
type PropsCancel = ModalFormProps & {
  onCancel: () => void;
  data?: any;
  onFinish?: () => void;
};

export const CloseModal = ({
  onCancel,
  data,
  onFinish,
  ...rest
}: PropsCancel) => {
  const formRef = useRef<ProFormInstance>();
  const intl = useIntl();
  const closeRequest = useRequest(screenList.close, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай",
      });
      onFinish && onFinish();
    },
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  return (
    <ModalForm
      {...rest}
      width={550}
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      open={!!data}
      title={intl.formatMessage({ id: "close_quistion" })}
      modalProps={{
        destroyOnClose: true,
        width: "650px",
        onCancel: () => {
          onCancel?.();
          formRef?.current?.resetFields();
        },
        styles: {
          header: {
            padding: "1.2rem",
            borderBottom: "1px solid #EAECF0",
          },
          content: {
            padding: "0",
          },
          body: {
            padding: "1.2rem 1.2rem 0 1.2rem",
          },
          footer: {
            padding: "0 1.2rem 1.2rem 1.2rem",
          },
        },
      }}
      submitter={{
        render: (props) => {
          return (
            <div className="flex items-center gap-4">
              <Button
                onClick={() => {
                  onCancel?.();
                  formRef?.current?.resetFields();
                }}
                size="large"
                type="default"
              >
                <FormattedMessage id="cancel" />
              </Button>
              <Button
                onClick={props.submit}
                size="large"
                type="primary"
                className="flex items-center"
              >
                <FormattedMessage id="save" />
              </Button>
            </div>
          );
        },
      }}
      onFinish={async (values) => {
        if (
          !!data &&
          (await closeRequest.runAsync({ ...values, id: data.id }))
        ) {
          return true;
        }
        return false;
      }}
    >
      <ProForm.Item noStyle shouldUpdate>
        {(form) => {
          return (
            <>
              <ProFormTextArea
                name="reason"
                label={
                  <div className="text-gray-700 font-medium ">
                    {intl.formatMessage({ id: "reason" })}
                  </div>
                }
                placeholder={intl.formatMessage({ id: "placeholder_text" })}
              />
            </>
          );
        }}
      </ProForm.Item>
    </ModalForm>
  );
};
