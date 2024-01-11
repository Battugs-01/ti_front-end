import { Card } from "antd";
import { ExportButton } from "components/index";
import InitTableHeader from "components/table-header";
import { exportFromTable } from "utils/export";
import { List } from "./list";

const data = [
  {
    formTitle:
      "Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ауйн нэгж, байгууллагын мэдээ",
    formNo: "Б-АС-1.1А",
    id: 23,
  },
  {
    formTitle: "Барилга байгууламжийн мэдээлэл",
    formNo: "Б-АС-1.1Б",
    id: 34,
  },
  {
    formTitle:
      "Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ауйн нэгж, байгууллагын орлого, зарлага, хөрөнгийн мэдээ",
    formNo: "Б-АС-1.1А",
    id: 56,
  },
  {
    formTitle: "Асруулагчид хэрэгжүүлэх хөгжлийн төлөвлөгөөний жагсаалт",
    formNo: "Б-АС-1.1А",
    id: 89,
  },
  {
    formTitle:
      "Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ауйн нэгж, байгууллагын мэдээ",
    formNo: "Б-АС-1.1А",
    id: 23,
  },
];

export const FormList: React.FC = () => {
  return (
    <div className="mt-6 custom-ant-card-padding-remove">
      <Card>
        <div style={{ borderBottom: "1px solid #EAECF0" }} className="mt-5">
          <InitTableHeader
            customHeaderTitle="Маягтын жагсаалт"
            toolbarItems={
              <div className="flex">
                <ExportButton
                  onClick={() => {
                    exportFromTable(
                      ["Ажилчдын жагсаалт"],
                      window.document.getElementById(
                        "main-table"
                      ) as HTMLElement,
                      window
                    );
                  }}
                />
              </div>
            }
          />
        </div>
        <List data={data} />
      </Card>
    </div>
  );
};
