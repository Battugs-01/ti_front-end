import { useDebounceFn, useRequest } from "ahooks";
import { Card, Empty } from "antd";
import { ExportButton, FilterForm } from "components/index";
import CustomPagination from "components/pagination";
import InitTableHeader from "components/table-header";
import React, { useEffect, useState } from "react";
import orphanElderly from "service/social-worker/customer";
import { exportFromTable } from "utils/export";
import { initFilter } from "utils/index";
import List from "./components/list";
import { ElderlyStatus } from "service/social-worker/customer/type";

const RequestPage: React.FC = () => {
  // const [isOpenModal, setOpenModal] = useState<boolean>(false);
  // const [isStepModal, setStepModal] = useState<boolean>(false);
  const [filter, setFilter] = useState(initFilter);
  const [search, setSearch] = useState<string>("");
  const list = useRequest(orphanElderly.elderlyList, {
    manual: true,
  });
  const searchRun = useDebounceFn(list.run, { wait: 1000 });

  useEffect(() => {
    list.run({
      ...filter,
      status: [
        ElderlyStatus.ReturnSum,
        ElderlyStatus.ElderlyRequestSendToDistrict,
      ],
    });
  }, [filter]);
  // const cancelModal = () => {
  //   setOpenModal(false);
  // };
  // const cancelStepModal = () => {
  //   setStepModal(false);
  // };
  // const nextModal = () => {
  //   setOpenModal(false);
  //   setStepModal(true);
  // };
  const refreshList = () => {
    list?.run({
      ...filter,
      status: [
        ElderlyStatus.ReturnSum,
        ElderlyStatus.ElderlyRequestSendToDistrict,
      ],
    });
  };
  const setPagination = (pageNumber: number, pageSize: number) => {
    setFilter({ ...filter, current: pageNumber, pageSize });
    list?.run({ ...filter, current: pageNumber, pageSize });
  };
  return (
    <div className="custom-ant-card-padding-border-remove">
      <div className="mb-4">
        <FilterForm initialValues={{ ...filter }} setSelectedDate={setFilter} />
      </div>
      <Card loading={list?.loading}>
        <div className="pt-5" style={{ borderBottom: "1px solid #EAECF0" }}>
          <InitTableHeader
            search={search}
            setSearch={(e) => {
              setSearch(e);
              searchRun.run({
                ...filter,
                status: [
                  ElderlyStatus.ReturnSum,
                  ElderlyStatus.ElderlyRequestSendToDistrict,
                ],
                query: e,
              });
            }}
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
        {list?.data?.total === 0 ? (
          <Empty
            className="h-full items-center flex flex-col justify-center"
            description="Дата байхгүй байна"
          />
        ) : (
          <div className="w-full">
            {list?.data?.items?.map((card, key) => (
              <List key={key} data={card} refreshList={refreshList} />
            ))}
            <div
              className="flex justify-end mb-4 px-6"
              style={{ borderTop: "1px solid #EAECF0" }}
            >
              <CustomPagination
                current={filter.current}
                total={list?.data?.total}
                setPagination={setPagination}
              />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default RequestPage;
