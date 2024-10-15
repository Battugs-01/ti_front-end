import { useRequest } from "ahooks";
import { DatePicker, notification } from "antd";
import IBadge from "components/badge";
import LevelBadge from "components/badge/level";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import statisticalReport from "service/statistical_report";
import { CaseManagerReportType } from "service/statistical_report/type";
import {
  parseMongolianGender,
  parseMongolianID,
  reportFilter,
} from "utils/index";

export const CaseManagerReport: React.FC = () => {
  const intl = useIntl();
  const [filter, setFilter] = useState(reportFilter);

  const list = useRequest(statisticalReport.casemanagerReportList, {
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
        fileName="case_manager_report"
        refresh={refreshList}
      />
      <ITable<CaseManagerReportType>
        loading={list.loading}
        className="p-0 remove-padding-table"
        dataSource={list?.data?.items || []}
        hideAction
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
            width: 50,
            align: "center",
            render: (_: any, record): React.ReactNode => (
              <div className="flex items-center justify-center">
                {parseMongolianID(record?.rd)}
              </div>
            ),
          },
          {
            title: intl.formatMessage({ id: "register" }),
            dataIndex: "rd",
            render: (value) => {
              return <p className="uppercase">{value}</p>;
            },
          },
          {
            title: intl.formatMessage({ id: "gender" }),
            dataIndex: "gender",
            width: 80,
            render: (_: any, record): any => {
              const gender = parseMongolianGender(record?.rd);
              return (
                <div className="flex items-center justify-center">
                  {gender === "male"
                    ? intl.formatMessage({ id: "male" })
                    : intl.formatMessage({ id: "female" })}
                </div>
              );
            },
          },
          {
            title: intl.formatMessage({ id: "cfs_score" }),
            dataIndex: "cfs_score",
            align: "center",
            render: (_, record) => {
              return (
                <p className="text-[#98A2B3]">
                  <span
                    className={`${
                      record?.assessment?.cfs_point > 6
                        ? "text-[#D92D20]"
                        : "text-primary-700"
                    }  font-bold`}
                  >
                    {record?.assessment?.cfs_point}
                  </span>{" "}
                  / 9
                </p>
              );
            },
          },
          {
            title: intl.formatMessage({ id: "cfs" }),
            dataIndex: "cfs",
            render: (_, record) => {
              return <p>{record?.assessment?.total || "-"}</p>;
            },
          },
          {
            title: intl.formatMessage({ id: "level_filter" }),
            dataIndex: "level",
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
                <p>
                  {dayjs(record?.assessment?.date).format("YYYY/MM/DD HH:mm")}
                </p>
              );
            },
          },
          {
            title: intl.formatMessage({ id: "count_comp_ass" }),
            dataIndex: "count_comp_ass",
            render: (_, record) => {
              return <div>{record?.assessment?.count_comp_ass || "-"}</div>;
            },
          },
          {
            title: intl.formatMessage({ id: "by_hcu_date" }),
            dataIndex: "hcu_date",
            render: (_, record) => {
              if (
                record?.assessment?.date_comp_ass.toString() ===
                "0001-01-01T00:00:00Z"
              ) {
                return "-";
              }
              return (
                <div>
                  {dayjs(record?.assessment?.date_comp_ass).format(
                    "YYYY/MM/DD HH:mm"
                  ) || "-"}
                </div>
              );
            },
          },
          {
            title: intl.formatMessage({ id: "hcu_state" }),
            dataIndex: "is_temporary",
            align: "center",
            width: 130,
            render: (_: any, record): React.ReactNode => {
              if (record?.assessment?.level === "level_3") {
                if (record?.assessment?.is_temporary) {
                  return (
                    <IBadge
                      title={<FormattedMessage id="state_incomplete" />}
                      color="yellow"
                    />
                  );
                }
                return (
                  <IBadge
                    title={<FormattedMessage id="state_complete" />}
                    color="green"
                  />
                );
              } else {
                return <div>-</div>;
              }
            },
          },
          {
            title: intl.formatMessage({ id: "development_plan" }),
            dataIndex: "development_plan",
            align: "center",
            render: (_, record) => {
              if (record?.assessment?.developer_plan) {
                return (
                  <IBadge
                    color="green"
                    title={intl.formatMessage({ id: "entered" })}
                  />
                );
              }
              return (
                <IBadge
                  color="gray"
                  title={intl.formatMessage({ id: "not_entered" })}
                />
              );
            },
          },
          {
            title: intl.formatMessage({ id: "priority" }),
            dataIndex: "pirority",
            align: "center",
            render: (_, record) => {
              switch (record?.assessment?.priority) {
                case "high":
                  return (
                    <IBadge
                      title={<FormattedMessage id="high" />}
                      color="red"
                    />
                  );
                case "medium":
                  return (
                    <IBadge
                      title={<FormattedMessage id="medium" />}
                      color="yellow"
                    />
                  );
                case "low":
                  return (
                    <IBadge
                      title={<FormattedMessage id="low" />}
                      color="green"
                    />
                  );
                default:
                  return "-";
              }
            },
          },
        ]}
      />
    </PageCard>
  );
};
