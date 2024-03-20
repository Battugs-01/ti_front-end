import { useRequest } from "ahooks";
import { Card } from "antd";
import { ExportButton, FilterForm } from "components/index";
import CustomPagination from "components/pagination";
import InitTableHeader from "components/table-header";
import React, { useEffect, useState } from "react";
import orphanElderly from "service/social-worker/customer";
import { exportFromTable } from "utils/export";
import List from "./components/list";
import { initPagination } from "utils/index";

const RequestPage: React.FC = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [isStepModal, setStepModal] = useState<boolean>(false);
  const [page, setPage] = useState(initPagination);
  const list = useRequest(orphanElderly.elderlyList, {
    manual: true,
  });

  useEffect(() => {
    list.run({ initPagination });
  }, []);
  const cancelModal = () => {
    setOpenModal(false);
  };
  const cancelStepModal = () => {
    setStepModal(false);
  };
  const nextModal = () => {
    setOpenModal(false);
    setStepModal(true);
  };
  const refreshList = () => {
    list?.run(page);
  };
  const setPagination = (page: number, pageSize: number) => {
    list?.run({ current: page, pageSize });
  };
  return (
    <div className="custom-ant-card-padding-border-remove">
      <div className="mb-4">
        <FilterForm />
      </div>
      <Card loading={list?.loading}>
        <div className="pt-5" style={{ borderBottom: "1px solid #EAECF0" }}>
          <InitTableHeader
            refresh={refreshList}
            customHeaderTitle={`Шийдвэрлэх хүсэлтүүд`}
            hideCreate
            toolbarItems={
              <div className="flex">
                <ExportButton
                  onClick={() => {
                    exportFromTable(
                      ["Шийдвэрлэх хүсэлтүүд"],
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
        <div className="w-full">
          {list?.data?.items?.map((card, key) => (
            <List key={key} data={card} />
          ))}
          <div
            className="flex justify-end mb-4 px-6"
            style={{ borderTop: "1px solid #EAECF0" }}
          >
            <CustomPagination
              total={list?.data?.total}
              setPagination={setPagination}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RequestPage;
