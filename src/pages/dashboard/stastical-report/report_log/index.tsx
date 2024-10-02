import { useRequest } from "ahooks";
import { DatePicker, notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import statisticalReport from "service/statistical_report";
import { initFilter } from "utils/index";

export const ReportLog: React.FC = () => {
  const intl = useIntl();
  const [filter, setFilter] = useState(initFilter);

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
          <DatePicker.RangePicker
            className="w-max"
            placeholder={[
              intl.formatMessage({ id: "select_start_date" }),
              intl.formatMessage({ id: "select_end_date" }),
            ]}
            onChange={(values) => {
              console.log(values);
            }}
          />
        }
        hideCreate
        refresh={refreshList}
      />
      <ITable
        className="p-0 remove-padding-table"
        columns={[
          {
            title: intl.formatMessage({ id: "name" }),
            dataIndex: "first_name",
            render: (value) => {
              return <p className="text-primary-700 font-bold">{value}</p>;
            },
          },
          {
            title: intl.formatMessage({ id: "position" }),
            dataIndex: "position",
          },
          {
            title: intl.formatMessage({ id: "date" }),
            dataIndex: "date",
          },
          {
            title: intl.formatMessage({ id: "method" }),
            dataIndex: "method",
          },
          {
            title: intl.formatMessage({ id: "changes_made" }),
            dataIndex: "changes_made",
            render: (value: any) => {
              return <FormattedMessage id={value} />;
            },
          },
          {
            title: intl.formatMessage({ id: "changes" }),
            dataIndex: "changes",
          },
        ]}
      />
    </PageCard>
  );
};
