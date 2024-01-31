import { Col, Row } from "antd";
import { UploadDraggerButton } from "components/index";

const uploadDocument = [
  [
    {
      name: "care_nursing_home",
      label: "Асрамжийн газарт асруулахыг хүссэн өргөдөл",
    },
    {
      name: "insurance_book",
      label: "Эрүүл мэндийн даатгалын дэвтэр",
    },
  ],
  [
    {
      name: "inquiry_pension",
      label: "Тэтгэвэр авдаг эсэх лавлагаа",
    },
    {
      name: "pension_loan",
      label: "Тэтгэврийн зээлтэй эсэх",
    },
  ],
  [
    {
      name: "disability",
      label: "Хөгжлийн бэрхшээлтэй эсэх лавлагаа",
    },
    {
      name: "welfare_services",
      label: "Халамжийн бусад үйлчилгээ авдаг эсэх лавлагаа",
    },
  ],
  [
    {
      name: "insurance_discounts",
      label: "Даатгалын хөнгөлөлттэй эсэх лавлагаа",
    },
    {
      name: "discounted_rated_resort",
      label: "Амралт сувилалд хөнгөлөлттэй үнээр хамрагддаг эсэх лавлагаа",
    },
  ],
];

export const RegistrationForm: React.FC = () => {
  return (
    <div className="py-8 px-12">
      {uploadDocument?.map((val, key) => (
        <Row gutter={[16, 16]} key={key}>
          {val?.map((el, index) => (
            <Col span={12}>
              <UploadDraggerButton
                name={el?.name}
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
