import { ModalForm, ProFormText } from "@ant-design/pro-form";
import { Button, Col, Form, Row } from "antd";
import { FORM_ITEM_RULE } from "config";
import React from "react";
import { ActionComponentProps } from "types";

export const UpdatePass: React.FC<ActionComponentProps<any>> = ({
  onCancel,
  onFinish,
  open,
  detail,
}) => {
  const [form] = Form.useForm();

  return (
    <ModalForm
      form={form}
      title="Нууц үг солих"
      open={open}
      modalProps={{
        destroyOnClose: true,
        width: "1200px",
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
            <div className="flex items-center gap-3">
              <Button onClick={onCancel} size="large" type="default">
                Болих
              </Button>
              <Button
                onClick={props.submit}
                size="large"
                type="primary"
                // loading={updateArrivalField.loading}
              >
                Хадгалах
              </Button>
            </div>
          );
        },
      }}
    >
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormText
            fieldProps={{
              size: "large",
            }}
            name="password"
            placeholder="Нууц үг"
            label={"Нууц үг"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        {/* <Col span={12}>
          <ProFormText
            disabled
            fieldProps={{
              size: "large",
            }}
            name="broker_name"
            placeholder="Зуучийн нэр"
            label={"Зуучийн нэр"}
            rules={FORM_ITEM_RULE()}
          />
        </Col> */}
      </Row>
    </ModalForm>
  );
};
