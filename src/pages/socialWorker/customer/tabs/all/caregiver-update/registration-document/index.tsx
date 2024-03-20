import { Col, Row } from "antd";
import { UploadButton, UploadDraggerButton } from "components/index";
import { size } from "lodash";
import { Documents } from "service/social-worker/customer/type";
import { convertFileToUploadFile } from "utils/index";

type RegistrationType = {
  data?: Documents;
};

export const RegistrationForm: React.FC<RegistrationType> = ({ data }) => {
  const pensionDocument = [
    [
      {
        name: "elderly_document_is_pension_inquiry",
        label: "Тэтгэвэр авдаг эсэх лавлагаа",
        initialValue: data?.is_pension_inquiry?.map((val, index) => ({
          uid: `${val?.id}`,
          id: `${val?.id}`,
          name: val?.original_name || "",
          status: "done",
          url: `http://103.41.112.73:9000/${val?.physical_path}`,
          size: val?.file_size || 0,
        })),
      },
      {
        name: "elderly_document_pension_loan;",
        label: "Тэтгэврийн зээлтэй эсэх",
        initialValue: data?.pension_loan?.map((val, index) => ({
          uid: `${val?.id}`,
          id: `${val?.id}`,
          name: val?.original_name || "",
          status: "done",
          url: `http://103.41.112.73:9000/${val?.physical_path}`,
          size: val?.file_size || 0,
        })),
      },
    ],
  ];
  const uploadDocument = [
    [
      {
        name: "elderly_document_is_disability_inquiry",
        label: "Хөгжлийн бэрхшээлтэй эсэх лавлагаа",
        initialValue: data?.is_disability_inquiry?.map((val, index) => ({
          uid: `${val?.id}`,
          id: `${val?.id}`,
          name: val?.original_name || "",
          status: "done",
          url: `http://103.41.112.73:9000/${val?.physical_path}`,
          size: val?.file_size || 0,
        })),
      },
      {
        name: "elderly_document_other_welfare_services_inquiry",
        label: "Халамжийн бусад үйлчилгээ авдаг эсэх лавлагаа",
        initialValue: data?.other_welfare_services_inquiry?.map(
          (val, index) => ({
            uid: `${val?.id}`,
            id: `${val?.id}`,
            name: val?.original_name || "",
            status: "done",
            url: `http://103.41.112.73:9000/${val?.physical_path}`,
            size: val?.file_size || 0,
          })
        ),
      },
    ],

    [
      {
        name: "elderly_document_insurance_discounts_inquiry",
        label: "Даатгалын хөнгөлөлттэй эсэх лавлагаа",
        initialValue: data?.insurance_discounts_inquiry?.map((val, index) => ({
          uid: `${val?.id}`,
          id: `${val?.id}`,
          name: val?.original_name || "",
          status: "done",
          url: `http://103.41.112.73:9000/${val?.physical_path}`,
          size: val?.file_size || 0,
        })),
      },
      {
        name: "elderly_document_care_center_discount_inquiry",
        label: "Амралт сувилалд хөнгөлөлттэй үнээр хамрагддаг эсэх лавлагаа",
        initialValue: data?.care_center_discount_inquiry?.map((val, index) => ({
          uid: `${val?.id}`,
          id: `${val?.id}`,
          name: val?.original_name || "",
          status: "done",
          url: `http://103.41.112.73:9000/${val?.physical_path}`,
          size: val?.file_size || 0,
        })),
      },
    ],
    [
      {
        name: "elderly_document_insurance_notebook",
        label: "Эрүүл мэндийн даатгалын дэвтэр",
        initialValue: data?.insurance_notebook?.map((val, index) => ({
          uid: `${val?.id}`,
          id: `${val?.id}`,
          name: val?.original_name || "",
          status: "done",
          url: `http://103.41.112.73:9000/${val?.physical_path}`,
          size: val?.file_size || 0,
        })),
      },
    ],
  ];
  const uploadFile = [
    [
      {
        name: "elderly_document_care_requet",
        label: "Асрамжийн газарт асруулахыг хүссэн өргөдөл",
        initialValue: data?.care_request?.map((val, index) => ({
          uid: `${val?.id}`,
          id: `${val?.id}`,
          name: val?.original_name || "",
          status: "done",
          url: `http://103.41.112.73:9000/${val?.physical_path}`,
          size: val?.file_size || 0,
        })),
      },
    ],
    [
      {
        name: "elderly_document_identity_card",
        label: "Иргэний үнэмлэх",
        initialValue: data?.identity_card?.map((val, index) => ({
          id: `${val?.id}`,
          uid: `${val?.id}`,
          name: val?.original_name || "",
          status: "done",
          url: `http://103.41.112.73:9000/${val?.physical_path}`,
          size: val?.file_size || 0,
        })),
      },
      {
        name: "elderly_document_property_inquiry",
        label: "Эд хөрөнгийн лавлагаа",
        initialValue: data?.property_inquiry?.map((val, index) => ({
          id: `${val?.id}`,
          uid: `${val?.id}`,
          name: val?.original_name || "",
          status: "done",
          url: `http://103.41.112.73:9000/${val?.physical_path}`,
          size: val?.file_size || 0,
        })),
      },
    ],
    [
      {
        name: "elderly_document_is_have_children_inquiry",
        label: "Үр хүүхэдтэй эсэх лавлагаа",
        initialValue: data?.is_have_children_inquiry?.map((val, index) => ({
          uid: `${val?.id}`,
          id: `${val?.id}`,
          name: val?.original_name || "",
          status: "done",
          url: `http://103.41.112.73:9000/${val?.physical_path}`,
          size: val?.file_size || 0,
        })),
      },
      {
        name: "elderly_document_is_have_sibling_inquiry",
        label: "Ах дүүтэй эсэх лавлагаа",
        initialValue: data?.is_have_children_inquiry?.map((val, index) => ({
          uid: `${val?.id}`,
          id: `${val?.id}`,
          name: val?.original_name || "",
          status: "done",
          url: `http://103.41.112.73:9000/${val?.physical_path}`,
          size: val?.file_size || 0,
        })),
      },
    ],
    [
      {
        name: "elderly_document_is_married_inquiry",
        label: "Гэрлэсэн эсэх",
        initialValue: data?.is_married_inquiry?.map((val, index) => ({
          uid: `${val?.id}`,
          id: `${val?.id}`,
          name: val?.original_name || "",
          status: "done",
          url: `http://103.41.112.73:9000/${val?.physical_path}`,
          size: val?.file_size || 0,
        })),
      },
      {
        name: "elderly_document_is_divorce_inquiry",
        label: "Гэрлэлт цуцлалсан эсэх",
        initialValue: data?.is_divorce_inquiry?.map((val, index) => ({
          uid: `${val?.id}`,
          id: `${val?.id}`,
          name: val?.original_name || "",
          status: "done",
          url: `http://103.41.112.73:9000/${val?.physical_path}`,
          size: val?.file_size || 0,
        })),
      },
    ],
  ];
  return (
    <div className="px-8">
      <div>
        <div className="text-lg font-medium mb-4">Тэтгэврийн мэдээлэл</div>
        <div>
          {pensionDocument?.map((val, key) => (
            <Row gutter={[16, 16]} key={key}>
              {val?.map((el, index) => (
                <Col span={12}>
                  <UploadButton
                    initialValue={el?.initialValue}
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
                <Col span={12}>
                  {console.log(el?.initialValue, "initialValue")}
                  <UploadButton
                    initialValue={el?.initialValue}
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
                <Col span={12}>
                  <UploadButton
                    initialValue={el?.initialValue}
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
