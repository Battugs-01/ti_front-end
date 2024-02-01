import { Col, Row } from "antd";
import { UploadButton, UploadDraggerButton } from "components/index";

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
const uploadFile = [
  [
    {
      name: "identity_card",
      label: "Иргэний үнэмлэх",
    },
    {
      name: "property_inquiry",
      label: "Эд хөрөнгийн лавлагаа",
    },
  ],
  [
    {
      name: "inquiry_have_children",
      label: "Үр хүүхэдтэй эсэх лавлагаа",
    },
    {
      name: "sibling_inquiry",
      label: "Ах дүүтэй эсэх лавлагаа",
    },
  ],
  [
    {
      name: "is_married",
      label: "Гэрлэсэн эсэх",
    },
    {
      name: "is_divorce",
      label: "Гэрлэлт цуцлалсан эсэх",
    },
  ],
];

export const RegistrationForm: React.FC = () => {
  return (
    <div className=" px-4">
      <div className="mb-5">
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
      <div className="pt-5" style={{ borderTop: "1px solid #EAECF0" }}>
        {uploadFile?.map((val, key) => (
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
    </div>
  );
};
