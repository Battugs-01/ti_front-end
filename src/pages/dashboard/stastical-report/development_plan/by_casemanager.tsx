import { useRequest } from "ahooks";
import { DatePicker, notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import statisticalReport from "service/statistical_report";
import { reportFilter } from "utils/index";

export const ByCaseManager: React.FC = () => {
  const intl = useIntl();
  const [filter, setFilter] = useState(reportFilter);

  const list = useRequest(statisticalReport.developmentPlanCase, {
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
        fileName="by_casemanager"
        refresh={refreshList}
      />
      <ITable
        className="p-0 remove-padding-table"
        columns={[
          {
            title: intl.formatMessage({ id: "person_charge" }),
            dataIndex: "person_charge",
          },
          {
            title: intl.formatMessage({ id: "case" }),
            dataIndex: "case",
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
            title: intl.formatMessage({ id: "age" }),
            dataIndex: "age",
          },
          {
            title: intl.formatMessage({ id: "development_plan_date" }),
            dataIndex: "hcu_date",
          },
          {
            title: intl.formatMessage({ id: "result_plan" }),
            dataIndex: "result_plan",
          },
          {
            title: intl.formatMessage({ id: "distributed" }),
            dataIndex: "distributed",
          },
          {
            title: intl.formatMessage({ id: "decided" }),
            dataIndex: "decided",
          },
        ]}
      />
    </PageCard>
  );
};
