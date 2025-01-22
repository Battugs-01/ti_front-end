import { useDebounceFn, useRequest } from "ahooks";
import { notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { useEffect, useState } from "react";
import { initPagination } from "utils/index";
import { CargoApproachList } from "service/feild_registration/type";
import dayjs from "dayjs";
import report from "service/report";
import additionalFeeDebit from "service/feild_registration/additionalFeeDebit";

const ReportPage: React.FC = () => {
  const [filter, setFilter] = useState(initPagination);
  const [search, setSearch] = useState<string>("");

  const reportList = useRequest(additionalFeeDebit.list, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  useEffect(() => {
    reportList.run({
      ...filter,
    });
  }, [filter]);

  const refreshList = () => {
    reportList?.run({
      ...filter,
    });
  };
  const searchRun = useDebounceFn(reportList.run, { wait: 1000 });

  return (
    <PageCard xR>
      <InitTableHeader
        leftContent={
          <div className="flex items-center gap-3">
            <div className="text-lg font-semibold text-gray-700">
              Нийт ({reportList?.data?.total})
            </div>
          </div>
        }
        hideTitle
        search={search}
        setSearch={(e) => {
          setSearch(e);
          searchRun.run({ ...filter, query: e });
        }}
        refresh={refreshList}
        hideCreate
        fileName="RemainderCargo"
        hideDownload
      />
      <ITable<CargoApproachList>
        dataSource={reportList.data?.items}
        loading={reportList.loading}
        refresh={refreshList}
        className="p-0 remove-padding-table"
        columns={[
          {
            title: "Төлөв",
            dataIndex: "approach_report_date",
            render: (value) => {
              return <div>{dayjs(value as string).format("YYYY-MM-DD")}</div>;
            },
          },
          {
            title: "Төрөл",
            dataIndex: "arrived_at_site",
          },
          {
            title: "Баримтын дугаар",
            dataIndex: "ticket_number",
          },
          {
            title: "Огноо",
            dataIndex: "created_at",
            render: (value: any) => {
              return dayjs(value).format("YYYY-MM-DD");
            },
          },
          {
            title: "Нийт төлсөн",
            dataIndex: "total_amount",
          },
          {
            title: "Бэлнээр",
            dataIndex: "cash",
          },
          {
            title: "Бэлэн бусаар",
            dataIndex: "non_cash",
          },
          {
            title: "Нийт төлбөр",
            dataIndex: "for_sale",
          },
          {
            title: "Краны хөлс",
            dataIndex: "price",
          },
          {
            title: "Зам талбайн ашиглалт",
            dataIndex: "carrier_code",
          },
          {
            title: "Ачаа хадгаламж",
            dataIndex: "place_number",
          },
          {
            title: "Чингэлэг вагон цэвэрлэгээ",
            dataIndex: "field_cleaned",
          },
          {
            title: "TL Вагон ашиглалт",
            dataIndex: "cleaned",
          },
          {
            title: "Гаалийн үзлэг",
            dataIndex: "watered",
          },
          {
            title: "Авто ачигч",
            dataIndex: "worked",
          },
          {
            title: "Машин оролт",
            dataIndex: "arrival_field",
          },
        ]}
      />
    </PageCard>
  );
};

export default ReportPage;
