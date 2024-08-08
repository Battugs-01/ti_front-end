import { PageCard } from "components/card";
import { ExportButton } from "components/index";
import InitTableHeader from "components/table-header";
import { exportFromTable } from "utils/export";

const PermissionControl: React.FC = () => {
  return (
    <PageCard xR>
      <InitTableHeader
        customHeaderTitle="Permission Control"
        toolbarItems={
          <div className="flex">
            <ExportButton
              onClick={() => {
                exportFromTable(
                  ["Хөгжлийн төлөвлөгөө"],
                  window.document.getElementById("main-table") as HTMLElement,
                  window
                );
              }}
            />
          </div>
        }
      />
      <div>Permission control</div>
    </PageCard>
  );
};

export default PermissionControl;
