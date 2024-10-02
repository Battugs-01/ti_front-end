import { StarFilled } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { DatePicker, notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import statisticalReport from "service/statistical_report";
import { ManagementReportType } from "service/statistical_report/type";
import { reportFilter } from "utils/index";

export const ManagementReport: React.FC = () => {
  const intl = useIntl();
  const [filter, setFilter] = useState(reportFilter);

  const list = useRequest(statisticalReport.managementReportList, {
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
        hideSearch
        hideCreate
        refresh={refreshList}
      />
      <ITable<ManagementReportType>
        className="remove-padding-table"
        dataSource={list?.data}
        columns={[
          {
            title: <FormattedMessage id="name" />,
            dataIndex: "first_name",
          },
          {
            title: <FormattedMessage id="position" />,
            dataIndex: "role",
            render: (value: any) => {
              return (
                <div>
                  <FormattedMessage id={value} />
                </div>
              );
            },
          },
          {
            title: <FormattedMessage id="level" values={{ number: "1" }} />,
            dataIndex: "level1",
          },
          {
            title: <FormattedMessage id="level" values={{ number: "2" }} />,
            dataIndex: "level2",
          },
          {
            title: <FormattedMessage id="level" values={{ number: "3" }} />,
            dataIndex: "level3",
          },
          {
            title: <FormattedMessage id="total" />,
            dataIndex: "total",
            render: (_, record) => {
              return record?.level1 + record?.level2 + record?.level3;
            },
          },
          {
            title: <FormattedMessage id="rating" />,
            dataIndex: "rate",
            render: (value) => {
              return (
                <div className="flex items-center gap-2">
                  <StarFilled rev={undefined} className="text-yellow-400" />
                  <div>{Number(value)?.toFixed(1)}</div>
                </div>
              );
            },
          },
        ]}
      />
    </PageCard>
  );
};
