import { Card } from "antd";
import { ExportButton } from "components/index";
import InitTableHeader from "components/table-header";
import { exportFromTable } from "utils/export";
import { useState } from "react";
import { CreateOrphan } from "./action/create/createOrphan";
import { Item } from "./item";
import { useRequest } from "ahooks";
import orphanUser from "service/gov-orphan/requests";
import CustomPagination from "components/pagination";

const GovOrphan: React.FC = () => {
  const [isOpenModal, setModalOpen] = useState<boolean>(false);
  const orphanList = useRequest(() =>
    orphanUser.getList({ current: 1, pageSize: 20 })
  );
  const cancelModal = () => {
    setModalOpen(false);
  };
  const refreshList = () => {
    orphanList.run();
    setModalOpen(false);
  };
  return (
    <div className="custom-ant-card-padding-remove">
      <Card>
        <div style={{ borderBottom: "1px solid #EAECF0" }} className="pt-5">
          <InitTableHeader
            refresh={refreshList}
            addButtonName="Нэмэх"
            setCreate={setModalOpen}
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
          {orphanList?.data?.items?.map((item, key) => {
            return <Item key={key} data={item} />;
          })}
        </div>
        <CreateOrphan openModal={isOpenModal} cancelModal={cancelModal} />
        <div
          className="flex justify-end mb-4 px-6"
          style={{ borderTop: "1px solid #EAECF0" }}
        >
          <CustomPagination total={orphanList?.data?.total} />
        </div>
      </Card>
    </div>
  );
};

export default GovOrphan;
