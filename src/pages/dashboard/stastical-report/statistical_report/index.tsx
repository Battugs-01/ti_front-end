import { useRequest } from "ahooks";
import { DatePicker, notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import statisticalReport from "service/statistical_report";
import { initPagination } from "utils/index";

export const Statistical: React.FC = () => {
  const intl = useIntl();
  const [filter, setFilter] = useState(initPagination);

  const list = useRequest(statisticalReport.statisticalReportList, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err,
      });
    },
  });

  //   const statisticalData = useMemo(() => {
  //     return list.data?.filter((item)=>{
  //         return item.
  //     });
  //   }, [list.data]);

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
            title: intl.formatMessage({ id: "levels" }),
            dataIndex: "level",
            render: (value) => {
              return <p className="text-primary-700 font-bold">{value}</p>;
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
