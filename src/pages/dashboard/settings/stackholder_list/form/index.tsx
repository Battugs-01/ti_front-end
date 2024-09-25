import ProForm, { ProFormSelect, ProFormText } from "@ant-design/pro-form";
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
              <Col span={24}>
                <ProFormText
                  name="name"
                  fieldProps={{
                    size: "large",
                  }}
                  placeholder={intl.formatMessage({ id: "placeholder_text" })}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: "required" }),
                    },
                  ]}
                  label={intl.formatMessage({ id: "participant_name" })}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col sm={12} xs={21}>
                <ProFormSelect
                  name={["address", "city_id"]}
                  placeholder={intl.formatMessage({ id: "placeholder_select" })}
                  label={"Аймаг/Нийслэл"}
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
                  label={"Сум/Дүүрэг"}
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
                  placeholder={intl.formatMessage({ id: "placeholder_text" })}
                  name="email"
                  fieldProps={{
                    size: "large",
                  }}
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
                  name="fax"
                  placeholder={intl.formatMessage({ id: "placeholder_text" })}
                  fieldProps={{
                    size: "large",
                  }}
                  label={intl.formatMessage({ id: "fax" })}
                  rules={FORM_ITEM_RULE()}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <ProFormText
                  name="phone_no"
                  placeholder={intl.formatMessage({ id: "placeholder_text" })}
                  fieldProps={{
                    size: "large",
                  }}
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
              <Col span={24}>
                <ProFormText
                  name="link"
                  placeholder={intl.formatMessage({ id: "placeholder_text" })}
                  rules={[
                    {
                      required: true,
                      message: intl.formatMessage({ id: "required" }),
                    },
                  ]}
                  extra={intl.formatMessage({ id: "link_extra" })}
                  fieldProps={{
                    addonBefore: "https://",
                    size: "large",
                  }}
                  label={intl.formatMessage({ id: "link" })}
                />
              </Col>
            </Row>
            <div className="text-base font-semibold mb-4">
              <FormattedMessage id="permission_control" />
            </div>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <ProFormText
                  placeholder={intl.formatMessage({ id: "placeholder_text" })}
                  name={["user", "email"]}
                  fieldProps={{
                    size: "large",
                  }}
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
