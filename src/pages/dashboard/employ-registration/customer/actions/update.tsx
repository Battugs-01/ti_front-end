import { ProFormInstance, ProFormRadio, ProFormText } from "@ant-design/pro-form";
import { IModalForm } from "components/modal";
import { useEffect, useRef } from "react";
import customerCompany from "service/fininaciar/customerCompany";
import { ActionComponentProps } from "types";
import { Info } from "./parts/info";
import { SectionContainer } from "components/modal/section";
import { FORM_ITEM_RULE } from "config";
import { Col, Row } from "antd";

export const UpdateService = ({
  onCancel,
  onFinish,
  open,
  detail,
}: ActionComponentProps<any>) => {
  const formRef = useRef<ProFormInstance>();

  useEffect(() => {
    if (open) {
      formRef.current?.setFieldsValue({
        ...detail,
        ledger_name: detail?.ledger?.name,
      });
    }
  }, [open]);

  return (
    <IModalForm
      open={open}
      title="Засах"
      formRef={formRef}
      cancelText={"Буцах"}
      width={1000}
      okText={"Хадгалах"}
      modalProps={{ maskClosable: false, onCancel }}
      onRequest={async (values) => {
        if (
          await customerCompany.update(
            {
              ...values,
            },
            detail?.id || 0
          )
        ) {
          return true;
        }
      }}
      onSuccess={onFinish}
    >
    <SectionContainer>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormText
            name={"shortcut_name"}
            placeholder={"Товчлол"}
            label={"Товчлол"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name={"name"}
            placeholder={"Компаний нэр"}
            label="Компаний нэр"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormRadio.Group
            name="is_broker"
            radioType="radio"
            label="Зууч эсэх"
            fieldProps={{
              size: "middle",
            }}
            options={[
              {
                label: "Тийм",
                value: true,
              },
              {
                label: "Үгүй",
                value: false,
              },
            ]}
            initialValue={true}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormText
            name={"ledger_name"}
            placeholder={"Харилцагчийн код"}
            label="Харилцагчийн код"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name={"contact_number"}
            placeholder={"Харилцах дугаар"}
            fieldProps={{
              addonBefore: "+976",
            }}
            rules={[
              {
                pattern: /^[1-9]{1}[0-9]{7}$/g,
                message: "Энэ талбар утасны дугаар байх ёстой",
              },
              ...FORM_ITEM_RULE(),
            ]}
            label="Харилцах дугаар"
          />
        </Col>
      </Row>

    </SectionContainer>
    </IModalForm>
  );
};
