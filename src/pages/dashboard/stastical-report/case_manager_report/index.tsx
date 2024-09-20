import { useRequest } from "ahooks";
import { DatePicker, notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import statisticalReport from "service/statistical_report";
import { reportFilter } from "utils/index";

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
          <DatePicker.RangePicker
            className="w-max"
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
            title: intl.formatMessage({ id: "age" }),
            dataIndex: "age",
          },
          {
            title: intl.formatMessage({ id: "register" }),
            dataIndex: "rd",
          },
          {
            title: intl.formatMessage({ id: "phone" }),
            dataIndex: "phone",
          },
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
          },
          {
            title: intl.formatMessage({ id: "cfs" }),
            dataIndex: "cfs",
          },
          {
            title: intl.formatMessage({ id: "risk_level" }),
            dataIndex: "risk_level",
          },
          {
            title: intl.formatMessage({ id: "cfs_date" }),
            dataIndex: "cfs_date",
          },
          {
            title: intl.formatMessage({ id: "development_plan" }),
            dataIndex: "development_plan",
          },
          {
            title: intl.formatMessage({ id: "agency" }),
            dataIndex: "agency",
          },
          {
            title: intl.formatMessage({ id: "total_assessment" }),
            dataIndex: "total_assessment",
          },
          {
            title: intl.formatMessage({ id: "list_assessment_date" }),
            dataIndex: "list_assessment_date",
          },
          {
            title: intl.formatMessage({ id: "caregiver" }),
            dataIndex: "caregiver",
          },
          {
            title: intl.formatMessage({ id: "person_in_charge" }),
            dataIndex: "person_in_charge",
          },
        ]}
      />
    </PageCard>
  );
};
