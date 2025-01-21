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

const ReportPage: React.FC = () => {
  const [filter, setFilter] = useState(initPagination);
  const [search, setSearch] = useState<string>("");

  const fieldRegister = useRequest(report.list, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  useEffect(() => {
    fieldRegister.run({
      ...filter,
    });
  }, [filter]);

  const refreshList = () => {
    fieldRegister?.run({
      ...filter,
    });
  };
  const searchRun = useDebounceFn(fieldRegister.run, { wait: 1000 });

  return (
    <PageCard xR>
      <InitTableHeader
        leftContent={
          <div className="flex items-center gap-3">
            <div className="text-lg font-semibold text-gray-700">
              Нийт ({fieldRegister?.data?.total})
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
        dataSource={fieldRegister.data?.items}
        loading={fieldRegister.loading}
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
            dataIndex: "arrive_depart",
          },
          {
            title: "Огноо",
            dataIndex: "container_code",
          },
          {
            title: "Нийт төлсөн",
            dataIndex: "capacity",
          },
          {
            title: "Бэлнээр",
            dataIndex: "carrier_name",
          },
          {
            title: "Бэлэн бусаар",
            dataIndex: "empty_full",
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
