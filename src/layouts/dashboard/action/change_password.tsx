import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import { Button, Col, Row } from "antd";
import { FORM_ITEM_RULE, permissionArray } from "config";
import { FormattedMessage, useIntl } from "react-intl";

interface ChangePasswordProps {
  visible: boolean;
  onClose: () => void;
  onFinish: () => void;
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({
  visible,
  onClose,
}) => {
  const intl = useIntl();
  return (
    <ModalForm
      title={intl.formatMessage({ id: "change_password" })}
      width={650}
      open={visible}
      onFinish={async (values) => {}}
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
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormText.Password
            name="new_password"
            label={intl.formatMessage({ id: "new_password" })}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormText.Password
            name="new_password_repeat"
            label={intl.formatMessage({ id: "new_password_repeat" })}
          />
        </Col>
      </Row>
    </ModalForm>
  );
};
