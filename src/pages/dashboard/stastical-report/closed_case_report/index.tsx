import { useRequest } from "ahooks";
import { DatePicker, notification } from "antd";
import LevelBadge from "components/badge/level";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import statisticalReport from "service/statistical_report";
import { ClosedReportType } from "service/statistical_report/type";
import { reportFilter } from "utils/index";

export const ClosedCaseReport: React.FC = () => {
  const intl = useIntl();
  const [filter, setFilter] = useState(reportFilter);

  const list = useRequest(statisticalReport.closedReportList, {
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
  return (
    <PageCard xR>
      <InitTableHeader
        hideTitle
        leftContent={
          <div className="flex items-center h-full">
            <DatePicker.RangePicker
              className="w-max"
              size="large"
              placeholder={[
                intl.formatMessage({ id: "select_start_date" }),
                intl.formatMessage({ id: "select_end_date" }),
              ]}
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
        hideCreate
        hideSearch
        refresh={refreshList}
      />
      <ITable<ClosedReportType>
        className="p-0 remove-padding-table"
        dataSource={list?.data?.items}
        columns={[
          {
            title: intl.formatMessage({ id: "name" }),
            dataIndex: "first_name",
            render: (value) => {
              return <p className="text-primary-700 font-bold">{value}</p>;
            },
          },
          {
            title: intl.formatMessage({ id: "age" }),
            dataIndex: "age",
          },
          {
            title: intl.formatMessage({ id: "register" }),
            dataIndex: "rd",
          },
          // {
          //   title: intl.formatMessage({ id: "phone" }),
          //   dataIndex: "phone",
          // },
          {
            title: intl.formatMessage({ id: "gender" }),
            dataIndex: "gender",
            render: (value: any) => {
              return <FormattedMessage id={value} />;
            },
          },
          {
            title: intl.formatMessage({ id: "cfs_score" }),
            dataIndex: "cfs_score",
            render: (_, record) => {
              return (
                <div>
                  {record.assessment.cfs_point}{" "}
                  <span className="text-gray-400">/9</span>
                </div>
              );
            },
          },
          {
            title: intl.formatMessage({ id: "cfs" }),
            dataIndex: "cfs",
            render: (_, record) => {
              return <div>{record?.assessment?.total}</div>;
            },
          },
          {
            title: intl.formatMessage({ id: "risk_level" }),
            dataIndex: "risk_level",
            align: "center",
            render: (_, record) => {
              return <LevelBadge status={record?.assessment?.level} />;
            },
          },
          {
            title: intl.formatMessage({ id: "cfs_date" }),
            dataIndex: "cfs_date",
            render: (_, record) => {
              return (
                <div>
                  {dayjs(record?.assessment?.date).format("DD/MM/YYYY")}
                </div>
              );
            },
          },
          {
            title: intl.formatMessage({ id: "development_plan" }),
            dataIndex: "development_plan",
          },
          {
            title: intl.formatMessage({ id: "risk_level" }),
            dataIndex: "risk_level",
          },
          {
            title: intl.formatMessage({ id: "end_date" }),
            dataIndex: "end_date",
            render: (_, record) => {
              return (
                <div>
                  {dayjs(record?.development_plans?.[0]?.created_at).format(
                    "DD/MM/YYYY"
                  )}
                </div>
              );
            },
          },
          {
            title: intl.formatMessage({ id: "closed_date" }),
            dataIndex: "closed_date",
          },
          {
            title: intl.formatMessage({ id: "closed_employee" }),
            dataIndex: "closed_employee",
          },
          {
            title: intl.formatMessage({ id: "reason" }),
            dataIndex: "reason",
            render: (_, record) => {
              return <p>{record?.close?.reason}</p>;
            },
          },
        ]}
      />
    </PageCard>
  );
};
