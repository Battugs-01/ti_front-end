import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import { Col, Row } from "antd";
import { FORM_ITEM_RULE, permissionArray } from "config";
import { FormattedMessage, useIntl } from "react-intl";

interface FormProps {
  city: any;
  district: any;
  khoroo: any;
}

export const Form: React.FC<FormProps> = ({ city, district, khoroo }) => {
  const intl = useIntl();
  return (
    <ProForm.Item noStyle shouldUpdate>
      {(form) => {
        return (
          <>
            <Row gutter={[16, 16]}>
              <Col span={16}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <ProFormText
                      fieldProps={{
                        size: "large",
                      }}
                      placeholder={intl.formatMessage({
                        id: "placeholder_text",
                      })}
                      name="last_name"
                      rules={[
                        {
                          required: true,
                          message: intl.formatMessage({ id: "required" }),
                        },
                      ]}
                      label={intl.formatMessage({ id: "last_name" })}
                    />
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <ProFormText
                      fieldProps={{
                        size: "large",
                      }}
                      name="first_name"
                      placeholder={intl.formatMessage({
                        id: "placeholder_text",
                      })}
                      rules={[
                        {
                          required: true,
                          message: intl.formatMessage({ id: "required" }),
                        },
                      ]}
                      label={intl.formatMessage({ id: "name" })}
                    />
                  </Col>
                </Row>
              </Col>
              {/* <Col span={8} className="custom_upload">
                <ProFormUploadButton
                  className="w-max h-max"
                  title={
                    <div className="flex items-center flex-col justify-center gap-2 text-[#00000073] p-2">
                      <div className="text-sm">
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
                        if (file && file?.length > 0) {
                          if (
                            file[0]?.type === "image/jpeg" ||
                            file[0]?.type === "image/png"
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
              </Col> */}
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={24}>
                <ProFormSelect
                  name="role"
                  options={permissionArray?.map((el) => ({
                    label: <FormattedMessage id={el} />,
                    value: el,
                  }))}
                  label={intl.formatMessage({ id: "position" })}
                  placeholder={intl.formatMessage({ id: "placeholder_select" })}
                  fieldProps={{
                    size: "large",
                  }}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col sm={12} xs={21}>
                <ProFormSelect
                  name={["address", "city_id"]}
                  label={"Аймаг/Нийслэл"}
                  placeholder={intl.formatMessage({ id: "placeholder_select" })}
                  onChange={(val) => {
                    form?.setFieldValue(["address", "district_id"], undefined);
                    form?.setFieldValue(["address", "khoroo_id"], undefined);
                    district.run(val);
                  }}
                  fieldProps={{
                    showSearch: true,
                    loading: city?.loading,
                    size: "large",
                  }}
                  options={city.data?.map((el: any) => ({
                    value: el.id,
                    label: el.name,
                  }))}
                  rules={FORM_ITEM_RULE()}
                />
              </Col>
              <Col sm={12} xs={21}>
                <ProFormSelect
                  name={["address", "district_id"]}
                  label={"Сум/Дүүрэг"}
                  placeholder={intl.formatMessage({ id: "placeholder_select" })}
                  onChange={(value) => {
                    form?.setFieldValue(["address", "khoroo_id"], undefined);
                    khoroo.run(value);
                  }}
                  fieldProps={{
                    showSearch: true,
                    loading: district?.loading,
                    size: "large",
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
                  placeholder={intl.formatMessage({ id: "placeholder_select" })}
                  label={"Баг/Хороо"}
                  fieldProps={{
                    showSearch: true,
                    loading: khoroo?.loading,
                    size: "large",
                  }}
                  options={khoroo?.data?.map((item: any) => {
                    return {
                      label: item?.name,
                      value: item?.id,
                    };
                  })}
                />
              </Col>
              <Col sm={12} xs={21}>
                <ProFormText
                  name={["address", "desc"]}
                  placeholder={intl.formatMessage({ id: "placeholder_text" })}
                  fieldProps={{
                    size: "large",
                  }}
                  label={intl.formatMessage({ id: "address" })}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <ProFormText
                  fieldProps={{
                    size: "large",
                  }}
                  name={"email"}
                  placeholder={intl.formatMessage({ id: "placeholder_text" })}
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
                <ProFormText
                  name={"phone"}
                  fieldProps={{
                    size: "large",
                  }}
                  placeholder={intl.formatMessage({ id: "placeholder_text" })}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: "required" }),
                    },
                    {
                      pattern: /^[\d]{8}$/,
                      message: intl.formatMessage({
                        id: "phone_number_error",
                      }),
                    },
                  ]}
                  label={intl.formatMessage({ id: "phone" })}
                />
              </Col>
            </Row>
            <div className="text-base font-semibold mb-4">
              <FormattedMessage id="permission_control" />
            </div>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <ProFormText
                  fieldProps={{
                    size: "large",
                  }}
                  name={["user", "email"]}
                  placeholder={intl.formatMessage({ id: "placeholder_text" })}
                  label={intl.formatMessage({ id: "login_name" })}
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
                  name={["user", "password"]}
                  placeholder={intl.formatMessage({ id: "placeholder_text" })}
                  fieldProps={{
                    size: "large",
                  }}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: "required" }),
                    },
                  ]}
                  label={intl.formatMessage({ id: "password" })}
                />
              </Col>
            </Row>
          </>
        );
      }}
    </ProForm.Item>
  );
};
