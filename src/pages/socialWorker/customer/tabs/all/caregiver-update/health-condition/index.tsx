import { Col, Row } from "antd";
import { UploadFile } from "antd/lib";
import { UploadButton, UploadDraggerButton } from "components/index";
import { filterLabTest } from "pages/socialWorker/customer/util/arrToObj";
import {
  LaboratoryTest,
  LaboratoryTests,
} from "service/social-worker/customer/type";

type HealthType = {
  data: LaboratoryTests[];
};

export const HealthForm: React.FC<HealthType> = ({ data }) => {
  const uploadDocument = [
    [
      {
        name: "health_check_sheet",
        label: "Эрүүл мэндийн үзлэгийн хуудас",
        initialValue: filterLabTest(1, data),
      },
      {
        name: "blood_test",
        label: "Цусны ерөнхий шинжилгээ",
        initialValue: filterLabTest(2, data),
      },
    ],
    [
      {
        name: "analysis_urine",
        label: "Шээсний ерөнхий шинжилгээ",
        initialValue: filterLabTest(3, data),
      },
      {
        name: "biochemical",
        label: "Биохимийн шинжилгээ",
        initialValue: filterLabTest(4, data),
      },
    ],
    [
      {
        name: "sputum",
        label: "Цэрний шинжилгээ. /Сүрьеэ үзэх/",
        initialValue: filterLabTest(5, data),
      },
      {
        name: "syphilis",
        label: "ДOX, тэмбүүгийн илрүүлэг",
        initialValue: filterLabTest(6, data),
      },
    ],
    [
      {
        name: "abdominal",
        label: "Хэвлийн ЭХО",
        initialValue: filterLabTest(7, data),
      },
      {
        name: "heart_recording",
        label: "Зүрхний бичлэг",
        initialValue: filterLabTest(8, data),
      },
    ],
    [
      {
        name: "lungs",
        label: "Уушигны рентген зураг",
        initialValue: filterLabTest(9, data),
      },
      {
        name: "mental_health",
        label:
          "Сэтгэцийн эрүүл мэндийн үндэсний төвийн тодорхойлолт./Сэтгэцийн өөрчлөлтгүй тухай/",
        initialValue: filterLabTest(10, data),
      },
    ],
  ];
  return (
    <div className="px-8">
      {uploadDocument?.map((val, key) => (
        <Row gutter={[16, 16]} key={key}>
          {val?.map((el, index) => (
            <Col span={12}>
              {console.log(el?.initialValue, "initialValuejsaklfdj")}
              <UploadButton
                // fileList={el?.initialValue}
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
