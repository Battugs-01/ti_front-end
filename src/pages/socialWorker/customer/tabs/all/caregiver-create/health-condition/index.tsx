import { Alert, Col, Row } from "antd";
import { UploadButton } from "components/index";
import ExclamaionMarkIcon from "assets/government/icons/exclamation-mark.svg";
import { ProFormDigit, ProFormRadio, ProFormSelect } from "@ant-design/pro-form";
import { disabilityType, FORM_ITEM_RULE, isDisablity } from "config";

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
  return (
    <div className="px-8">
     <Row gutter={[16, 16]}>
            <Col span={6}>
              <ProFormRadio.Group
                name="is_disability"
                radioType="button"
                fieldProps={{
                  size: "large",
                }}
                label={"Хөгжлийн бэрхшээлтэй эсэх"}
                rules={FORM_ITEM_RULE()}
                options={isDisablity.map((el) => ({ ...el }))} 
              />
            </Col>
            <Col span={11}>
              <ProFormSelect
                name="disability_type_ids"
                fieldProps={{
                  mode: "multiple",
                }}
                placeholder="Төрөл"
                label={"Хөгжлийн бэрхшээлийн төрөл"}
                rules={FORM_ITEM_RULE()}
                options={disabilityType?.map((el) => ({ ...el }))}
              />
            </Col>
            <Col span={7}>
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
                name={["laboratory_tests", el?.name]}
                required={false}
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
