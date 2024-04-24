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
import { Col, Row, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import {
  EducationType,
  FORM_ITEM_RULE,
  MaritalStatus,
  workersGenderArray,
} from "config";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import address from "service/address";
import file from "service/file";
import { ElderlyInterface } from "service/social-worker/customer/type";

type FormType = {
  data?: ElderlyInterface;
  form?: ProFormInstance;
};

export const CaregiverInfoForm: React.FC<FormType> = ({ data, form }) => {
  const city = useRequest(address.city, {
    manual: true,
  });
  const district = useRequest(address.district, {
    manual: true,
  });
  const khoroo = useRequest(address.khoroo, {
    manual: true,
  });
  const cityId = form?.getFieldValue(["address", "city_id"]);
  useEffect(() => {
    if (cityId) {
      district.run(cityId);
      khoroo.run(form?.getFieldValue(["address", "district_id"]));
    }
  }, [cityId]);
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
            name={"profile"}
            max={1}
            rules={FORM_ITEM_RULE()}
            initialValue={[
              {
                uid: `${data?.profile_id}`,
                id: `${data?.profile_id}`,
                name: data?.profile?.original_name || "",
                status: "done",
                url: file.fileToUrl(data?.profile?.physical_path || ""),
                size: data?.profile?.file_size || 0,
              },
            ]}
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
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <ProFormText
            name="family_name"
            placeholder="Ургийн овгоо оруулна уу"
            label={"Ургийн овог"}
            initialValue={data?.family_name}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name="last_name"
            placeholder="Овгоо оруулна уу"
            label={"Овог"}
            initialValue={data?.last_name}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name="first_name"
            placeholder="Нэр оруулна уу"
            label={"Нэр"}
            initialValue={data?.first_name}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <ProFormText
            name="rd"
            placeholder="Регистрийн дугаараа оруулна уу"
            label={"Регистрийн дугаар"}
            initialValue={data?.rd}
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
            placeholder="Төрсөн огноо оруулна уу"
            label={"Төрсөн огноо"}
            initialValue={data?.birth_date}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={8}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <ProFormDigit
                name="age"
                placeholder="Насаа оруулна уу"
                initialValue={data?.age}
                label={"Нас"}
                rules={FORM_ITEM_RULE()}
              />
            </Col>
            <Col span={12}>
              <ProFormSelect
                name="gender"
                placeholder="Хүйс сонгоно уу"
                options={workersGenderArray.map((el) => ({ ...el }))}
                label={"Хүйс"}
                rules={FORM_ITEM_RULE()}
                initialValue={data?.gender}
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
            initialValue={data?.education}
            options={EducationType.map((el) => ({ ...el }))}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name="marriage"
            placeholder="Сонгох"
            label={"Гэрлэлтийн байдал"}
            initialValue={data?.marriage}
            options={MaritalStatus.map((el) => ({ ...el }))}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={8}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <ProFormDigit
                name="family_count"
                placeholder="Ам бүлийн тоо"
                label={"Ам бүл"}
                initialValue={data?.family_count}
                rules={FORM_ITEM_RULE()}
              />
            </Col>
            <Col span={12}>
              <ProFormDigit
                name="children_count"
                placeholder="Хүүхдийн тоо"
                initialValue={data?.children_count}
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
            initialValue={data?.reason}
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
        <Col span={8}>
          <ProFormSelect
            name={["address", "city_id"]}
            placeholder="Аймаг/Нийслэл сонгоно уу"
            label={"Аймаг/Нийслэл"}
            initialValue={data?.address?.city_id}
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
            placeholder="Cум / Дүүрэг сонгоно уу"
            label={"Сум/Дүүрэг"}
            onChange={(value) => {
              khoroo.run(value);
              form?.setFieldValue(["address", "khoroo_id"], undefined);
            }}
            options={district.data?.map((item: any) => {
              return {
                label: item?.name,
                value: item?.id,
              };
            })}
            initialValue={data?.address?.district_id}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name={["address", "khoroo_id"]}
            placeholder="Баг / Хороо сонгоно уу"
            label={"Баг/Хороо"}
            initialValue={data?.address?.khoroo_id}
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
        <Col span={16}>
          <ProFormText
            name={["address", "street"]}
            placeholder="Гудамж / Хороолол оруулна уу"
            label={"Гудамж / Хороолол"}
            initialValue={data?.address?.street}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name={["address", "description"]}
            placeholder="Хашаа / Хаалгын дугаар оруулна уу"
            label={"Хашаа / Хаалгын дугаар"}
            initialValue={data?.address?.description}
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
    </div>
  );
};
