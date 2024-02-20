import { ElderlyInterface } from "service/social-worker/customer/type";
import PowerIcon from "assets/government/icons/powerpoint.svg";
import { formatMB } from "utils/index";
import EyeIcon from "assets/government/icons/dark-eye.svg";
import DownloadIcon from "assets/government/icons/download_cloud.svg";
import { Link } from "react-router-dom";

type DocumentsType = {
  data?: ElderlyInterface;
};

export const FiledDocuments: React.FC<DocumentsType> = ({ data }) => {
  const documentList = [
    {
      name: "Асрамжийн газарт асруулахыг хүссэн өргөдөл",
      size: data?.documents?.care_request[0].file_size,
      path: data?.documents?.care_request[0].physical_path,
    },
    {
      name: "Асруулагчийн иргэний үнэмлэх",
      size: data?.documents?.identity_card[0].file_size,
      path: data?.documents?.identity_card[0].physical_path,
    },
    {
      name: "Тэтгэвэр авдаг эсэх лавлагаа",
      size: data?.documents?.is_pension_inquiry[0].file_size,
      path: data?.documents?.is_pension_inquiry[0].physical_path,
    },
    {
      name: "Даатгалын хөнгөлөлттэй эсэх лавлагаа",
      size: data?.documents?.insurance_discounts_inquiry[0].file_size,
      path: data?.documents?.insurance_discounts_inquiry[0].physical_path,
    },
    {
      name: "Ахмадын зориулалттай сувиллын газарт амрах эрхийн бичгийг хөнгөлөлттэй үнээр олгох",
      size: data?.documents?.care_center_discount_inquiry[0].file_size,
      path: data?.documents?.care_center_discount_inquiry[0].physical_path,
    },
    {
      name: "Хөгжлийн бэрхшээлтэй иргэдийн хөнгөлөлт тусламжад хамрагддаг эсэх лавлагаа",
      size: data?.documents?.is_disability_inquiry[0].file_size,
      path: data?.documents?.is_disability_inquiry[0].physical_path,
    },
    {
      name: "Эрүүл мэндийн үнэлгээний хуудас",
      size: data?.documents?.property_inquiry[0].file_size,
      path: data?.documents?.property_inquiry[0].physical_path,
    },
  ];
  return (
    <div className="mt-5">
      {documentList?.map((value, key) => {
        return (
          <div
            key={key}
            className="text-gray-700 p-4 flex items-center justify-between"
            style={{ borderBottom: "1px solid #EAECF0" }}
          >
            <div className="flex gap-3 items-center">
              <img src={PowerIcon} alt="power_point" />
              <div className="flex flex-col gap-1">
                <div className="font-bold text-base">{value?.name}</div>
                <div>
                  Хэмжээ{" "}
                  <span className="font-bold">{formatMB(value?.size, 2)}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="p-4 cursor-pointer text-gray-600">
                <img src={EyeIcon} alt="see" />
              </div>
              <a
                href={`http://103.41.112.73:9000/${value?.path}`}
                className="p-4 cursor-pointer text-gray-600"
                target="blank"
                download
              >
                <img src={DownloadIcon} alt="download" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
