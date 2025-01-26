import ProForm, {
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Col, notification, Row } from "antd";
import IBadge from "components/badge";
import { FORM_ITEM_RULE } from "config";
import dayjs from "dayjs";
import fieldRegistration from "service/feild_registration";
import assignation from "service/feild_registration/assignation";
import { ActionComponentProps } from "types";

export const AssignationCargoApproach: React.FC<ActionComponentProps<any>> = ({
  onCancel,
  onFinish,
  detail,
}) => {
  const updateCargo = useRequest(fieldRegistration.updateRegistration, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай засагдлаа",
      });
    },
    onError: (error: any) => {
      notification.error({
        message: error.message,
      });
      onCancel?.();
    },
  });

  const createAssign = useRequest(assignation.create, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай бүртгэгдлээ",
      });
      onFinish?.();
    },
    onError: (error: any) => {
      notification.error({
        message: error.message,
      });
      onCancel?.();
    },
  });

  return (
    <ModalForm
      onFinish={async (values) => {
        await updateCargo.runAsync(
          {
            arrived_at_site: dayjs(values.arrived_at_site).toDate(),
          },
          detail?.id
        );
        if (values.assignation) {
          await createAssign.runAsync({
            ...values,
            container_transport_id: detail?.id,
          });
        }
        onFinish?.();
      }}
      title="Талбайн бүртгэл"
      open={!!detail}
      initialValues={{
        date: detail?.date ? dayjs(detail.date) : undefined,
        broker_id: detail?.broker_id,
        container_code: detail?.container_code,
      }}
      modalProps={{
        destroyOnClose: true,
        width: "700px",
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
                loading={updateCargo.loading}
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
                <Col span={4}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={"category"}
                    placeholder="Төрөл"
                    label={"Төрөл"}
                  />
                </Col>
                <Col span={10}>
                  <ProFormText
                    disabled
                    fieldProps={{
                      size: "large",
                    }}
                    name={"container_code"}
                    placeholder="Чингэлэг дугаар"
                    label={"Чингэлэг дугаар"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={10}>
                  <ProFormSelect
                    fieldProps={{
                      size: "large",
                    }}
                    options={[{ label: "TI Logistic", value: 1 }].map(
                      (item) => ({
                        label: item.label,
                        value: item.value,
                      })
                    )}
                    name="broker_id"
                    placeholder="Зуучийн нэр"
                    label={"Зуучийн нэр"}
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
                    name={"arrived_at_site"}
                    placeholder="Т-д ирсэн"
                    label="Т-д ирсэн"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={12}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      fieldProps={{
                        size: "large",
                      }}
                      disabled
                      name={"date_2"}
                      placeholder="Задарсан"
                      label="Задарсан"
                    />
                    <IBadge title="2" color="blue" />
                  </div>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      fieldProps={{
                        size: "large",
                      }}
                      disabled
                      name={"date_3"}
                      placeholder="Суларсан"
                      label="Суларсан"
                    />
                    <IBadge title="2" color="blue" />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      fieldProps={{
                        size: "large",
                      }}
                      disabled
                      name={"date_4"}
                      placeholder="Т-c явсан"
                      label="Т-c явсан"
                    />
                    <IBadge title="2" color="blue" />
                  </div>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      fieldProps={{
                        size: "large",
                      }}
                      name={"comeback_date"}
                      disabled
                      placeholder="Буцаж ирсэн"
                      label="Буцаж ирсэн"
                    />
                    <IBadge title="2" color="blue" />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      fieldProps={{
                        size: "large",
                      }}
                      name={"date_6"}
                      placeholder="Ачилт хийсэн"
                      disabled
                      label="Ачилт хийсэн"
                    />
                    <IBadge title="2" color="blue" />
                  </div>
                </Col>
              </Row>
              <div className="text-xl font-medium mb-3">Олголт</div>

              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={["assignation", "waggon_number"]}
                    placeholder="Вагоны дугаар"
                    label="Вагоны дугаар"
                  />
                </Col>
                <Col span={8}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={["assignation", "shipping_number"]}
                    placeholder="Илгээлтийн дугаар"
                    label="Илгээлтийн дугаар"
                  />
                </Col>
                <Col span={8}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={["assignation", "sent_from"]}
                    placeholder="Хаанаас илгээсэн /Өртөө/"
                    label="Хаанаас илгээсэн /Өртөө/"
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={["assignation", "direction"]}
                    placeholder="Тээврийн чиглэл"
                    label="Тээврийн чиглэл"
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={["assignation", "cargo_name"]}
                    placeholder="Ачааны нэр төрөл"
                    label="Ачааны нэр төрөл"
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormDigit
                    fieldProps={{
                      size: "large",
                    }}
                    name={["assignation", "net_weight"]}
                    placeholder="Цэвэр жин"
                    label="Цэвэр жин"
                  />
                </Col>
                <Col span={12}>
                  <ProFormDigit
                    fieldProps={{
                      size: "large",
                    }}
                    name={["assignation", "gross_weight"]}
                    placeholder="Бохир жин"
                    label="Бохир жин"
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={["assignation", "reciever_name"]}
                    placeholder="Хүлээн авагч"
                    label="Хүлээн авагч"
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={["assignation", "reciever_phone"]}
                    placeholder="Утас"
                    label="Утас"
                    rules={[
                      // {
                      //   required: true,
                      //   message: "Утас оруулах шаардлагатай!",
                      // },
                      {
                        pattern: /^[0-9]{8}$/,
                        message: "Утас буруу байна!",
                      },
                    ]}
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
