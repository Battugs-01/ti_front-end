import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import pdfFile from "assets/government/pdf/example.pdf";
import { Card } from "antd";

export const FoodCard: React.FC = () => {
  return (
    <Card>
      <div
        className="font-semibold pb-4 text-base"
        style={{ borderBottom: "1px solid #E5E7EB" }}
      >
        Хоол зүйн карт
      </div>
      <div className="py-4 h-[662px] w-1/2 m-auto">
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
        >
          <Viewer fileUrl={pdfFile} />
        </Worker>
      </div>
    </Card>
  );
};
