import { ModalForm, ProFormText } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Col, notification, Row } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import profile from "service/profile";

interface ChangePasswordProps {
  visible: boolean;
  onClose: () => void;
  onFinish: () => void;
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({
  visible,
  onClose,
  onFinish,
}) => {
  const updatePassword = useRequest(profile.editPassword, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: intl.formatMessage({ id: "success" }),
      });
      onFinish?.();
    },
    onError: (error: any) => {
      notification.error({
        message: error.message,
      });
      onClose?.();
    },
  });
  const intl = useIntl();
  return (
    <ModalForm
      title={intl.formatMessage({ id: "change_password" })}
      width={650}
      open={visible}
      onFinish={async (values) => {
        if (values?.new_password !== values?.new_password_repeat) {
          notification.error({
            message: intl.formatMessage({ id: "password_not_match" }),
          });
          return;
        }
        await updatePassword.runAsync({
          old_password: values?.old_password,
          password: values?.new_password,
        });
        onFinish?.();
      }}
      modalProps={{
        onCancel: onClose,
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
              <Button onClick={onClose} size="large" type="default">
                <FormattedMessage id="cancel" />
              </Button>
              <Button onClick={props.submit} size="large" type="primary">
                <FormattedMessage id="save" />
              </Button>
            </div>
          );
        },
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormText.Password
            name="old_password"
            label={intl.formatMessage({ id: "old_password" })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: "required" }),
              },
            ]}
            fieldProps={{
              size: "large",
            }}
            placeholder={intl.formatMessage({ id: "placeholder_text" })}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormText.Password
            name="new_password"
            label={intl.formatMessage({ id: "new_password" })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: "required" }),
              },
            ]}
            fieldProps={{
              size: "large",
            }}
            placeholder={intl.formatMessage({ id: "placeholder_text" })}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormText.Password
            name="new_password_repeat"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: "required" }),
              },
            ]}
            fieldProps={{
              size: "large",
            }}
            label={intl.formatMessage({ id: "new_password_repeat" })}
            placeholder={intl.formatMessage({ id: "placeholder_text" })}
          />
        </Col>
      </Row>
    </ModalForm>
  );
};
