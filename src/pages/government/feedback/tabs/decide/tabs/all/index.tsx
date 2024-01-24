import { Card } from "antd";
import { ExportButton } from "components/index";
import InitTableHeader from "components/table-header";
import { exportFromTable } from "utils/export";
import Item from "../../../components/item";

const All: React.FC = () => {
  return (
    <div className="custom-ant-card-padding-border-remove mt-6">
      <Card>
        <div className="pt-5">
          <InitTableHeader
            hideCreate
            refresh={() => {}}
            customHeaderTitle="Санал хүсэлтүүд"
            toolbarItems={
              <div className="flex">
                <ExportButton
                  onClick={() => {
                    exportFromTable(
                      ["Санал хүсэлтүүд"],
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
        <Item data={undefined} />
      </Card>
    </div>
  );
};

export default All;
