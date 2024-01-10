import { Card } from "antd";
import { ExportButton } from "components/index";
import InitTableHeader from "components/table-header";
import React from "react";
import { exportFromTable } from "utils/export";
import { List } from "./list";

const data = [
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    year: 2022,
    date: Date.now(),
    status: 1,
  },
  {
    orphanName: "Хөвсгөл аймгийн буурал",
    year: 2022,
    date: Date.now(),
    status: 1,
  },
  {
    orphanName: "Ватиканы Католик шашны ТГ аймаг дахь",
    year: 2022,
    date: Date.now(),
    status: 1,
  },
  {
    orphanName: "Баян-өлгий аймаг дахь",
    year: 2022,
    date: Date.now(),
    status: 1,
  },
  {
    orphanName: "Увс аймаг дахь баруун бүсийн",
    year: 2022,
    date: Date.now(),
    status: 1,
  },
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    year: 2022,
    date: Date.now(),
    status: 1,
  },
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    year: 2022,
    date: Date.now(),
    status: 1,
  },
  {
    orphanName: "Батсүмбэрийн Улсын асрамжийн газар",
    year: 2022,
    date: Date.now(),
    status: 1,
  },
];

const Info: React.FC = () => {
  return (
    <Card>
      <InitTableHeader
        hideCreate
        refresh={() => {}}
        customHeaderTitle="Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ахуйн нэгж, байгууллагын цалин хөлсний мэдээлэл"
        toolbarItems={
          <div className="flex">
            <ExportButton
              onClick={() => {
                exportFromTable(
                  [
                    "Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ахуйн нэгж, байгууллагын цалин хөлсний мэдээлэл",
                  ],
                  window.document.getElementById("main-table") as HTMLElement,
                  window
                );
              }}
            />
          </div>
        }
      />
      <List data={data} />
    </Card>
  );
};

export default Info;
