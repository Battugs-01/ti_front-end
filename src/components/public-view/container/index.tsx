import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { Card, Col, Row } from "antd";
import React, { useRef } from "react";
import { CargoApproachList } from "service/feild_registration/type";
import { CapacityOptions, DirectionOptions } from "utils/options";

interface ContainerProps {
  data: CargoApproachList;
}
const Container: React.FC<ContainerProps> = ({ data }) => {
  const form = useRef<ProFormInstance>();
  return (
    <ProForm initialValues={data} formRef={form} submitter={false}>
      <>
      <Card className="mb-3 h-full  bg-gray-50" title="Чингэлэг мэдээлэл">
          <Row gutter={[16, 16]}>
            <Col span={4}>
              <ProFormText
                fieldProps={{
                  size: "large",
                }}
                name={"category"}
                readonly
                label={"Төрөл"}
                />
            </Col>
            <Col span={10}>
              <ProFormText
                fieldProps={{
                  size: "large",
                }}
                readonly
                name={"container_code"}
                label={"Чингэлэг дугаар"}
                />
            </Col>
            <Col span={10}>
                <ProFormSelect
                  fieldProps={{
                    size: "large",
                  }}
                  readonly
                  name={["broker", "name"]}
                  label={"Зуучийн нэр"}
                />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
                <ProFormSelect
                  fieldProps={{
                    size: "large",
                  }}
                readonly
                options={CapacityOptions?.map((item) => ({
                  label: item.label,
                  value: item.value,
                }))}
                name={"capacity"}
                label={"Даац"}
                />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
                <ProFormRadio.Group
                  fieldProps={{
                    size: "large",
                  }}
                readonly
                name={"direction"}
                label="Чиглэл"
                options={DirectionOptions?.map((item) => ({
                  label: item.label,
                  value: item.value,
                }))}
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
                readonly
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
                  readonly
                  name="arrived_at_site"
                  label="Т-д ирсэн"
              />
            </Col>
            <Col span={12}>
                <ProFormDatePicker
                  fieldProps={{
                    size: "large",
                  }}
                  readonly
                  name={"opened_at"}
                  label="Задарсан"
                />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
                <ProFormDatePicker
                  fieldProps={{
                    size: "large",
                  }}
                  readonly
                  name={"freed_at"}
                  label="Суларсан"
                />
            </Col>
            <Col span={12}>
                <ProFormDatePicker
                  fieldProps={{
                    size: "large",
                  }}
                  readonly
                  name={"left_site_at"}
                  label="Т-c явсан"
                />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
                <ProFormDatePicker
                  fieldProps={{
                    size: "large",
                  }}
                  name={"returned_at"}
                  readonly
                  label="Буцаж ирсэн"
                />
            </Col>
            <Col span={12}>
                <ProFormDatePicker
                  fieldProps={{
                    size: "large",
                  }}
                  name={"shipped_at"}
                  readonly
                  label="Ачилт хийсэн"
                />
            </Col>
          </Row>
        </Card>
        <Card title="Олголт" className="h-full bg-gray-50">
          <Row gutter={[16, 16]}>
            <Col span={12}>
                <ProFormText
                  fieldProps={{
                    size: "large",
                  }}
                  readonly
                  name={["assignation", "waggon_number"]}
                  label="Вагоны дугаар"
              />
            </Col>
            <Col span={12}>
              <ProFormText
                fieldProps={{
                  size: "large",
                }}
                readonly
                name={["assignation", "shipping_number"]}
                  label="Илгээлтийн дугаар"
                />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
                <ProFormText
                  fieldProps={{
                    size: "large",
                  }}
                  readonly
                  name={["assignation", "direction"]}
                  label="Тээврийн чиглэл"
              />
            </Col>
            <Col span={12}>
                <ProFormText
                fieldProps={{
                  size: "large",
                }}
                readonly
                name={["assignation", "cargo_name"]}
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
                  readonly
                  name={["assignation", "net_weight"]}
                  label="Цэвэр жин"
                />
            </Col>
            <Col span={12}>
                <ProFormDigit
                fieldProps={{
                  size: "large",
                }}
                readonly
                name={["assignation", "gross_weight"]}
                  label="Бохир жин"
                />
            </Col>
          </Row>
        </Card>
      </>
    </ProForm>
  );
};

export default Container;
