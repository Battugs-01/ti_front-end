// import { Col, Row } from "antd";
// import { UploadButton, UploadDraggerButton } from "components/index";
// import { LaboratoryTest, LaboratoryTests } from "service/social-worker/customer/type";

// type HealthType = {
//   data: LaboratoryTests[];
// };

// export const HealthForm: React.FC<HealthType> = ({ data }) => {
//   const uploadDocument = [
//     [
//       {
//         name: "health_check_sheet",
//         label: "Эрүүл мэндийн үзлэгийн хуудас",
//         initialValue: [
//           {
//             uid: "1",
//             name: data[0]?.files[0].original_name,
//             // [0].original_name || "",
//             status: "done",
//             url: `http://103.41.112.73:9000/${data[0]?.files[0].physical_path}`,
//           },
//         ],
//       },
//       {
//         name: "blood_test",
//         label: "Цусны ерөнхий шинжилгээ",
//         initialValue: [
//           {
//             uid: "1",
//             name: data[1]?.files[0]?.original_name || "",
//             status: "done",
//             url: `http://103.41.112.73:9000/${data[1]?.files[0]?.original_name}`,
//           },
//         ],
//       },
//     ],
//     [
//       {
//         name: "analysis_urine",
//         label: "Шээсний ерөнхий шинжилгээ",
//         initialValue: [
//           {
//             uid: "1",
//             name: data?.care_request[0].original_name || "",
//             status: "done",
//             url: `http://103.41.112.73:9000/${data?.care_request[0].physical_path}`,
//           },
//         ],
//       },
//       {
//         name: "biochemical",
//         label: "Биохимийн шинжилгээ",
//         initialValue: [
//           {
//             uid: "1",
//             name: data?.care_request[0].original_name || "",
//             status: "done",
//             url: `http://103.41.112.73:9000/${data?.care_request[0].physical_path}`,
//           },
//         ],
//       },
//     ],
//     [
//       {
//         name: "sputum",
//         label: "Цэрний шинжилгээ. /Сүрьеэ үзэх/",
//         initialValue: [
//           {
//             uid: "1",
//             name: data?.care_request[0].original_name || "",
//             status: "done",
//             url: `http://103.41.112.73:9000/${data?.care_request[0].physical_path}`,
//           },
//         ],
//       },
//       {
//         name: "syphilis",
//         label: "ДOX, тэмбүүгийн илрүүлэг",
//         initialValue: [
//           {
//             uid: "1",
//             name: data?.care_request[0].original_name || "",
//             status: "done",
//             url: `http://103.41.112.73:9000/${data?.care_request[0].physical_path}`,
//           },
//         ],
//       },
//     ],
//     [
//       {
//         name: "abdominal",
//         label: "Хэвлийн ЭХО",
//         initialValue: [
//           {
//             uid: "1",
//             name: data?.care_request[0].original_name || "",
//             status: "done",
//             url: `http://103.41.112.73:9000/${data?.care_request[0].physical_path}`,
//           },
//         ],
//       },
//       {
//         name: "heart_recording",
//         label: "Зүрхний бичлэг",
//         initialValue: [
//           {
//             uid: "1",
//             name: data?.care_request[0].original_name || "",
//             status: "done",
//             url: `http://103.41.112.73:9000/${data?.care_request[0].physical_path}`,
//           },
//         ],
//       },
//     ],
//     [
//       {
//         name: "lungs",
//         label: "Уушигны рентген зураг",
//         initialValue: [
//           {
//             uid: "1",
//             name: data?.care_request[0].original_name || "",
//             status: "done",
//             url: `http://103.41.112.73:9000/${data?.care_request[0].physical_path}`,
//           },
//         ],
//       },
//       {
//         name: "mental_health",
//         label:
//           "Сэтгэцийн эрүүл мэндийн үндэсний төвийн тодорхойлолт./Сэтгэцийн өөрчлөлтгүй тухай/",
//         initialValue: [
//           {
//             uid: "1",
//             name: data?.care_request[0].original_name || "",
//             status: "done",
//             url: `http://103.41.112.73:9000/${data?.care_request[0].physical_path}`,
//           },
//         ],
//       },
//     ],
//   ];
//   return (
//     <div className="px-8">
//       {uploadDocument?.map((val, key) => (
//         <Row gutter={[16, 16]} key={key}>
//           {val?.map((el, index) => (
//             <Col span={12}>
//               <UploadButton
//                 name={["laboratory_tests", el?.name]}
//                 label={el?.label}
//                 key={index}
//               />
//             </Col>
//           ))}
//         </Row>
//       ))}
//     </div>
//   );
// };
