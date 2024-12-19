import ProForm, {
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Col, notification, Row } from "antd";
import { FORM_ITEM_RULE, permissionArray } from "config";
import { useIntl } from "react-intl";
import fieldRegistration from "service/feild_registration";
import { ActionComponentProps } from "types";

export const CreateArrivalField: React.FC<ActionComponentProps<any>> = ({
  onCancel,
  onFinish,
  open,
}) => {
  const addCargo = useRequest(fieldRegistration.create, {
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
      onFinish?.();
    },
  });
  const intl = useIntl();

  return (
    <ModalForm
      onFinish={async (values) => {
        await addCargo.runAsync({
          ...values,
        });
        onFinish?.();
      }}
      title="Талбайн бүртгэл "
      open={open}
      modalProps={{
        destroyOnClose: true,
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
            <div className="flex items-center gap-3">
              <Button onClick={onCancel} size="large" type="default">
                Болих
              </Button>
              <Button
                onClick={props.submit}
                size="large"
                type="primary"
                loading={addCargo.loading}
              >
                Хадгалах
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
                <Col span={8}>
                  <ProFormSelect
                    fieldProps={{
                      size: "large",
                    }}
                    options={[]}
                    name={"type"}
                    placeholder="Төрөл"
                    label={"Төрөл"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={8}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={"cargo_number"}
                    placeholder="Чингэлэг дугаар"
                    label={"Чингэлэг дугаар"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={8}>
                  <ProFormSelect
                    fieldProps={{
                      size: "large",
                    }}
                    options={[]}
                    name="name"
                    placeholder="Зуучийн нэр"
                    label={"Зуучийн нэр"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <ProFormSwitch
                    name={"sell"}
                    placeholder="Зарна"
                    label="Зарна"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={8}>
                  <ProFormDigit
                    fieldProps={{
                      size: "large",
                    }}
                    name={"price"}
                    placeholder="Зарах үнэ"
                    label="Зарах үнэ"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormDatePicker
                    fieldProps={{
                      size: "large",
                    }}
                    name={"date_t"}
                    placeholder="Т-д ирсэн"
                    label="Т-д ирсэн"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={12}>
                  <ProFormDatePicker
                    fieldProps={{
                      size: "large",
                    }}
                    name={"date_t"}
                    placeholder="Т-д ирсэн"
                    label="Т-д ирсэн"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormDatePicker
                    fieldProps={{
                      size: "large",
                    }}
                    name={"date_t"}
                    placeholder="Т-д ирсэн"
                    label="Т-д ирсэн"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={12}>
                  <ProFormDatePicker
                    fieldProps={{
                      size: "large",
                    }}
                    name={"date_2"}
                    placeholder="Задарсан"
                    label="Задарсан"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormDatePicker
                    fieldProps={{
                      size: "large",
                    }}
                    name={"date_3"}
                    placeholder="Суларсан"
                    label="Суларсан"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={12}>
                  <ProFormDatePicker
                    fieldProps={{
                      size: "large",
                    }}
                    name={"date_4"}
                    placeholder="Т-c явсан"
                    label="Т-c явсан"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <div className="text-xl font-medium mb-3">Ачаа</div>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={"cargo_type"}
                    placeholder="Ачааны нэр төрөл"
                    label="Ачааны нэр төрөл"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={"reciever"}
                    placeholder="Хүлээн авагч"
                    label="Хүлээн авагч"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={"phone"}
                    placeholder="Утас"
                    label="Утас"
                    rules={[
                      {
                        required: true,
                        message: "Утас оруулах шаардлагатай!",
                      },
                      {
                        pattern: /^[0-9]{8}$/,
                        message: "Утас буруу байна!",
                      },
                    ]}
                  />
                </Col>
              </Row>
              <div className="text-xl font-medium mb-3">Авах</div>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={"price"}
                    placeholder="Тээврийн хөлс"
                    label={"Тээврийн хөлс"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={8}>
                  <ProFormSelect
                    fieldProps={{
                      size: "large",
                    }}
                    options={[]}
                    name={"currency"}
                    placeholder="Вальют"
                    label={"Вальют"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={8}>
                  <ProFormSelect
                    fieldProps={{
                      size: "large",
                    }}
                    options={[]}
                    name="empty_full"
                    placeholder="Харилцагч"
                    label="Харилцагч"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormSelect
                    options={[]}
                    fieldProps={{
                      size: "large",
                    }}
                    name={"payment_method"}
                    placeholder="Төлөх арга"
                    label="Төлөх арга"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={"recomendation"}
                    placeholder="Э/Хураамж санамж"
                    label="Э/Хураамж санамж"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <div className="text-xl font-medium mb-3">Өгөх</div>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={"is_sale"}
                    placeholder="Шилжүүлэх тээврийн хөлс"
                    label="Шилжүүлэх тээврийн хөлс"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={12}>
                  <ProFormSelect
                    fieldProps={{
                      size: "large",
                    }}
                    options={permissionArray.map((item) => ({
                      label: item,
                      value: item,
                    }))}
                    name={"permission"}
                    placeholder="Гадаад тээвэр зууч"
                    label="Гадаад тээвэр зууч"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={"name_person_liable_payment"}
                    placeholder="Төлбөр хариуцагчийн нэр"
                    label="Төлбөр хариуцагчийн нэр"
                    rules={FORM_ITEM_RULE()}
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
