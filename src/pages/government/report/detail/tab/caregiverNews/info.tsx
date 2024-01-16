import { Card } from "antd";
import { ExportButton } from "components/index";
import InitTableHeader from "components/table-header";
import React from "react";
import { exportFromTable } from "utils/export";
import { List } from "./list";

const data = [
  {
    id: 1,
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    year: 2022,
    date: Date.now(),
    status: 1,
  },
  {
    id: 2,
    orphanName: "Хөвсгөл аймгийн буурал",
    year: 2022,
    date: Date.now(),
    status: 1,
  },
  {
    id: 3,
    orphanName: "Ватиканы Католик шашны ТГ аймаг дахь",
    year: 2022,
    date: Date.now(),
    status: 1,
  },
  {
    id: 4,
    orphanName: "Баян-өлгий аймаг дахь",
    year: 2022,
    date: Date.now(),
    status: 1,
  },
  {
    id: 5,
    orphanName: "Увс аймаг дахь баруун бүсийн",
    year: 2022,
    date: Date.now(),
    status: 1,
  },
  {
    id: 6,
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    year: 2022,
    date: Date.now(),
    status: 1,
  },
  {
    id: 7,
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    year: 2022,
    date: Date.now(),
    status: 1,
  },
  {
    id: 8,
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    year: 2022,
    date: Date.now(),
    status: 1,
  },
];

const CaregiverNews: React.FC = () => {
  return (
    <Card>
      <div className="mt-4">
        <InitTableHeader
          hideCreate
          refresh={() => {}}
          customHeaderTitle="Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ахуйн нэгж, байгууллагаар асруулагчийн жилийн мэдээ"
          toolbarItems={
            <div className="flex">
              <ExportButton
                onClick={() => {
                  exportFromTable(
                    [
                      "Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ахуйн нэгж, байгууллагаар асруулагчийн жилийн мэдээ",
                    ],
                    window.document.getElementById("main-table") as HTMLElement,
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
  );
};

export default CaregiverNews;
