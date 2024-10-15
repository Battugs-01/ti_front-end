import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import ProFormDatePickerYear from "@ant-design/pro-form/es/components/DatePicker/YearPicker";
import { Col, Row } from "antd";
import { FORM_ITEM_RULE } from "config";
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
                  <Col span={24} className="flex gap-2">
                    <ProFormText
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: intl.formatMessage({ id: "required" }),
                        },
                      ]}
                      placeholder={intl.formatMessage({
                        id: "placeholder_text",
                      })}
                      fieldProps={{
                        size: "large",
                      }}
                      label={intl.formatMessage({ id: "agency_name" })}
                    />
                    <ProFormText
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: intl.formatMessage({ id: "required" }),
                        },
                      ]}
                      placeholder={intl.formatMessage({
                        id: "placeholder_text",
                      })}
                      fieldProps={{
                        size: "large",
                      }}
                      label={intl.formatMessage({ id: "name_en" })}
                    />
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <ProFormText
                      name="director_name"
                      placeholder={intl.formatMessage({
                        id: "placeholder_text",
                      })}
                      fieldProps={{
                        size: "large",
                      }}
                      rules={[
                        {
                          required: true,
                          message: intl.formatMessage({ id: "required" }),
                        },
                      ]}
                      label={intl.formatMessage({ id: "director_name" })}
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={8} className="custom_upload">
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

            <Row gutter={[16, 16]}>
              <Col sm={12} xs={21}>
                <ProFormSelect
                  name={["address", "city_id"]}
                  placeholder={intl.formatMessage({ id: "placeholder_select" })}
                  label={intl.formatMessage({ id: "city" })}
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
                  placeholder={intl.formatMessage({ id: "placeholder_select" })}
                  label={intl.formatMessage({ id: "district" })}
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
                  rules={FORM_ITEM_RULE()}
                  placeholder={intl.formatMessage({ id: "placeholder_select" })}
                  label={intl.formatMessage({ id: "khoroo" })}
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
                  fieldProps={{
                    size: "large",
                  }}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: "required" }),
                    },
                  ]}
                  placeholder={intl.formatMessage({ id: "placeholder_text" })}
                  label={intl.formatMessage({ id: "address" })}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <ProFormText
                  name="email"
                  fieldProps={{
                    size: "large",
                  }}
                  placeholder={intl.formatMessage({ id: "placeholder_text" })}
                  label={intl.formatMessage({ id: "company_email" })}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: "required" }),
                    },
                    {
                      type: "email",
                      message: intl.formatMessage({ id: "email_error" }),
                    },
                  ]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  name="phone_no"
                  fieldProps={{
                    size: "large",
                  }}
                  placeholder={intl.formatMessage({ id: "placeholder_text" })}
                  label={intl.formatMessage({ id: "company_phone" })}
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
                />
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={24}>
                <ProFormText
                  name="link"
                  extra={intl.formatMessage({ id: "link_extra" })}
                  placeholder={intl.formatMessage({ id: "placeholder_text" })}
                  fieldProps={{
                    size: "large",
                    addonBefore: "http://",
                  }}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: "required" }),
                    },
                  ]}
                  label={intl.formatMessage({ id: "link" })}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <ProFormDatePickerYear
                  name="establishment_year"
                  placeholder={intl.formatMessage({ id: "placeholder_text" })}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: "required" }),
                    },
                  ]}
                  fieldProps={{
                    picker: "year",
                    size: "large",
                  }}
                  label={intl.formatMessage({ id: "date_establishment" })}
                />
              </Col>
            </Row>
            <div className="text-base font-semibold mb-4">
              <FormattedMessage id="permission_control" />
            </div>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <ProFormText
                  name={["user", "email"]}
                  placeholder={intl.formatMessage({ id: "placeholder_text" })}
                  fieldProps={{
                    size: "large",
                  }}
                  label={intl.formatMessage({ id: "login_name" })}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: "required" }),
                    },
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
