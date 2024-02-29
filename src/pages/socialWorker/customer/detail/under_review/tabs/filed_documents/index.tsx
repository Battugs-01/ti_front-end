import { ElderlyInterface } from "service/social-worker/customer/type";
import PowerIcon from "assets/government/icons/powerpoint.svg";
import { formatMB } from "utils/index";
import EyeIcon from "assets/government/icons/dark-eye.svg";
import DownloadIcon from "assets/government/icons/download_cloud.svg";
import Download from "assets/government/icons/white-download.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Modal } from "antd";
import {
  CustomButton,
  DefaultButton,
} from "pages/government/components/button";
import LeftArrow from "assets/government/icons/left-icon.svg";

interface DocumentList {
  name?: String;
  size?: number;
  path?: String;
}

type DocumentsType = {
  data?: ElderlyInterface;
};

export const FiledDocuments: React.FC<DocumentsType> = ({ data }) => {
  const [isFileOpen, setFileOpen] = useState<DocumentList | undefined>(
    undefined
  );
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
              <div
                className="p-4 cursor-pointer text-gray-600"
                onClick={() => setFileOpen(value)}
              >
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
      {isFileOpen && (
        <Modal
          title={
            <div className="p-6">
              <div className="font-semibold">{isFileOpen?.name}</div>
            </div>
          }
          // hervee ajillahguu baival isFileOpen bolgoh
          open={!!isFileOpen}
          width={1144}
          onCancel={() => setFileOpen(undefined)}
          footer={
            <div
              className="flex items-center gap-2 p-6 justify-end"
              style={{ borderTop: "1px solid #D0D5DD" }}
            >
              <DefaultButton
                icon={<img src={LeftArrow} />}
                title="Буцах"
                onClick={() => setFileOpen(undefined)}
              />
              <CustomButton icon={<img src={Download} />} title="Татах" />
            </div>
          }
        >
          <div className="bg-[#F0F2F5] pt-5">
            <iframe
              style={{ border: "none" }}
              src={`http://103.41.112.73:9000/${isFileOpen?.path}`}
              width={1050}
              height={850}
              className="mx-12"
            ></iframe>
          </div>
        </Modal>
      )}
    </div>
  );
};
