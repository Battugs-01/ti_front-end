import { useRequest } from "ahooks";
import { DatePicker, notification } from "antd";
import LevelBadge from "components/badge/level";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import statisticalReport from "service/statistical_report";
import { reportFilterYear } from "utils/index";

export const AgeAndGender: React.FC = () => {
  const intl = useIntl();
  const [filter, setFilter] = useState(reportFilterYear);

  const list = useRequest(statisticalReport.statisticalReportAge, {
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
          <DatePicker
            className="w-max"
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
        }
        hideCreate
        refresh={refreshList}
      />
      <ITable
        className="p-0 remove-padding-table"
        hidePagination
        columns={[
          {
            title: intl.formatMessage({ id: "levels" }),
            dataIndex: "level",
            render: (value: any) => {
              return <LevelBadge status={value} />;
            },
          },
          {
            title: intl.formatMessage({ id: "age" }),
            dataIndex: "age",
          },
          {
            title: intl.formatMessage({ id: "gender" }),
            children: [
              {
                title: intl.formatMessage({ id: "male" }),
                dataIndex: "male",
              },
              {
                title: intl.formatMessage({ id: "male" }),
                dataIndex: "percent",
              },
              {
                title: intl.formatMessage({ id: "female" }),
                dataIndex: "female",
              },
              {
                title: intl.formatMessage({ id: "percent" }),
                dataIndex: "percent",
              },
            ],
          },
          {
            title: intl.formatMessage({ id: "total_point" }, { number: 3 }),
            dataIndex: "total_point",
          },
          {
            title: intl.formatMessage({ id: "total_level_percent" }),
            dataIndex: "total_level_procent",
          },
          {
            title: intl.formatMessage({ id: "total_percent" }),
            dataIndex: "total_precent",
          },
        ]}
      />
    </PageCard>
  );
};
