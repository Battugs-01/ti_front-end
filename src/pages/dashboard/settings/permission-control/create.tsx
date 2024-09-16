import ProForm, {
  DrawerForm,
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Col, notification, Row } from "antd";
import {
  agencyArray,
  FORM_ITEM_RULE,
  permissionArray,
  workersGenderArray,
} from "config";
import dayjs from "dayjs";
import { FormattedMessage, useIntl } from "react-intl";
import address from "service/address";
import file from "service/file";
import permission from "service/settings/permission";
import { CreatePermissionType } from "service/type";
import { ActionComponentProps } from "types";
import { Save02 } from "untitledui-js-base";

export const CreatePermission: React.FC<ActionComponentProps<any>> = ({
  onCancel,
  onFinish,
  open,
  detail,
}) => {
  const createPermission = useRequest(permission.create, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: intl.formatMessage({ id: "success" }),
      });
      onCancel();
    },
    onError: (error: any) => {
      notification.error({
        message: error.message,
      });
    },
  });
  const city = useRequest(address.city);

  const district = useRequest(address.district, {
    manual: true,
  });

  const khoroo = useRequest(address.khoroo, {
    manual: true,
  });
  const uploadProfile = useRequest(file.upload, {
    manual: true,
  });
  const intl = useIntl();
  return (
    <ModalForm<CreatePermissionType>
      onFinish={async (values) => {
        const file = await uploadProfile.runAsync({
          file: values?.profile[0]?.originFileObj,
        });
        await createPermission.runAsync({
          ...values,
          address: {
            ...values.address,
          },
          profile_id: file[0]?.id,
          birth_date: dayjs(values?.birth_date).toDate(),
        });
        onFinish?.();
      }}
      title={intl.formatMessage({ id: "member_drawer_title" })}
      open={open}
      modalProps={{
        width: "650px",
        onCancel,
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
              <Button onClick={onCancel} size="large" type="default">
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
      <ProForm.Item noStyle shouldUpdate>
        {(form) => {
          return (
            <>
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
                    className="w-max h-max"
                    title={
                      <div className="flex items-center flex-col justify-center gap-2 text-[#00000073]">
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
                    extra={
                      <div className="text-[#475467]">
                        <FormattedMessage id="agency_extra" />
                      </div>
                    }
                    name="agency_id"
                    options={agencyArray.map((el) => ({ ...el }))}
                    label={intl.formatMessage({ id: "agency" })}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormDatePicker
                    name="birth_date"
                    label={intl.formatMessage({ id: "date_of_birth" })}
                  />
                </Col>
                <Col span={12}>
                  <ProFormSelect
                    name="gender"
                    options={workersGenderArray.map((el) => ({ ...el }))}
                    label={intl.formatMessage({ id: "gender" })}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormText
                    name="phone"
                    label={intl.formatMessage({ id: "phone" })}
                    rules={[
                      {
                        pattern: /^[\d]{8}$/,
                        message: intl.formatMessage({
                          id: "phone_number_error",
                        }),
                      },
                    ]}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col sm={12} xs={21}>
                  <ProFormSelect
                    name={["address", "city_id"]}
                    placeholder="Сонгох"
                    label={"Аймаг/Нийслэл"}
                    onChange={(val) => {
                      form?.setFieldValue(
                        ["address", "district_id"],
                        undefined
                      );
                      form?.setFieldValue(["address", "khoroo_id"], undefined);
                      district.run(val);
                    }}
                    fieldProps={{
                      showSearch: true,
                      loading: city?.loading,
                    }}
                    options={city.data?.map((el) => ({
                      value: el.id,
                      label: el.name,
                    }))}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col sm={12} xs={21}>
                  <ProFormSelect
                    name={["address", "district_id"]}
                    placeholder="Сонгох"
                    label={"Сум/Дүүрэг"}
                    onChange={(value) => {
                      form?.setFieldValue(["address", "khoroo_id"], undefined);
                      khoroo.run(value);
                    }}
                    fieldProps={{
                      showSearch: true,
                      loading: district?.loading,
                    }}
                    options={district.data?.map((item: any) => {
                      return {
                        label: item?.name,
                        value: item?.id,
                      };
                    })}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col sm={12} xs={21}>
                  <ProFormSelect
                    name={["address", "khoroo_id"]}
                    placeholder="Сонгох"
                    label={"Баг/Хороо"}
                    fieldProps={{
                      showSearch: true,
                      loading: khoroo?.loading,
                    }}
                    options={khoroo?.data?.map((item: any) => {
                      return {
                        label: item?.name,
                        value: item?.id,
                      };
                    })}
                    // rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col sm={12} xs={21}>
                  <ProFormText
                    name={["address", "desc"]}
                    label={intl.formatMessage({ id: "address" })}
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
                    label={intl.formatMessage({ id: "permission" })}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormText
                    name="email"
                    label={intl.formatMessage({ id: "email" })}
                    rules={[
                      {
                        type: "email",
                        message: intl.formatMessage({ id: "email_error" }),
                      },
                    ]}
                  />
                </Col>
                <Col span={12}>
                  <ProFormText.Password
                    name="password"
                    label={intl.formatMessage({ id: "password" })}
                  />
                </Col>
              </Row>
            </>
          );
        }}
      </ProForm.Item>
    </ModalForm>
  );
};
