import { useRequest } from "ahooks";
import { DatePicker, notification } from "antd";
import IBadge from "components/badge";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import statisticalReport from "service/statistical_report";
import { ArrowRight } from "untitledui-js-base";
import { reportFilter } from "utils/index";

export const ReportLog: React.FC = () => {
  const intl = useIntl();
  const [filter, setFilter] = useState(reportFilter);

  const list = useRequest(statisticalReport.reportLogList, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err,
      });
    },
  });

  // Object.keys(JSON.parse(before)).map((key) => {
  //   if (before[key] != after[key]) {
  //   }
  // });

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
        fileName="Log Report"
        hideCreate
        hideSearch
        refresh={refreshList}
      />
      <ITable
        className="p-0 remove-padding-table"
        hideAction
        loading={list.loading}
        dataSource={list?.data?.items}
        columns={[
          {
            title: intl.formatMessage({ id: "name" }),
            dataIndex: "employee",
            render: (_, record) => {
              return <div>{record?.employee?.first_name}</div>;
            },
          },
          {
            title: intl.formatMessage({ id: "position" }),
            dataIndex: "position",
            render: (_, record) => {
              return <div>{record?.employee?.role}</div>;
            },
          },
          {
            title: intl.formatMessage({ id: "date" }),
            dataIndex: "date",
            render: (_, record) => {
              return (
                <div>{dayjs(record?.created_at).format("YYYY/MM/DD")}</div>
              );
            },
          },
          {
            title: intl.formatMessage({ id: "method" }),
            dataIndex: "action1",
            render: (_, record) => {
              return <div>{record?.action}</div>;
            },
          },
          {
            title: intl.formatMessage({ id: "changes" }),
            dataIndex: "changes",
            width: 800,
            render: (_, record) => {
              return (
                <div className="flex items-center flex-wrap gap-2">
                  {Object.keys(JSON.parse(record?.before)).map((key) => {
                    if (
                      JSON.parse(record?.before)[key] !==
                      JSON.parse(record?.after)[key]
                    ) {
                      if (typeof JSON.parse(record?.before)[key] !== "object") {
                        return (
                          <IBadge
                            color="gray"
                            title={
                              <div className="flex items-center gap-2">
                                <div>{JSON.parse(record?.before)[key]}</div>
                                <ArrowRight size="12" />
                                <div>{JSON.parse(record?.after)[key]}</div>
                                <div>
                                  <FormattedMessage id="change" />
                                </div>
                              </div>
                            }
                          />
                        );
                      }
                    }
                  })}
                </div>
              );
            },
          },
        ]}
      />
    </PageCard>
  );
};
