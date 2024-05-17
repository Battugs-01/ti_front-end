import { Alert, Col, Row } from "antd";
import { UploadButton } from "components/index";
import ExclamaionMarkIcon from "assets/government/icons/exclamation-mark.svg";
import {
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
} from "@ant-design/pro-form";
import { disabilityType, FORM_ITEM_RULE, isDisablity } from "config";
import { useRequest } from "ahooks";
import orphanElderly from "service/social-worker/customer";
import { useEffect, useState } from "react";
import laboratory from "service/laboratory_tests";

const uploadDocument = [
  [
    {
      name: "health_check_sheet",
      label: "Эрүүл мэндийн үзлэгийн хуудас",
    },
    {
      name: "blood_test",
      label: "Цусны ерөнхий шинжилгээ",
    },
  ],
  [
    {
      name: "analysis_urine",
      label: "Шээсний ерөнхий шинжилгээ",
    },
    {
      name: "biochemical",
      label: "Биохимийн шинжилгээ",
    },
  ],
  [
    {
      name: "sputum",
      label: "Цэрний шинжилгээ. /Сүрьеэ үзэх/",
    },
    {
      name: "syphilis",
      label: "ДOX, тэмбүүгийн илрүүлэг",
    },
  ],
  [
    {
      name: "abdominal",
      label: "Хэвлийн ЭХО",
    },
    {
      name: "heart_recording",
      label: "Зүрхний бичлэг",
    },
  ],
  [
    {
      name: "lungs",
      label: "Уушигны рентген зураг",
    },
    {
      name: "mental_health",
      label:
        "Сэтгэцийн эрүүл мэндийн үндэсний төвийн тодорхойлолт./Сэтгэцийн өөрчлөлтгүй тухай/",
    },
  ],
];

export const HealthForm: React.FC = () => {
  const [isDisability, setDisability] = useState<boolean>(false);
  const disabilityList = useRequest(orphanElderly.disability_type, {
    manual: true,
  });

  const labTests = useRequest(laboratory.get, {
    manual: true,
  });

  useEffect(() => {
    labTests?.run();
  }, []);
  const sortedLabTests = labTests?.data?.sort((a: any, b: any) => a.id - b.id);
  return (
    <div className="px-8 custom-multi-selector">
      <Row gutter={[16, 16]}>
        <Col sm={6} xs={21}>
          <ProFormRadio.Group
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
            <Col sm={11} xs={21}>
              <ProFormSelect
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
            <Col sm={7} xs={21}>
              <ProFormDigit
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
      {/* {uploadDocument?.map((val, key) => (
        <Row gutter={[16, 16]} key={key}>
          {val?.map((el, index) => (
            <Col sm={12} key={index} xs={21}>
              <UploadButton
                name={["laboratory_tests", el?.name]}
                required={false}
                label={el?.label}
                key={index}
              />
            </Col>
          ))}
        </Row>
      ))} */}
      <Row gutter={[16, 16]}>
        {sortedLabTests?.map((val, key) => (
          <Col sm={12} xs={21} key={key}>
            <UploadButton
              name={["laboratory_tests", val?.id]}
              required={false}
              label={val?.name}
              key={key}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};
