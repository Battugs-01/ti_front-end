import { Card } from "antd";
import { ExportButton } from "components/index";
import InitTableHeader from "components/table-header";
import { exportFromTable } from "utils/export";
import { Item } from "../../components/item";

const All: React.FC = () => {
  return (
    <div className="custom-ant-card-padding-remove mt-6">
      <Card className="pt-4">
        <div style={{ borderBottom: "1px solid #EAECF0" }}>
          <InitTableHeader
            hideCreate
            refresh={() => {}}
            customHeaderTitle="Шилжилт хөдөлгөөний мэдээлэл"
            toolbarItems={
              <div className="flex">
                <ExportButton
                  onClick={() => {
                    exportFromTable(
                      ["Шилжилт хөдөлгөөний мэдээлэл"],
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
        <div>
          <Item data={undefined} />
        </div>
      </Card>
    </div>
  );
};

export default All;
