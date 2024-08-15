import {
  DrawerForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import { Button, Col, Row } from "antd";
import { FORM_ITEM_RULE } from "config";
import { FormattedMessage, useIntl } from "react-intl";
import { ActionComponentProps } from "types";
import { Save02 } from "untitledui-js-base";

export const CreatePermission: React.FC<ActionComponentProps<any>> = ({
  onCancel,
  onFinish,
  open,
  detail,
}) => {
  const intl = useIntl();
  return (
    <DrawerForm
      className="custom-ant-drawer-body"
      onFinish={async (values) => {
        onFinish?.();
      }}
      title={intl.formatMessage({ id: "member_drawer_title" })}
      open={open}
      submitter={{
        render: (props) => {
          return (
            <div className="flex items-center gap-4">
              <Button onClick={onCancel} size="large" type="default">
                <FormattedMessage id="cancel" />
              </Button>
              <Button
                onClick={props.submit}
                size="large"
                type="primary"
                icon={<Save02 />}
                className="flex items-center"
              >
                <FormattedMessage id="save" />
              </Button>
            </div>
          );
        },
      }}
      drawerProps={{
        onClose: onCancel,
        width: 500,
      }}
    >
      <div className="text-base font-semibold">
        <FormattedMessage id="create_member_title" />
      </div>
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
              <ProFormText
                name="last_name"
                label={intl.formatMessage({ id: "last_name" })}
              />
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <ProFormUploadButton
            title={
              <div className="flex items-center flex-col justify-center gap-2 text-[#00000073]">
                <div className="text-xs ">Click to upload</div>
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
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormSelect
            extra={intl.formatMessage({ id: "agency_extra" })}
            name="agency"
            label={intl.formatMessage({ id: "agency" })}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ProFormDatePicker
            name="date_of_birth"
            label={intl.formatMessage({ id: "date_of_birth" })}
          />
        </Col>
        <Col span={12}>
          <ProFormSelect
            name="gender"
            label={intl.formatMessage({ id: "gender" })}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ProFormText
            name="phone"
            label={intl.formatMessage({ id: "phone" })}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="email"
            label={intl.formatMessage({ id: "email" })}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormText
            name="address"
            label={intl.formatMessage({ id: "address" })}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormSelect
            name="permission"
            label={intl.formatMessage({ id: "permission" })}
          />
        </Col>
      </Row>
    </DrawerForm>
  );
};
