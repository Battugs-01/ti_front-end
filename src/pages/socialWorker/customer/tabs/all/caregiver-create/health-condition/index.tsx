import { Col, Row } from "antd";
import { UploadButton, UploadDraggerButton } from "components/index";

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
      {uploadDocument?.map((val, key) => (
        <Row gutter={[16, 16]} key={key}>
          {val?.map((el, index) => (
            <Col span={12}>
              <UploadButton
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
