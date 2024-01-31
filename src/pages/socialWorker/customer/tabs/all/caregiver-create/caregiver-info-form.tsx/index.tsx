import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { Col, Row } from "antd";
import { useState } from "react";

export const CaregiverInfoForm: React.FC = () => {
  const [isDisability, setDisability] = useState<boolean>(false);
  return (
    <div className="py-8 px-12">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <ProFormText
            name="family_name"
            placeholder="Борлууд"
            label={"Ургийн овог"}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name="last_name"
            placeholder="Буянтогтох"
            label={"Овог"}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name="first_name"
            placeholder="Даваацэрэн"
            label={"Ургийн овог"}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <ProFormText
            name="rd"
            placeholder="ЖУ234234324"
            label={"Регистрийн дугаар"}
          />
        </Col>
        <Col span={8}>
          <ProFormDatePicker
            name="birth_date"
            placeholder="2023/02/01"
            label={"Төрсөн огноо"}
          />
        </Col>
        <Col span={8}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <ProFormDigit name="age" placeholder="55" label={"Нас"} />
            </Col>
            <Col span={12}>
              <ProFormSelect
                name="gender"
                placeholder="Эрэгтэй"
                label={"Хүйс"}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <ProFormSelect
            name="education"
            placeholder="Сонгох"
            label={"Боловсрол"}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name="is_wedding"
            placeholder="Гэрлэсэн"
            label={"Гэрлэлтийн байдал"}
          />
        </Col>
        <Col span={8}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <ProFormDigit
                name="family_number"
                placeholder="3"
                label={"Ам бүл"}
              />
            </Col>
            <Col span={12}>
              <ProFormDigit
                name="child_number"
                placeholder="4"
                label={"Хүүхдийн тоо"}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormTextArea
            name="reasons"
            placeholder={"Асруулах болсон шалтгааныг дэлгэрэнгүй бичнэ үү."}
            label="Асрамжийн газарт асруулах шалтгаан"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormSwitch
            name="disability"
            label="Хөгжлийн бэрхшээлтэй эсэх"
            fieldProps={{
              onChange: (checked) => {
                setDisability(checked);
              },
            }}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormTextArea
            name="disability_text"
            placeholder={"Тийм бол онош, ХЧА-ын хувь"}
          />
        </Col>
      </Row>
      <div
        className="pt-5 text-lg font-medium"
        style={{ borderTop: "1px solid #EAECF0" }}
      >
        Үндсэн захиргаа хаяг
      </div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <ProFormSelect
            name="capital"
            placeholder="Борлууд"
            label={"Аймаг/Нийслэл"}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name="district"
            placeholder="Буянтогтох"
            label={"Сум/Дүүрэг"}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name="street"
            placeholder="Даваацэрэн"
            label={"Баг/Хороо"}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <ProFormSelect
            name="horoolol"
            placeholder="Эрчим хүчний гудамж, Ирээдүй хотхон"
            label={"Гудамж / Хороолол"}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name="door_number"
            placeholder="103-44 тоот"
            label={"Хашаа / Хаалгын дугаар"}
          />
        </Col>
      </Row>
    </div>
  );
};
