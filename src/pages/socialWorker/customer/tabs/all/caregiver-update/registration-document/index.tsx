import { Col, Row } from "antd";
import { UploadButton, UploadDraggerButton } from "components/index";
import { Documents } from "service/social-worker/customer/type";

type RegistrationType = {
  data?: Documents;
};

export const RegistrationForm: React.FC<RegistrationType> = ({ data }) => {
  const uploadDocument = [
    [
      {
        name: "elderly_document_care_requet",
        label: "Асрамжийн газарт асруулахыг хүссэн өргөдөл",
        initialValue: [
          {
            uid: "1",
            fileName: data?.care_request[0].original_name || "",
            status: "done",
            url: `http://103.41.112.73:9000/${data?.care_request[0].physical_path}`,
          },
        ],
      },
      {
        name: "elderly_document_insurance_notebook",
        label: "Эрүүл мэндийн даатгалын дэвтэр",
        initialValue: [
          {
            uid: "1",
            fileName: data?.insurance_notebook[0].original_name || "",
            status: "done",
            url: `http://103.41.112.73:9000/${data?.insurance_notebook[0].physical_path}`,
          },
        ],
      },
    ],
    [
      {
        name: "elderly_document_is_pension_inquiry",
        label: "Тэтгэвэр авдаг эсэх лавлагаа",
        initialValue: [
          {
            uid: "1",
            fileName: data?.is_pension_inquiry[0].original_name || "",
            status: "done",
            url: `http://103.41.112.73:9000/${data?.is_pension_inquiry[0].physical_path}`,
          },
        ],
      },
      {
        name: "elderly_document_pension_loan;",
        label: "Тэтгэврийн зээлтэй эсэх",
        initialValue: [
          {
            uid: "1",
            fileName: data?.pension_loan[0].original_name || "",
            status: "done",
            url: `http://103.41.112.73:9000/${data?.pension_loan[0].physical_path}`,
          },
        ],
      },
    ],
    [
      {
        name: "elderly_document_is_disability_inquiry",
        label: "Хөгжлийн бэрхшээлтэй эсэх лавлагаа",
        initialValue: [
          {
            uid: "1",
            fileName: data?.is_disability_inquiry[0].original_name || "",
            status: "done",
            url: `http://103.41.112.73:9000/${data?.is_disability_inquiry[0].physical_path}`,
          },
        ],
      },
      {
        name: "welderly_document_other_welfare_services_inquiry",
        label: "Халамжийн бусад үйлчилгээ авдаг эсэх лавлагаа",
        initialValue: [
          {
            uid: "1",
            fileName:
              data?.other_welfare_services_inquiry.length !== 0
                ? data?.other_welfare_services_inquiry[0].original_name
                : "",
            status: "done",
            url:
              data?.other_welfare_services_inquiry.length !== 0 &&
              `http://103.41.112.73:9000/${data?.other_welfare_services_inquiry[0].physical_path}`,
          },
        ],
      },
    ],
    [
      {
        name: "elderly_document_insurance_discounts_inquiry",
        label: "Даатгалын хөнгөлөлттэй эсэх лавлагаа",
        initialValue: [
          {
            uid: "1",
            fileName: data?.insurance_discounts_inquiry[0].original_name || "",
            status: "done",
            url: `http://103.41.112.73:9000/${data?.insurance_discounts_inquiry[0].physical_path}`,
          },
        ],
      },
      {
        name: "elderly_document_care_center_discount_inquiry",
        label: "Амралт сувилалд хөнгөлөлттэй үнээр хамрагддаг эсэх лавлагаа",
        initialValue: [
          {
            uid: "1",
            fileName: data?.care_center_discount_inquiry[0].original_name || "",
            status: "done",
            url: `http://103.41.112.73:9000/${data?.care_center_discount_inquiry[0].physical_path}`,
          },
        ],
      },
    ],
  ];
  const uploadFile = [
    [
      {
        name: "elderly_document_identity_card",
        label: "Иргэний үнэмлэх",
        initialValue: [
          {
            uid: "1",
            name: data?.identity_card[0].original_name || "",
            status: "done",
            url: `http://103.41.112.73:9000/${data?.identity_card[0].physical_path}`,
          },
        ],
      },
      {
        name: "elderly_document_property_inquiry",
        label: "Эд хөрөнгийн лавлагаа",
        initialValue: [
          {
            uid: "1",
            name: data?.property_inquiry[0].original_name || "",
            status: "done",
            url: `http://103.41.112.73:9000/${data?.property_inquiry[0].physical_path}`,
          },
        ],
      },
    ],
    [
      {
        name: "elderly_document_is_have_children_inquiry",
        label: "Үр хүүхэдтэй эсэх лавлагаа",
        initialValue: [
          {
            uid: "1",
            name: data?.is_have_children_inquiry[0].original_name || "",
            status: "done",
            url: `http://103.41.112.73:9000/${data?.is_have_children_inquiry[0].physical_path}`,
          },
        ],
      },
      {
        name: "elderly_document_is_have_sibling_inquiry",
        label: "Ах дүүтэй эсэх лавлагаа",
        initialValue: [
          {
            uid: "1",
            name: data?.is_have_sibling_inquiry[0].original_name || "",
            status: "done",
            url: `http://103.41.112.73:9000/${data?.is_have_sibling_inquiry[0].physical_path}`,
          },
        ],
      },
    ],
    [
      {
        name: "elderly_document_is_married_inquiry",
        label: "Гэрлэсэн эсэх",
        initialValue: [
          {
            uid: "1",
            name: data?.is_married_inquiry[0].original_name || "",
            status: "done",
            url: `http://103.41.112.73:9000/${data?.is_married_inquiry[0].physical_path}`,
          },
        ],
      },
      {
        name: "elderly_document_is_divorce_inquiry",
        label: "Гэрлэлт цуцлалсан эсэх",
        initialValue: [
          {
            uid: "1",
            name: data?.is_divorce_inquiry[0].original_name,
            status: "done",
            url: `http://103.41.112.73:9000/${data?.is_divorce_inquiry[0].physical_path}`,
          },
        ],
      },
    ],
  ];

  console.log(data?.care_center_discount_inquiry[0].file_name, "hjdfh");
  if (data) console.log(Object.values(data), "sda");
  // const initialValue = [
  //   {
  //     uid: "1",
  //     name: data?.care_center_discount_inquiry[0].original_name,
  //     status: "done",
  //     url: `http://103.41.112.73:9000/${data?.care_center_discount_inquiry[0].physical_path}`,
  //   },
  // ];
  return (
    <div className="px-8">
      <div className="mb-5">
        {uploadDocument?.map((val, key) => (
          <Row gutter={[16, 16]} key={key}>
            {val?.map((el, index) => (
              <Col span={12}>
                <UploadButton
                  initialValue={el.initialValue}
                  fileList={[
                    {
                      uid: "uid",
                      name:
                        data?.is_divorce_inquiry[0].original_name ||
                        "picture.png",
                      fileName: data?.is_divorce_inquiry[0].original_name,
                      status: "done",
                      url: `http://103.41.112.73:9000/${data?.is_divorce_inquiry[0].physical_path}`,
                    },
                  ]}
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
  );
};
