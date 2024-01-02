import { ProFormDateTimePicker, ProFormSelect } from "@ant-design/pro-form";
import { Button, Form, Space } from "antd";
import { SectionContainer, SectionField } from "components/index";
import { IModalForm } from "components/modal";
import { COMMISSION_ARRAY, FieldRequireMessage } from "config";
import dayjs from "dayjs";
import { FC, useEffect } from "react";
import merchantService from "service/merchantService";
import { MerchantService } from "service/merchantService/type";
import { ActionComponentProps } from "types";

const Update: FC<ActionComponentProps<MerchantService>> = ({
  open,
  onCancel,
  detail,
  onFinish,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (detail) {
      form.setFieldsValue(detail);
    }
  }, [detail]);

  return (
    <>
      <IModalForm
        open={open}
        title="Update Commission"
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: onCancel,
        }}
        submitTimeout={2000}
        onRequest={async (values) => {
          values.commission_start_date = dayjs(values.commission_start_date);
          values.commission_end_date = dayjs(values.commission_end_date);
          return merchantService.update(detail?.id || 0, {
            ...detail,
            ...values,
          });
        }}
        onSuccess={onFinish}
      >
        <SectionContainer label="Commission">
          <div className="flex flex-col custom-ant-form-item-width-full">
            <Space.Compact>
              <Button className=" w-full">Event & Ticket</Button>
              <ProFormSelect
                name={"commission_event"}
                className="w-full border-0"
                placeholder={"Please Select"}
                fieldProps={{
                  className: "border-0 w-full",
                }}
                showSearch
                rules={[
                  {
                    message: FieldRequireMessage,
                    required: true,
                  },
                ]}
                options={COMMISSION_ARRAY.map((el) => ({ ...el }))}
              />
            </Space.Compact>
            <Space.Compact>
              <Button className=" w-full">Coupon</Button>
              <ProFormSelect
                showSearch
                rules={[
                  {
                    message: FieldRequireMessage,
                    required: true,
                  },
                ]}
                name={"commission_coupon"}
                options={COMMISSION_ARRAY.map((el) => ({ ...el }))}
              />
            </Space.Compact>
            <Space.Compact>
              <Button className=" w-full">Product</Button>
              <ProFormSelect
                rules={[
                  {
                    message: FieldRequireMessage,
                    required: true,
                  },
                ]}
                showSearch
                name={"commission_product"}
                options={COMMISSION_ARRAY.map((el) => ({ ...el }))}
              />
            </Space.Compact>
          </div>
          <SectionField label="Start date">
            <ProFormDateTimePicker
              rules={[
                {
                  message: FieldRequireMessage,
                  required: true,
                },
              ]}
              fieldProps={{
                className: "w-full",
              }}
              name={"commission_start_date"}
            />
          </SectionField>
          <SectionField label="End date">
            <ProFormDateTimePicker
              rules={[
                {
                  message: FieldRequireMessage,
                  required: true,
                },
              ]}
              fieldProps={{
                className: "w-full",
              }}
              name={"commission_end_date"}
            />
          </SectionField>
        </SectionContainer>
      </IModalForm>
    </>
  );
};

export default Update;
