import {
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Alert, Col, Row } from "antd";
import ExclamaionMarkIcon from "assets/government/icons/exclamation-mark.svg";
import { UploadButton } from "components/index";
import { disabilityType, FORM_ITEM_RULE, isDisablity } from "config";
import { filterLabTest } from "pages/socialWorker/customer/util/arrToObj";
import { useState } from "react";
import orphanElderly from "service/social-worker/customer";
import {
  ElderlyInterface,
  LaboratoryTests,
} from "service/social-worker/customer/type";

type HealthType = {
  data: ElderlyInterface;
};

export const HealthForm: React.FC<HealthType> = ({ data }) => {
  const [isDisability, setDisability] = useState<boolean>(
    data?.is_disability || false
  );
  const disabilityList = useRequest(orphanElderly.disability_type, {
    manual: true,
  });
  const uploadDocument = [
    [
      {
        name: "health_check_sheet",
        label: "Эрүүл мэндийн үзлэгийн хуудас",
        initialValue: filterLabTest(1, data?.laboratory_tests),
      },
      {
        name: "blood_test",
        label: "Цусны ерөнхий шинжилгээ",
        initialValue: filterLabTest(2, data?.laboratory_tests),
      },
    ],
    [
      {
        name: "analysis_urine",
        label: "Шээсний ерөнхий шинжилгээ",
        initialValue: filterLabTest(3, data?.laboratory_tests),
      },
      {
        name: "biochemical",
        label: "Биохимийн шинжилгээ",
        initialValue: filterLabTest(4, data?.laboratory_tests),
      },
    ],
    [
      {
        name: "sputum",
        label: "Цэрний шинжилгээ. /Сүрьеэ үзэх/",
        initialValue: filterLabTest(5, data?.laboratory_tests),
      },
      {
        name: "syphilis",
        label: "ДOX, тэмбүүгийн илрүүлэг",
        initialValue: filterLabTest(6, data?.laboratory_tests),
      },
    ],
    [
      {
        name: "abdominal",
        label: "Хэвлийн ЭХО",
        initialValue: filterLabTest(7, data?.laboratory_tests),
      },
      {
        name: "heart_recording",
        label: "Зүрхний бичлэг",
        initialValue: filterLabTest(8, data?.laboratory_tests),
      },
    ],
    [
      {
        name: "lungs",
        label: "Уушигны рентген зураг",
        initialValue: filterLabTest(9, data?.laboratory_tests),
      },
      {
        name: "mental_health",
        label:
          "Сэтгэцийн эрүүл мэндийн үндэсний төвийн тодорхойлолт./Сэтгэцийн өөрчлөлтгүй тухай/",
        initialValue: filterLabTest(10, data?.laboratory_tests),
      },
    ],
  ];
  return (
    <div className="px-8 custom-multi-selector">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <ProFormRadio.Group
            initialValue={data?.is_disability}
            name="is_disability"
            radioType="button"
            fieldProps={{
              onChange: (e) => {
                setDisability(e.target.value);
              },
              size: "large",
            }}
            label={"Хөгжлийн бэрхшээлтэй эсэх"}
            rules={FORM_ITEM_RULE()}
            options={isDisablity.map((el) => ({ ...el }))}
          />
        </Col>
        {isDisability && (
          <>
            <Col span={11}>
              <ProFormSelect
                // initialValue=
                initialValue={data?.disability_types?.map((el) => {
                  return el.id;
                })}
                // initialValue={}
                // initialValue={data?.disability_type_ids}
                name="disability_type_ids"
                fieldProps={{
                  mode: "multiple",
                }}
                request={async () => {
                  const data = await disabilityList.runAsync();
                  return data?.map((item: any) => {
                    return {
                      label: item.name,
                      value: item.id,
                    };
                  });
                }}
                placeholder="Төрөл"
                label={"Хөгжлийн бэрхшээлийн төрөл"}
                rules={FORM_ITEM_RULE()}
                options={disabilityType?.map((el) => ({ ...el }))}
              />
            </Col>
            <Col span={7}>
              <ProFormDigit
                initialValue={data?.disability_percent}
                name="disability_percent"
                placeholder="Жишээ нь: 10%"
                fieldProps={{
                  addonAfter: "%",
                }}
                label={"Хөдөлмөрийн чадвар алдалтын хувь"}
                rules={FORM_ITEM_RULE()}
              />
            </Col>
          </>
        )}
      </Row>
      <Alert
        className="bg-[#E7EDEE] text-slate-700 mb-4"
        style={{ border: "1px solid #D0D5DD" }}
        type="info"
        message={
          <div className="text-slate-700 font-semibold flex items-center gap-3">
            <img src={ExclamaionMarkIcon} alt="image" />
            <div>Сүүлийн 3 сарын шинжилгээний мэдээллийг хавсаргана уу.</div>
          </div>
        }
      />
      {uploadDocument?.map((val, key) => (
        <Row gutter={[16, 16]} key={key}>
          {val?.map((el, index) => (
            <Col span={12} key={index}>
              <UploadButton
                // fileList={el?.initialValue}
                required={false}
                initialValue={el?.initialValue}
                name={["laboratory_tests", el?.name]}
                label={el?.label}
                key={index}
              />
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
};
