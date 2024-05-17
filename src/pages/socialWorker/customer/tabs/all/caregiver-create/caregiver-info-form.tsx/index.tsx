import {
  ProFormDatePicker,
  ProFormDigit,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Col, Row } from "antd";
import {
  EducationType,
  FORM_ITEM_RULE,
  MaritalStatus,
  workersGenderArray,
} from "config";
import dayjs from "dayjs";
import { useState } from "react";
import address from "service/address";
// import PlusIcon from "assets/government/icons/plus-gray.svg";

type FormType = {
  form?: ProFormInstance;
};

export const CaregiverInfoForm: React.FC<FormType> = ({ form }) => {
  const [isDisability, setDisability] = useState<boolean>(false);

  const city = useRequest(address.city, {});

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
                  if (file && file.length > 0) {
                    if (
                      file[0].type === "image/jpeg" ||
                      file[0].type === "image/png"
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "Зөвхөн JPG, PNG файлыг оруулах боломжтой"
                    );
                  } else {
                    return Promise.resolve();
                  }
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
        </Col>
      </Row>
      <Row gutter={[24, 24]} className="w-full">
        <Col sm={8} xs={21}>
          <ProFormText
            name="family_name"
            placeholder="Ургийн овгоо оруулна уу"
            label={"Ургийн овог"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col sm={8} xs={21}>
          <ProFormText
            name="last_name"
            placeholder="Овгоо оруулна уу"
            label={"Овог"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col sm={8} xs={21}>
          <ProFormText
            name="first_name"
            placeholder="Нэр оруулна уу"
            label={"Нэр"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col sm={8} xs={21}>
          <ProFormText
            name="rd"
            placeholder="Регистрийн дугаараа оруулна уу"
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
        <Col sm={8} xs={21}>
          <ProFormDatePicker
            name="birth_date"
            placeholder="Төрсөн огноо оруулна уу"
            label={"Төрсөн огноо"}
            // initialValue={dayjs().toDate()}
            rules={FORM_ITEM_RULE()}
            fieldProps={{
              disabledDate: current => current && current > dayjs().endOf('day')
            }}
          />
        </Col>
        <Col sm={8} xs={24}>
          <Row gutter={[16, 16]}>
            <Col sm={12} xs={21}>
              <ProFormDigit
                name="age"
                placeholder="Насаа оруулна уу"
                label={"Нас"}
                rules={FORM_ITEM_RULE()}
              />
            </Col>
            <Col sm={12} xs={21}>
              <ProFormSelect
                name="gender"
                placeholder="Хүйс сонгох"
                options={workersGenderArray.map((el) => ({ ...el }))}
                label={"Хүйс"}
                rules={FORM_ITEM_RULE()}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col sm={8} xs={21}>
          <ProFormSelect
            name="education"
            placeholder="Сонгох"
            label={"Боловсрол"}
            fieldProps={{
              showSearch: true,
            }}
            options={EducationType.map((el) => ({ ...el }))}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col sm={8} xs={21}>
          <ProFormSelect
            name="marriage"
            placeholder="Сонгох"
            label={"Гэрлэлтийн байдал"}
            fieldProps={{
              showSearch: true,
            }}
            options={MaritalStatus.map((el) => ({ ...el }))}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col sm={8} xs={24}>
          <Row gutter={[16, 16]}>
            <Col sm={12} xs={21}>
              <ProFormDigit
                name="family_count"
                placeholder="Ам бүлийн тоо"
                label={"Ам бүл"}
                rules={FORM_ITEM_RULE()}
              />
            </Col>
            <Col sm={12} xs={21}>
              <ProFormDigit
                name="children_count"
                placeholder="Хүүхдийн тоо"
                label={"Хүүхдийн тоо"}
                rules={FORM_ITEM_RULE()}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col sm={24} xs={21}>
          <ProFormTextArea
            name="reason"
            placeholder={"Асруулах болсон шалтгааныг дэлгэрэнгүй бичнэ үү."}
            label="Асрамжийн газарт асруулах шалтгаан"
            rules={FORM_ITEM_RULE()}
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
        <Col sm={8} xs={21}>
          <ProFormSelect
            name={["address", "city_id"]}
            placeholder="Сонгох"
            label={"Аймаг/Нийслэл"}
            onChange={(val) => {
              form?.setFieldValue(["address", "district_id"], undefined);
              form?.setFieldValue(["address", "khoroo_id"], undefined);
              district.run(val);
            }}
            fieldProps={{
              showSearch: true,
              loading: city?.loading,
            }}
            options={city.data?.map((el) => ({ value: el.id, label: el.name }))}
            // request={async () => {
            //   const data = await city.runAsync();
            //   return data?.map((item: any) => {
            //     return {
            //       label: item.name,
            //       value: item.id,
            //     };
            //   });
            // }}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col sm={8} xs={21}>
          <ProFormSelect
            name={["address", "district_id"]}
            placeholder="Сонгох"
            label={"Сум/Дүүрэг"}
            onChange={(value) => {
              form?.setFieldValue(["address", "khoroo_id"], undefined);
              khoroo.run(value);
            }}
            fieldProps={{
              showSearch: true,
              loading: district?.loading,
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
        <Col sm={8} xs={21}>
          <ProFormSelect
            name={["address", "khoroo_id"]}
            placeholder="Сонгох"
            label={"Баг/Хороо"}
            fieldProps={{
              showSearch: true,
              loading: khoroo?.loading,
            }}
            options={khoroo?.data?.map((item: any) => {
              return {
                label: item?.name,
                value: item?.id,
              };
            })}
          // rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col sm={16} xs={21}>
          <ProFormText
            name={["address", "street"]}
            placeholder="Гудамж / Хороолол оруулна уу"
            label={"Гудамж / Хороолол"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col sm={8} xs={21}>
          <ProFormText
            name={["address", "description"]}
            placeholder="Хашаа / Хаалгын дугаар оруулна уу"
            label={"Хашаа / Хаалгын дугаар"}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
    </div>
  );
};
