import { useRequest } from "ahooks";
import { DatePicker, notification, Select } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import statisticalReport from "service/statistical_report";
import { reportFilter } from "utils/index";

export const ByAgency: React.FC = () => {
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
          <div className="flex items-center gap-4 h-full">
            <Select
              size="large"
              defaultValue={"by_hcu_date"}
              options={[
                {
                  label: <FormattedMessage id="by_hcu_date" />,
                  value: "by_hcu_date",
                },
                {
                  label: <FormattedMessage id="by_ht_date" />,
                  value: "by_ht_date",
                },
              ]}
            />

            <DatePicker.RangePicker
              className="w-max"
              placeholder={[
                intl.formatMessage({ id: "select_start_date" }),
                intl.formatMessage({ id: "select_end_date" }),
              ]}
              size="large"
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
      <ITable
        className="p-0 remove-padding-table"
        columns={[
          {
            title: intl.formatMessage({ id: "case" }),
            dataIndex: "case",
            render: (value) => {
              return <p className="text-primary-700 font-bold">{value}</p>;
            },
          },
          {
            title: intl.formatMessage({ id: "general_pirority" }),
            dataIndex: "general",
          },
          {
            title: intl.formatMessage({ id: "cfs_score" }),
            dataIndex: "cfs",
          },
          {
            title: intl.formatMessage({ id: "ou" }),
            dataIndex: "ou",
          },
          {
            title: intl.formatMessage({ id: "hcu_date" }),
            dataIndex: "hcu_date",
            render: (value: any) => {
              return <FormattedMessage id={value} />;
            },
          },
          {
            title: intl.formatMessage({ id: "medical_history" }),
            dataIndex: "medical_history",
          },
          {
            title: intl.formatMessage({ id: "functional_impairment" }),
            dataIndex: "cfs",
          },
          {
            title: intl.formatMessage({ id: "social_psychological_change" }),
            dataIndex: "social_psychological_change",
          },
          {
            title: intl.formatMessage({ id: "socio_economic_difficulties" }),
            dataIndex: "socio_economic_difficulties",
          },
          {
            title: intl.formatMessage({ id: "health_risks" }),
            dataIndex: "health_risks",
          },
          {
            title: intl.formatMessage({ id: "care_foci" }),
            dataIndex: "care_foci",
          },
          {
            title: intl.formatMessage({ id: "care_foci_percent" }),
            dataIndex: "care_foci_percent",
          },
          {
            title: intl.formatMessage({ id: "date_entered_by_pt" }),
            dataIndex: "date_entered_by_pt",
          },
          {
            title: intl.formatMessage({ id: "result_plan" }),
            dataIndex: "result_plan",
          },
          {
            title: intl.formatMessage({ id: "result" }),
            dataIndex: "result",
          },
          {
            title: intl.formatMessage({ id: "result_percent" }),
            dataIndex: "result_percent",
          },
        ]}
      />
    </PageCard>
  );
};
