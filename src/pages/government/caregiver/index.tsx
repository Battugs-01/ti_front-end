import { useRequest } from "ahooks";
import { Card, Tabs } from "antd";
import { FilterForm } from "components/filter";
import { ExportButton } from "components/index";
import CustomPagination from "components/pagination";
import InitTableHeader from "components/table-header";
import React, { useEffect, useState } from "react";
import { CaregiverType } from "service/gov-requests";
import orphanElderly from "service/social-worker/customer";
import { exportFromTable } from "utils/export";
import { initFilter } from "utils/index";
import List from "./list";
import { caregiverFilterDistrict } from "utils/caregiver-filter";
import { ElderlyStatus } from "service/social-worker/customer/type";
import Badge from "components/badge";

const RequestPage: React.FC = () => {
  const [tab, setTab] = useState<String>(CaregiverType.all);
  const [filter, setFilter] = useState(initFilter);
  const elderlyList = useRequest(orphanElderly.elderlyList, {
    manual: true,
  });
  const elderlyCount = useRequest(async () => orphanElderly.elderly_counts());
  useEffect(() => {
    elderlyList.run({ ...filter, status: caregiverFilterDistrict(tab) });
  }, [filter, tab]);
  const items = [
    {
      key: CaregiverType.all,
      label: "Бүгд",
      title: elderlyCount?.data?.reduce((a, b) => {
        if (
          b.status === ElderlyStatus.ElderlyRequestSendSendToCareCenter ||
          b.status === ElderlyStatus.ElderlyTakingCare ||
          b.status === ElderlyStatus.ElderlyWaiting ||
          b.status === ElderlyStatus.ElderlyCareCenterReturned
        ) {
          return a + b.count;
        }
        return a;
      }, 0),
    },
    {
      key: CaregiverType.distribute,
      label: "Хуваарилсан",
      title: elderlyCount?.data?.find(
        (val) => val.status === ElderlyStatus.ElderlyRequestSendSendToCareCenter
      )?.count,
    },
    {
      key: CaregiverType.takingCare,
      label: "Үйлчлүүлж байгаа",
      title: elderlyCount?.data?.find(
        (val) => val.status === ElderlyStatus.ElderlyTakingCare
      )?.count,
    },
    {
      key: CaregiverType.putOnHold,
      label: "Хүлээлэгт орсон",
      title: elderlyCount?.data?.find(
        (val) => val.status === ElderlyStatus.ElderlyWaiting
      )?.count,
    },
    {
      key: CaregiverType.canceled,
      label: "Цуцлагдсан",
      title: elderlyCount?.data?.find(
        (val) => val.status === ElderlyStatus.ElderlyCareCenterReturned
      )?.count,
    },
  ];

  const setPagination = (pageNumber: number, pageSize: number) => {
    setFilter({ ...filter, current: pageNumber, pageSize });
    // elderlyList?.run({
    //   ...filter,
    //   current: pageNumber,
    //   pageSize,
    //   status: caregiverFilterDistrict(tab),
    // });
  };
  const refreshList = () => {
    elderlyList?.run({
      ...filter,
      status: caregiverFilterDistrict(tab),
    });
  };
  return (
    <div className={`w-full custom-ant-card-padding-remove`}>
      <div className="px-4 pt-4 bg-white border border-gray-200 rounded-xl mb-4 flex-col gap-4">
        <div className="text-lg font-semibold">Үйлчлүүлэгчид</div>
        <Tabs
          defaultActiveKey={CaregiverType.all}
          onChange={(e) => {
            setFilter(initFilter);
            setTab(e);
          }}
          items={items?.map((el) => {
            return {
              key: el?.key,
              label: (
                <div className="flex items-center gap-2">
                  {el?.label}
                  {el.title && <Badge title={el.title} color="gray" />}
                </div>
              ),
            };
          })}
        />
      </div>
      <div className="mb-4">
        <FilterForm initialValues={{ ...filter }} setSelectedDate={setFilter} />
      </div>
      <Card
        loading={elderlyList.loading}
        title={
          <div className="mt-5" style={{ borderBottom: "1px solid #EAECF0" }}>
            <InitTableHeader
              refresh={refreshList}
              customHeaderTitle="Шийдвэрлэсэн хүсэлтүүд"
              selectedToggle={""}
              hideCreate
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
        }
      >
        <div>
          {elderlyList?.data?.items?.map((card, key) => (
            <List key={key} data={card} />
          ))}
        </div>
        <div
          className="flex justify-end mb-4 px-6"
          style={{ borderTop: "1px solid #EAECF0" }}
        >
          <CustomPagination
            current={filter.current}
            total={elderlyList?.data?.total}
            setPagination={setPagination}
          />
        </div>
      </Card>
    </div>
  );
};

export default RequestPage;
