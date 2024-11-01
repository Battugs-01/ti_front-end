import { useRequest } from "ahooks";
import { DatePicker, notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/table";
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

  const isMn = localStorage.getItem("web.locale") === "mn";

  const refreshList = () => {
    list?.run({
      ...filter,
    });
  };

  const filteredData = useMemo(() => {
    return (
      list?.data?.flatMap((item) =>
        item.items.map((i, index) => ({
          group_name: item.name,
          group_name_en: item.name_en,
          name: i.name,
          name_en: i.name_en,
          count: item.items.length,
          key: index + 1,
          ...i.months.reduce(
            (acc: { [key: string]: any }, monthData, monthIndex) => {
              acc[`month_${monthIndex + 1}`] = monthData;
              return acc;
            },
            {}
          ),
        }))
      ) || []
    );
  }, [list.data]);

  return (
    <PageCard xR>
      <InitTableHeader
        hideTitle
        leftContent={
          <div className="flex items-center h-full">
            <DatePicker
              className="w-max"
              placeholder={intl.formatMessage({ id: "select_date" })}
              onChange={(values) => {
                setFilter({
                  ...filter,
                  year: dayjs(values?.toDate()).year(),
                });
              }}
              size="large"
              picker="year"
              defaultValue={filter.year ? dayjs().year(filter.year) : dayjs()}
            />
          </div>
        }
        hideCreate
        hideSearch
        fileName="care_foci_report"
        refresh={refreshList}
      />
      <ITable
        hideCounter
        hideAction
        hidePagination
        loading={list.loading}
        className="p-0 remove-padding-table"
        dataSource={filteredData}
        scroll={{ x: "max-content" }}
        columns={[
          {
            title: (
              <div className="pl-3"> {intl.formatMessage({ id: "group" })}</div>
            ),
            dataIndex: "group_name",
            width: 220,
            render: (value, record) => {
              return (
                <p className="px-3">{isMn ? value : record?.group_name_en}</p>
              );
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
            render: (value, record) => {
              return <p className="px-1">{isMn ? value : record?.name_en}</p>;
            },
          },
          {
            title: intl.formatMessage({ id: "month_1" }),
            dataIndex: "month_1",
          },
          {
            title: intl.formatMessage({ id: "month_2" }),
            dataIndex: "month_2",
          },
          {
            title: intl.formatMessage({ id: "month_3" }),
            dataIndex: "month_3",
          },
          {
            title: intl.formatMessage({ id: "month_4" }),
            dataIndex: "month_4",
          },
          {
            title: intl.formatMessage({ id: "month_5" }),
            dataIndex: "month_5",
          },
          {
            title: intl.formatMessage({ id: "month_6" }),
            dataIndex: "month_6",
          },
          {
            title: intl.formatMessage({ id: "month_7" }),
            dataIndex: "month_7",
          },
          {
            title: intl.formatMessage({ id: "month_8" }),
            dataIndex: "month_8",
          },
          {
            title: intl.formatMessage({ id: "month_9" }),
            dataIndex: "month_9",
          },
          {
            title: intl.formatMessage({ id: "month_10" }),
            dataIndex: "month_10",
          },
          {
            title: intl.formatMessage({ id: "month_11" }),
            dataIndex: "month_11",
          },
          {
            title: intl.formatMessage({ id: "month_12" }),
            dataIndex: "month_12",
          },
        ]}
      />
    </PageCard>
  );
};
