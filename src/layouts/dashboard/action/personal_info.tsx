import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import { Button, Col, Row } from "antd";
import { FORM_ITEM_RULE, permissionArray } from "config";
import { FormattedMessage, useIntl } from "react-intl";

interface PersonalInfoProps {
  visible: boolean;
  onClose: () => void;
  onFinish: () => void;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({
  visible,
  onClose,
}) => {
  const intl = useIntl();
  return (
    <ModalForm
      title={intl.formatMessage({ id: "personal_info" })}
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
        <Col span={16}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <ProFormText
                name="first_name"
                label={intl.formatMessage({ id: "first_name" })}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <ProFormSelect
                name="role"
                options={permissionArray.map((el) => ({
                  label: <FormattedMessage id={el} />,
                  value: el,
                }))}
                label={intl.formatMessage({ id: "position" })}
                fieldProps={{
                  size: "large",
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <ProFormUploadButton
            className="w-max h-max"
            title={
              <div className="flex items-center flex-col justify-center gap-2 text-[#00000073] p-2">
                <div className="text-sm">
                  {" "}
                  <div className="text-primary-700 font-semibold">
                    <FormattedMessage id="upload" />{" "}
                  </div>
                  <div>
                    <FormattedMessage id="image_types" />
                  </div>
                </div>
              </div>
            }
            label={intl.formatMessage({ id: "upload_picture" })}
            max={1}
            rules={[
              {
                validator: (_, file) => {
                  if (file && file.length > 0) {
                    if (
                      file[0].type === "image/jpeg" ||
                      file[0].type === "image/png"
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Зөвхөн JPG, PNG файлыг оруулах боломжтой"
                    );
                  } else {
                    return Promise.resolve();
                  }
                },
              },
              ...FORM_ITEM_RULE(),
            ]}
            name="profile"
            fieldProps={{
              name: "file",
              listType: "picture-card",
              beforeUpload: () => {
                return false;
              },
            }}
          />
        </Col>
      </Row>
    </ModalForm>
  );
};
