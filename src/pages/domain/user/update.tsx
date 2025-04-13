import { ProFormDateTimePicker, ProFormInstance, ProFormRadio, ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Col, Row } from "antd";
import { SectionContainer } from "components/index";
import { IModalForm } from "components/modal";
import { FORM_ITEM_RULE } from "config";
import { PaymentType } from "config";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import customerCompany from "service/fininaciar/customerCompany";
import user from "service/user/user";
import { ActionComponentProps } from "types";
import { PaymentMethod } from "utils/options";

export const UpdateUser = ({
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

    const updateUser = useRequest(user.update, {
    manual: true,
    onSuccess: () => {
      onFinish?.();
    },
  });

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
          await updateUser.runAsync(
            detail?.id || 0,
            {
              ...values,
            },
          )
        ) {
          return true;
        }
        return false;
      }}
      onSuccess={onFinish}
    >

    <SectionContainer>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormText
            name={"email"}
            placeholder={"sample@example.cг"}
            label="Цахим шуудан"
            rules={[
              {
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Энэ талбар и-мэйл хаяг байх ёстой",
              },
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name={"phone"}
            placeholder={"099999999"}
            label="Утас"
          />
        </Col>
      </Row>
    </SectionContainer>
    </IModalForm>
  );
};
