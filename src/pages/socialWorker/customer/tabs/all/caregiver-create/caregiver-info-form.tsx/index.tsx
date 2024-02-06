import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import { Col, Row, Upload } from "antd";
import { useState } from "react";
// import PlusIcon from "assets/government/icons/plus-gray.svg";

export const CaregiverInfoForm: React.FC = () => {
  const [isDisability, setDisability] = useState<boolean>(false);
  return (
    <div className="px-4">
      <Row gutter={[16, 16]}>
        <Col>
          <ProFormUploadButton
            title={
              <div className="flex items-center flex-col justify-center gap-2 text-[#00000073]">
                <div className="text-xs ">Зураг оруулах</div>
              </div>
            }
            label={"Цээж зураг (3x4 хэмжээтэй)"}
            max={2}
            fieldProps={{
              name: "file",
              listType: "picture-card",
            }}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <ProFormText
            name="family_name"
            placeholder="Борлууд"
            label={"Ургийн овог"}
            rules={[
              {
                required: true,
                message: "Энэ талбарийг оруулах шаардлагатай!",
              },
            ]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name="last_name"
            placeholder="Буянтогтох"
            label={"Овог"}
            rules={[
              {
                required: true,
                message: "Энэ талбарийг оруулах шаардлагатай!",
              },
            ]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name="first_name"
            placeholder="Даваацэрэн"
            label={"Ургийн овог"}
            rules={[
              {
                required: true,
                message: "Энэ талбарийг оруулах шаардлагатай!",
              },
            ]}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <ProFormText
            name="rd"
            placeholder="ЖУ234234324"
            label={"Регистрийн дугаар"}
            rules={[
              {
                required: true,
                message: "Энэ талбарийг оруулах шаардлагатай!",
              },
            ]}
          />
        </Col>
        <Col span={8}>
          <ProFormDatePicker
            name="birth_date"
            placeholder="2023/02/01"
            label={"Төрсөн огноо"}
            rules={[
              {
                required: true,
                message: "Энэ талбарийг оруулах шаардлагатай!",
              },
            ]}
          />
        </Col>
        <Col span={8}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <ProFormDigit
                name="age"
                placeholder="55"
                label={"Нас"}
                rules={[
                  {
                    required: true,
                    message: "Энэ талбарийг оруулах шаардлагатай!",
                  },
                ]}
              />
            </Col>
            <Col span={12}>
              <ProFormSelect
                name="gender"
                placeholder="Эрэгтэй"
                label={"Хүйс"}
                initialValue={0}
                // rules={[
                //   {
                //     required: true,
                //     message: "Энэ талбарийг оруулах шаардлагатай!",
                //   },
                // ]}
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
            initialValue={"Бүрэн дунд"}

            // rules={[
            //   {
            //     required: true,
            //     message: "Энэ талбарийг оруулах шаардлагатай!",
            //   },
            // ]}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name="marriage"
            placeholder="Гэрлэсэн"
            label={"Гэрлэлтийн байдал"}
            initialValue={"Гэрлэсэн"}

            // rules={[
            //   {
            //     required: true,
            //     message: "Энэ талбарийг оруулах шаардлагатай!",
            //   },
            // ]}
          />
        </Col>
        <Col span={8}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <ProFormDigit 
                name="family_count"
                placeholder="3"
                label={"Ам бүл"}
                rules={[
                  {
                    required: true,
                    message: "Энэ талбарийг оруулах шаардлагатай!",
                  },
                ]}
              />
            </Col>
            <Col span={12}>
              <ProFormDigit
                name="children_count"
                placeholder="4"
                label={"Хүүхдийн тоо"}
                rules={[
                  {
                    required: true,
                    message: "Энэ талбарийг оруулах шаардлагатай!",
                  },
                ]}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormTextArea
            name="reason"
            placeholder={"Асруулах болсон шалтгааныг дэлгэрэнгүй бичнэ үү."}
            label="Асрамжийн газарт асруулах шалтгаан"
            rules={[
              {
                required: true,
                message: "Энэ талбарийг оруулах шаардлагатай!",
              },
            ]}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormSwitch
            name="is_disability"
            label="Хөгжлийн бэрхшээлтэй эсэх"
            fieldProps={{
              onChange: (checked) => {
                setDisability(checked);
              },
            }}
          />
        </Col>
      </Row>
      {isDisability && (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <ProFormTextArea
              name="disability_desc"
              placeholder={"Тийм бол онош, ХЧА-ын хувь"}
              rules={[
                {
                  required: true,
                  message: "Энэ талбарийг оруулах шаардлагатай!",
                },
              ]}
            />
          </Col>
        </Row>
      )}
      <div
        className="pt-5 text-lg font-medium"
        style={{ borderTop: "1px solid #EAECF0" }}
      >
        Үндсэн захиргаа хаяг
      </div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <ProFormSelect
            name="city_id"
            placeholder="Борлууд"
            label={"Аймаг/Нийслэл"}
            // rules={[
            //   {
            //     required: true,
            //     message: "Энэ талбарийг оруулах шаардлагатай!",
            //   },
            // ]}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name="district_id"
            placeholder="Буянтогтох"
            label={"Сум/Дүүрэг"}
            // rules={[
            //   {
            //     required: true,
            //     message: "Энэ талбарийг оруулах шаардлагатай!",
            //   },
            // ]}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name="street"
            placeholder="Даваацэрэн"
            label={"Баг/Хороо"}
            // rules={[
            //   {
            //     required: true,
            //     message: "Энэ талбарийг оруулах шаардлагатай!",
            //   },
            // ]}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <ProFormSelect
            name="khoroo_id"
            placeholder="Эрчим хүчний гудамж, Ирээдүй хотхон"
            label={"Гудамж / Хороолол"}
            // rules={[
            //   {
            //     required: true,
            //     message: "Энэ талбарийг оруулах шаардлагатай!",
            //   },
            // ]}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name="door_number"
            placeholder="103-44 тоот"
            label={"Хашаа / Хаалгын дугаар"}
            // rules={[
            //   {
            //     required: true,
            //     message: "Энэ талбарийг оруулах шаардлагатай!",
            //   },
            // ]}
          />
        </Col>
      </Row>
    </div>
  );
};
