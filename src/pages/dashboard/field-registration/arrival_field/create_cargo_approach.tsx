import ProForm, {
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Col, notification, Row } from "antd";
import IBadge from "components/badge";
import { FORM_ITEM_RULE } from "config";
import dayjs, { Dayjs } from "dayjs";
import fieldRegistration from "service/feild_registration";
import assignation from "service/feild_registration/assignation";
import customerCompany from "service/fininaciar/customerCompany";
import { ActionComponentProps } from "types";
import { DirectionOptions } from "utils/options";
import moment from "moment";

export const CreateCargoApproach: React.FC<ActionComponentProps<any>> = ({
  onCancel,
  onFinish,
  open,
}) => {
  const createCargo = useRequest(fieldRegistration.create, {
    manual: true,
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

  const customerCompanyList = useRequest(customerCompany.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  return (
    <ModalForm
      onFinish={async (values) => {
        const data = await createCargo.runAsync({
          ...values,
          approach_report_date: moment(values.approach_report_date).toDate(),
          arrived_at_site: moment(values.arrived_at_site).toDate(),
        });
        if (values.assignation) {
          await createAssign.runAsync({
            waggon_number: values.assignation.waggon_number,
            shipping_number: values.assignation.shipping_number,
            sent_from: values.assignation.sent_from,
            direction: values.assignation.direction,
            cargo_name: values.assignation.cargo_name,
            reciever_email: values.assignation.reciever_email,
            reciever_phone: values.assignation.reciever_phone,
            net_weight: values.assignation.net_weight,
            gross_weight: values.assignation.gross_weight,
            container_transport_id: data?.id,
          });
        }
      }}
      title="Талбайн бүртгэл"
      initialValues={{
        category: "3",
      }}
      open={open}
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
                loading={createCargo.loading}
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
                    disabled
                    placeholder="Төрөл"
                    label={"Төрөл"}
                  />
                </Col>
                <Col span={10}>
                  <ProFormText
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
                    request={async () => {
                      const data = await customerCompanyList.runAsync({
                        is_all: true,
                        is_broker: true,
                      });
                      return data?.items.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }));
                    }}
                    name="broker_id"
                    placeholder="Зуучийн нэр"
                    label={"Зуучийн нэр"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormDigit
                    fieldProps={{
                      size: "large",
                    }}
                    name={"capacity"}
                    placeholder="Даац"
                    label={"Даац"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormRadio.Group
                    fieldProps={{
                      size: "large",
                    }}
                    name={"direction"}
                    label="Чиглэл"
                    options={DirectionOptions?.map((item) => ({
                      label: item.label,
                      value: item.value,
                    }))}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col sm={12} xs={21}>
                  <ProFormDatePicker
                    name="approach_report_date"
                    fieldProps={{
                      size: "large",
                      onChange: (e) => {
                        console.log(e, "lll");
                      },
                    }}
                    placeholder="Дөхөлтийн мэдээний огноо"
                    rules={FORM_ITEM_RULE()}
                    label="Дөхөлтийн мэдээний огноо"
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormDatePicker
                    fieldProps={{
                      size: "large",
                    }}
                    name="arrived_at_site"
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
                      name={"opened_at"}
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
                      name={"freed_at"}
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
                      name={"left_site_at"}
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
                      name={"returned_at"}
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
                      name={"shipped_at"}
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
