import {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Col, notification, Row } from "antd";
import {
  FORM_ITEM_RULE,
  permissionArray,
  permissionArraySuperAdmin,
} from "config";
import { AuthContext } from "context/auth";
import { useContext } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import file from "service/file";
import profile from "service/profile";

interface PersonalInfoProps {
  visible: boolean;
  onClose: () => void;
  onFinish: () => void;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({
  visible,
  onClose,
  onFinish,
}) => {
  const [user] = useContext(AuthContext);
  const updateProfile = useRequest(profile.info, {
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
  const uploadProfile = useRequest(file.upload, {
    manual: true,
  });

  const newFileUpload = async (files: any[]) => {
    if (!files[0]?.uid.includes("rc-upload")) {
      return files[0]?.id;
    }
    const file = await uploadProfile.runAsync({
      file: files[0].originFileObj,
    });
    return file[0].id;
  };
  const intl = useIntl();
  return (
    <ModalForm
      title={intl.formatMessage({ id: "personal_info" })}
      width={650}
      open={visible}
      onFinish={async (values) => {
        console.log(values, "LLL");
        const id = await newFileUpload(values?.profile);

        await updateProfile.runAsync({
          ...values,
          profile_id: id,
        });
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
      initialValues={{
        first_name: user.user?.first_name,
        last_name: user.user?.last_name,
        role: user?.user?.role,
        profile: [
          {
            uid: `${user.user?.profile?.id}`,
            id: user.user?.profile?.id,
            name: user.user?.profile?.file_name,
            status: "done",
            url: file.fileToUrl(user.user?.profile?.physical_path || ""),
            size: user.user?.profile?.file_size,
            type: "image/jpeg",
          },
        ],
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
                name="last_name"
                placeholder={intl.formatMessage({
                  id: "placeholder_text",
                })}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: "required",
                    }),
                  },
                ]}
                fieldProps={{
                  size: "large",
                }}
                label={intl.formatMessage({ id: "last_name" })}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <ProFormText
                name="first_name"
                placeholder={intl.formatMessage({
                  id: "placeholder_text",
                })}
                fieldProps={{
                  size: "large",
                }}
                rules={[
                  {
                    required: true,
                    message: intl.formatMessage({
                      id: "required",
                    }),
                  },
                ]}
                label={intl.formatMessage({ id: "first_name" })}
              />
            </Col>
          </Row>
        </Col>
        <Col span={8} className="custom_upload">
          <ProFormUploadButton
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
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormSelect
            name="role"
            options={permissionArraySuperAdmin?.map((el) => ({
              label: <FormattedMessage id={el} />,
              value: el,
            }))}
            disabled
            label={intl.formatMessage({ id: "position" })}
            placeholder={intl.formatMessage({ id: "placeholder_select" })}
            fieldProps={{
              size: "large",
            }}
          />
        </Col>
      </Row>
    </ModalForm>
  );
};
