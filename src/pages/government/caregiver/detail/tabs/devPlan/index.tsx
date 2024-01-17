import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import pdfFile from "assets/government/pdf/example.pdf";
import { Card } from "antd";
import {
  CustomButton,
  DefaultButton,
} from "pages/government/components/button";
import PrintIcon from "assets/government/icons/print.svg";
import DownloadIcon from "assets/government/icons/download.svg";

export const DevPlan: React.FC = () => {
  return (
    <Card>
      <div
        className="font-semibold pb-4 text-base"
        style={{ borderBottom: "1px solid #E5E7EB" }}
      >
        Хөгжлийн төлөвлөгөө
      </div>
      <div className="py-4 h-[662px] w-1/2 m-auto">
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
        >
          <Viewer fileUrl={pdfFile} />
        </Worker>
      </div>
      <div
        className="pt-4 text-base"
        style={{ borderTop: "1px solid #E5E7EB" }}
      >
        <div className="flex items-center justify-end gap-4">
          <DefaultButton icon={<img src={DownloadIcon} />} title="Татах" />
          <CustomButton icon={<img src={PrintIcon} />} title="Хэвлэх" />
        </div>
      </div>
    </Card>
  );
};
