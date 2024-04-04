import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormInstance,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Col, Row, Upload, notification } from "antd";
import {
  EducationType,
  FORM_ITEM_RULE,
  MaritalStatus,
  workersGenderArray,
} from "config";
import { useState } from "react";
import address from "service/address";
// import PlusIcon from "assets/government/icons/plus-gray.svg";

type FormType = {
  form?: ProFormInstance;
};

export const CaregiverInfoForm: React.FC<FormType> = ({ form }) => {
  const [isDisability, setDisability] = useState<boolean>(false);
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
            max={1}
            rules={[
              {
                validator: (_, file) => {
                  if (file.length === 0) return Promise.resolve();
                  if (
                    file[0].type === "image/jpeg" ||
                    file[0].type === "image/png"
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "Зөвхөн JPG, PNG файлыг оруулах боломжтой"
                  );
                },
              },
              ...FORM_ITEM_RULE(),
            ]}
            name="profile"
            fieldProps={{
              name: "file",
              listType: "picture-card",
              beforeUpload: () => {
                return false;
              },
            }}
          />
          {/* <UploadDraggerButton
            name="profile_id"
            label={"Цээж зураг (3x4 хэмжээтэй)"}
          /> */}
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <ProFormText
            name="family_name"
            placeholder="Борлууд"
            label={"Ургийн овог"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name="last_name"
            placeholder="Буянтогтох"
            label={"Овог"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name="first_name"
            placeholder="Даваацэрэн"
            label={"Нэр"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <ProFormText
            name="rd"
            placeholder="ЖУ234234324"
            label={"Регистрийн дугаар"}
            rules={
              (FORM_ITEM_RULE(),
              [
                {
                  required: true,
                  message: "Энэ талбарыг оруулах шаардлагатай!",
                },
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
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={8}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <ProFormDigit
                name="age"
                placeholder="55"
                label={"Нас"}
                rules={FORM_ITEM_RULE()}
              />
            </Col>
            <Col span={12}>
              <ProFormSelect
                name="gender"
                placeholder="Эрэгтэй"
                options={workersGenderArray.map((el) => ({ ...el }))}
                label={"Хүйс"}
                rules={FORM_ITEM_RULE()}
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
            options={EducationType.map((el) => ({ ...el }))}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name="marriage"
            placeholder="Гэрлэсэн"
            label={"Гэрлэлтийн байдал"}
            options={MaritalStatus.map((el) => ({ ...el }))}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={8}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <ProFormDigit
                name="family_count"
                placeholder="3"
                label={"Ам бүл"}
                rules={FORM_ITEM_RULE()}
              />
            </Col>
            <Col span={12}>
              <ProFormDigit
                name="children_count"
                placeholder="4"
                label={"Хүүхдийн тоо"}
                rules={FORM_ITEM_RULE()}
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
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      {/* <Row gutter={[16, 16]}>
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
              rules={FORM_ITEM_RULE()}
            />
          </Col>
        </Row>
      )} */}
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
            placeholder="Аймаг/Нийслэл"
            label={"Аймаг/Нийслэл"}
            // options={city.data?.map((item: any) => {
            //   return {
            //     label: item.name,
            //     value: item.id,
            //   };
            // })}
            onChange={(val) => {
              form?.setFieldValue(["address", "district_id"], undefined);
              form?.setFieldValue(["address", "khoroo_id"], undefined);
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
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name={["address", "district_id"]}
            placeholder="Сум/Дүүрэг"
            label={"Сум/Дүүрэг"}
            onChange={(value) => {
              form?.setFieldValue(["address", "khoroo_id"], undefined);
              khoroo.run(value);
            }}
            options={district.data?.map((item: any) => {
              return {
                label: item?.name,
                value: item?.id,
              };
            })}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name={["address", "khoroo_id"]}
            placeholder="Баг/Хороо"
            label={"Баг/Хороо"}
            options={khoroo?.data?.map((item: any) => {
              return {
                label: item?.name,
                value: item?.id,
              };
            })}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <ProFormText
            name={["address", "street"]}
            placeholder="Эрчим хүчний гудамж, Ирээдүй хотхон"
            label={"Гудамж / Хороолол"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name={["address", "description"]}
            placeholder="103-44 тоот"
            label={"Хашаа / Хаалгын дугаар"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
    </div>
  );
};
