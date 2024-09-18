import { useRequest } from "ahooks";
import { DatePicker, notification, Table } from "antd";
import { PageCard } from "components/card";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import statisticalReport from "service/statistical_report";
import { reportFilterYear } from "utils/index";

export const CareFoci: React.FC = () => {
  const intl = useIntl();
  const [filter, setFilter] = useState(reportFilterYear);

  const list = useRequest(statisticalReport.careFociReportList, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err,
      });
    },
  });

  useEffect(() => {
    list.run({
      ...filter,
    });
  }, [filter]);
  const refreshList = () => {
    list?.run({
      ...filter,
    });
  };

  const filteredData = useMemo(() => {
    let result: any[] = [];
    let count = 0;
    list?.data?.map((item) => {
      count = item.items.length;
      item.items.map((i, key) => {
        result.push({
          group_name: item.name,
          name: i.name,
          count: count,
          key: key + 1,
          month_1: i.months[0],
          month_2: i.months[1],
          month_3: i.months[2],
          month_4: i.months[3],
          month_5: i.months[4],
          month_6: i.months[5],
          month_7: i.months[6],
          month_8: i.months[7],
          month_9: i.months[8],
          month_10: i.months[9],
          month_11: i.months[10],
          month_12: i.months[11],
        });
      });
      count = 0;
    });
    return result;
  }, [list.data]);

  console.log(filteredData, "ssss");

  console.log(dayjs(filter.year).year(), "year");

  return (
    <PageCard xR>
      <InitTableHeader
        hideTitle
        leftContent={
          <DatePicker
            className="w-max"
            onChange={(values) => {
              setFilter({
                ...filter,
                year: dayjs(values?.toDate()).year(),
              });
            }}
            picker="year"
            defaultValue={filter.year ? dayjs().year(filter.year) : dayjs()}
          />
        }
        hideCreate
        refresh={refreshList}
      />
      <Table
        pagination={false}
        loading={list.loading}
        className="p-0 remove-padding-table"
        dataSource={filteredData}
        columns={[
          {
            title: (
              <div className="pl-3"> {intl.formatMessage({ id: "group" })}</div>
            ),
            dataIndex: "group_name",
            width: 220,
            render: (value) => {
              return <p className="px-3">{value}</p>;
            },
            onCell: (record) => {
              return {
                rowSpan: record.key % record.count === 1 ? record.count : 0,
              };
            },
          },
          {
            title: intl.formatMessage({ id: "name" }),
            width: 350,
            dataIndex: "name",
            render: (value) => {
              return <p className="px-1">{value}</p>;
            },
          },
          {
            title: intl.formatMessage({ id: "months" }, { number: 1 }),
            dataIndex: "month_1",
          },
          {
            title: intl.formatMessage({ id: "months" }, { number: 2 }),
            dataIndex: "month_2",
          },
          {
            title: intl.formatMessage({ id: "months" }, { number: 3 }),
            dataIndex: "month_3",
          },
          {
            title: intl.formatMessage({ id: "months" }, { number: 4 }),
            dataIndex: "month_4",
          },
          {
            title: intl.formatMessage({ id: "months" }, { number: 5 }),
            dataIndex: "month_5",
          },
          {
            title: intl.formatMessage({ id: "months" }, { number: 6 }),
            dataIndex: "month_6",
          },
          {
            title: intl.formatMessage({ id: "months" }, { number: 7 }),
            dataIndex: "month_7",
          },
          {
            title: intl.formatMessage({ id: "months" }, { number: 8 }),
            dataIndex: "month_8",
          },
          {
            title: intl.formatMessage({ id: "months" }, { number: 9 }),
            dataIndex: "month_9",
          },
          {
            title: intl.formatMessage({ id: "months" }, { number: 10 }),
            dataIndex: "month_10",
          },
          {
            title: intl.formatMessage({ id: "months" }, { number: 11 }),
            dataIndex: "month_11",
          },
          {
            title: intl.formatMessage({ id: "months" }, { number: 12 }),
            dataIndex: "month_12",
          },
        ]}
      />
    </PageCard>
  );
};
