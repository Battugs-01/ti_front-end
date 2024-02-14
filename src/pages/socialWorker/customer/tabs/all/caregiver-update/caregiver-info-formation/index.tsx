import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Col, Row, Upload } from "antd";
import { FORM_ITEM_RULE } from "config";
import dayjs from "dayjs";
import { useState } from "react";
import address from "service/address";
import { ElderlyInterface } from "service/social-worker/customer/type";
// import PlusIcon from "assets/government/icons/plus-gray.svg";

type FormType = {
  data?: ElderlyInterface;
};

export const CaregiverInfoForm: React.FC<FormType> = ({ data }) => {
  const [isDisability, setDisability] = useState<boolean>(
    data?.is_disability || false
  );
  const city = useRequest(address.city, {
    manual: true,
  });
  const district = useRequest(address.district, {
    manual: true,
  });
  const khoroo = useRequest(address.khoroo, {
    manual: true,
  });

  return (
    <div className="px-8">
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
            initialValue={data?.family_name}
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
            initialValue={data?.last_name}
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
            label={"Нэр"}
            initialValue={data?.first_name}
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
            initialValue={data?.rd}
            rules={
              (FORM_ITEM_RULE(),
              [
                {
                  pattern: /^[а-яА-Я]{2}[0-9]{1}[0-9]{7}$/,
                  message: "Энэ талбар РД байх ёстой",
                },
              ])
            }
          />
        </Col>
        <Col span={8}>
          <ProFormDatePicker
            name="birth_date"
            placeholder="2023/02/01"
            label={"Төрсөн огноо"}
            initialValue={data?.birth_date}
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
                initialValue={data?.age}
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
                initialValue={data?.family_count}
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
                initialValue={data?.children_count}
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
            initialValue={data?.reason}
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
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            name="is_disability"
            label="Хөгжлийн бэрхшээлтэй эсэх"
            initialValue={data?.is_disability}
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
              initialValue={data?.disability_desc}
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
            name={["address", "city_id"]}
            placeholder="Борлууд"
            label={"Аймаг/Нийслэл"}
            // options={city.data?.map((item: any) => {
            //   return {
            //     label: item.name,
            //     value: item.id,
            //   };
            // })}
            onChange={(val) => {
              district.run(val);
            }}
            request={async () => {
              const data = await city.runAsync();
              return data?.map((item: any) => {
                return {
                  label: item.name,
                  value: item.id,
                };
              });
            }}
            rules={[
              {
                required: true,
                message: "Энэ талбарийг оруулах шаардлагатай!",
              },
            ]}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name={["address", "district_id"]}
            placeholder="Буянтогтох"
            label={"Сум/Дүүрэг"}
            onChange={(value) => {
              khoroo.run(value);
            }}
            options={district.data?.map((item: any) => {
              console.log(item, "this is item");
              return {
                label: item?.name,
                value: item?.id,
              };
            })}
            rules={[
              {
                required: true,
                message: "Энэ талбарийг оруулах шаардлагатай!",
              },
            ]}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name={["address", "street"]}
            placeholder="Даваацэрэн"
            label={"Баг/Хороо"}
            initialValue={"Street"}
            options={khoroo?.data?.map((item: any) => {
              return {
                label: item?.name,
                value: item?.id,
              };
            })}
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
        <Col span={16}>
          <ProFormSelect
            name={["address", "khoroo_id"]}
            placeholder="Эрчим хүчний гудамж, Ирээдүй хотхон"
            label={"Гудамж / Хороолол"}
            initialValue={0}
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
            name={["address", "description"]}
            placeholder="103-44 тоот"
            label={"Хашаа / Хаалгын дугаар"}
            initialValue={"Test"}
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
