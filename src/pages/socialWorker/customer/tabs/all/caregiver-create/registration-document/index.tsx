import { Col, Row } from "antd";
import { UploadButton } from "components/index";

export const pensionDocument = [
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
];

export const uploadDocument = [
  [
    {
      name: "elderly_document_is_disability_inquiry",
      label: "Хөгжлийн бэрхшээлтэй эсэх лавлагаа",
    },
    {
      name: "elderly_document_other_welfare_services_inquiry",
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
  [
    {
      name: "elderly_document_insurance_notebook",
      label: "Эрүүл мэндийн даатгалын дэвтэр",
    },
  ],
];
export const uploadFile = [
  [
    {
      name: "elderly_document_care_requet",
      label: "Асрамжийн газарт асруулахыг хүссэн өргөдөл",
    },
  ],
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
      <div>
        <div className="text-lg font-medium mb-4">Тэтгэврийн мэдээлэл</div>
        <div>
          {pensionDocument?.map((val, key) => (
            <Row gutter={[24, 24]} key={key}>
              {val?.map((el, index) => (
                <Col sm={12} xs={21}>
                  <UploadButton
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
      <div className="mb-5 pt-5" style={{ borderTop: "1px solid #EAECF0" }}>
        <div className="text-lg font-medium mb-4">Нийгмийн хамгаалал</div>
        <div>
          {uploadDocument?.map((val, key) => (
            <Row gutter={[16, 16]} key={key}>
              {val?.map((el, index) => (
                <Col sm={12} xs={21}>
                  <UploadButton
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
      <div className="pt-5" style={{ borderTop: "1px solid #EAECF0" }}>
        <div className="text-lg font-medium mb-4">Бусад</div>
        <div>
          {uploadFile?.map((val, key) => (
            <Row gutter={[16, 16]} key={key}>
              {val?.map((el, index) => (
                <Col sm={12} xs={21}>
                  <UploadButton
                    // fileList={}
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
    </div>
  );
};
