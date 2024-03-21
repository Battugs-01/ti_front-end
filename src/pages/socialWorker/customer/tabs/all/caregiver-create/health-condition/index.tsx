import { Alert, Col, Row } from "antd";
import { UploadButton, UploadDraggerButton } from "components/index";
import ExclamaionMarkIcon from "assets/government/icons/exclamation-mark.svg";

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
