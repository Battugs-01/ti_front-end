import { useRequest } from "ahooks";
import { DatePicker, notification } from "antd";
import LevelBadge from "components/badge/level";
import LevelReport from "components/badge/level_report";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import statisticalReport from "service/statistical_report";
import { reportStatisticalFilterLevel } from "utils/index";

export const ByLevel: React.FC = () => {
  const intl = useIntl();
  const [filter, setFilter] = useState(reportStatisticalFilterLevel);

  const list = useRequest(statisticalReport.statisticalReportList, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err,
      });
    },
  });

  const statisticalData = useMemo(() => {
    const levels = 3;
    let result = [];

    for (let i = 1; i <= levels; i++) {
      let levelData: { [key: string]: any } = {};

      levelData = {
        level: `level${i}`,
      };
      list?.data?.forEach((item: any) => {
        levelData[`month_${item.month}`] = item[`level${i}`];
      });

      result.push(levelData);
    }
    return result;
  }, [list.data]);

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
  return (
    <PageCard xR>
      <InitTableHeader
        hideTitle
        leftContent={
          <div className="flex items-center h-full">
            <DatePicker
              className="w-max"
              size="large"
              placeholder={intl.formatMessage({ id: "select_date" })}
              onChange={(values) => {
                setFilter({
                  ...filter,
                  year: dayjs(values?.toDate()).year(),
                });
              }}
              picker="year"
              defaultValue={filter.year ? dayjs().year(filter.year) : dayjs()}
            />
          </div>
        }
        hideCreate
        hideSearch
        fileName="by_level"
        refresh={refreshList}
      />
      <ITable
        className="p-0 remove-padding-table"
        dataSource={statisticalData}
        loading={list?.loading}
        hideAction
        hidePagination
        columns={[
          {
            title: intl.formatMessage({ id: "levels" }),
            dataIndex: "level",
            align: "center",
            render: (value: any) => {
              return <LevelReport status={value} />;
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
