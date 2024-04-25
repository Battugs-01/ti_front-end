import { Card } from "antd";
import { ExportButton } from "components/index";
import InitTableHeader from "components/table-header";
import { exportFromTable } from "utils/export";
import { Item } from "./item";
import { useRequest } from "ahooks";
import orphanUser from "service/gov-orphan/requests";
import CustomPagination from "components/pagination";
import orphanElderly from "service/social-worker/customer";

const GovOrphan: React.FC = () => {
  const orphanList = useRequest(() => orphanElderly?.getCarecenters());
  const refreshList = () => {
    orphanList.run();
  };
  return (
    <div className="custom-ant-card-padding-remove">
      <Card loading={orphanList?.loading}>
        <div style={{ borderBottom: "1px solid #EAECF0" }} className="pt-5">
          <InitTableHeader
            hideCreate
            refresh={refreshList}
            customHeaderTitle="Асрамжийн газрын жагсаалт"
            toolbarItems={
              <div className="flex">
                <ExportButton
                  onClick={() => {
                    exportFromTable(
                      ["Асрамжийн газрын жагсаалт"],
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
          {orphanList?.data?.map((item, key) => {
            return <Item key={key} data={item} />;
          })}
        </div>
        <div
          className="flex justify-end mb-4 px-6"
          style={{ borderTop: "1px solid #EAECF0" }}
        >
          <CustomPagination total={orphanList?.data?.length} />
        </div>
      </Card>
    </div>
  );
};

export default GovOrphan;
