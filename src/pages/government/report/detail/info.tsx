import { Card } from "antd";
import { ExportButton } from "components/index";
import InitTableHeader from "components/table-header";
import React from "react";
import { exportFromTable } from "utils/export";
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
    </Card>
  );
};

export default Info;
