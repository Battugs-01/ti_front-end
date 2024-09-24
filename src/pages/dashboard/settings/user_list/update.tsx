import ProForm, {
  ModalForm,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Col, notification, Row } from "antd";
import { FORM_ITEM_RULE, permissionArray } from "config";
import { useEffect, useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import address from "service/address";
import userList from "service/settings/user_list";
import { UserType } from "service/settings/user_list/type";
import { ActionComponentProps } from "types";

export const UpdateUser: React.FC<ActionComponentProps<UserType>> = ({
  onCancel,
  onFinish,
  open,
  detail,
}) => {
  const formRef = useRef<ProFormInstance>();
  const userUpdate = useRequest(userList.edit, {
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

  const city = useRequest(address.city, {});

  const district = useRequest(address.district, {
    manual: true,
  });

  const khoroo = useRequest(address.khoroo, {
    manual: true,
  });

  useEffect(() => {
    if (detail) {
      district.run(detail?.address?.city_id);
      khoroo.run(detail?.address?.district_id);
    }
  }, [detail]);
  const intl = useIntl();
  return (
    <ModalForm
      formRef={formRef}
      onFinish={async (values) => {
        await userUpdate.runAsync(
          {
            ...values,
          },
          detail?.id
        );
        onFinish?.();
      }}
      title={intl.formatMessage({ id: "update_stakeholder" })}
      open={open}
      initialValues={{
        ...detail,
      }}
      modalProps={{
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
      onOpenChange={() => {
        formRef?.current?.resetFields();
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
                <Col span={24}>
                  <ProFormText
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
                    name="name"
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
                      size: "large",
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
                    placeholder="Сонгох"
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
                    label={intl.formatMessage({ id: "address" })}
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
    </ModalForm>
  );
};
