import { Col, Row } from "antd";
import { UploadButton, UploadDraggerButton } from "components/index";

export const uploadDocument = [
  [
    {
      name: "elderly_document_care_requet",
      label: "Асрамжийн газарт асруулахыг хүссэн өргөдөл",
    },
    {
      name: "elderly_document_insurance_notebook",
      label: "Эрүүл мэндийн даатгалын дэвтэр",
    },
  ],
  [
    {
      name: "elderly_document_is_pension_inquiry",
      label: "Тэтгэвэр авдаг эсэх лавлагаа",
    },
    {
      name: "elderly_document_pension_loan;",
      label: "Тэтгэврийн зээлтэй эсэх",
    },
  ],
  [
    {
      name: "elderly_document_is_disability_inquiry",
      label: "Хөгжлийн бэрхшээлтэй эсэх лавлагаа",
    },
    {
      name: "welderly_document_other_welfare_services_inquiry",
      label: "Халамжийн бусад үйлчилгээ авдаг эсэх лавлагаа",
    },
  ],
  [
    {
      name: "elderly_document_insurance_discounts_inquiry",
      label: "Даатгалын хөнгөлөлттэй эсэх лавлагаа",
    },
    {
      name: "elderly_document_care_center_discount_inquiry",
      label: "Амралт сувилалд хөнгөлөлттэй үнээр хамрагддаг эсэх лавлагаа",
    },
  ],
];
export const uploadFile = [
  [
    {
      name: "elderly_document_identity_card",
      label: "Иргэний үнэмлэх",
    },
    {
      name: "elderly_document_property_inquiry",
      label: "Эд хөрөнгийн лавлагаа",
    },
  ],
  [
    {
      name: "elderly_document_is_have_children_inquiry",
      label: "Үр хүүхэдтэй эсэх лавлагаа",
    },
    {
      name: "elderly_document_is_have_sibling_inquiry",
      label: "Ах дүүтэй эсэх лавлагаа",
    },
  ],
  [
    {
      name: "elderly_document_is_married_inquiry",
      label: "Гэрлэсэн эсэх",
    },
    {
      name: "elderly_document_is_divorce_inquiry",
      label: "Гэрлэлт цуцлалсан эсэх",
    },
  ],
];

export const RegistrationForm: React.FC = () => {
  return (
    <div className="px-8">
      <div className="mb-5">
        {uploadDocument?.map((val, key) => (
          <Row gutter={[16, 16]} key={key}>
            {val?.map((el, index) => (
              <Col span={12}>
                <UploadDraggerButton
                  required={false}
                  name={["documents", el?.name]}
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
                  required={false}
                  name={["documents", el?.name]}
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
