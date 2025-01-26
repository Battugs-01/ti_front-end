import { useDebounceFn, useRequest } from "ahooks";
import { DatePicker, notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import additionalFeeDebit from "service/feild_registration/additionalFeeDebit";
import { CargoApproachList } from "service/feild_registration/type";
import { reportPaginate } from "utils/index";

const ReportPage: React.FC = () => {
  const [filter, setFilter] = useState(reportPaginate);
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
            <DatePicker.RangePicker
              className="w-max"
              placeholder={["Эхлэх огноо", "Дуусах огноо"]}
              onChange={(values) => {
                setFilter({
                  ...filter,
                  start_date: dayjs(values?.[0]?.toDate()).format("YYYY-MM-DD"),
                  end_date: dayjs(values?.[1]?.toDate()).format("YYYY-MM-DD"),
                });
              }}
              defaultValue={[
                filter.start_date
                  ? dayjs(filter.start_date)
                  : dayjs().subtract(3, "month"),
                filter.end_date ? dayjs(filter.end_date) : dayjs(),
              ]}
            />
          </div>
        }
        hideTitle
        search={search}
        setSearch={(e) => {
          setSearch(e);
          searchRun.run({ ...filter, search: e });
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
