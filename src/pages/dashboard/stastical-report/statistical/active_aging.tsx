import { useRequest } from "ahooks";
import { notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import statisticalReport from "service/statistical_report";
import { initFilter } from "utils/index";

export const ActiveAging: React.FC = () => {
  const intl = useIntl();
  const [filter, setFilter] = useState(initFilter);

  const activeAgingList = useRequest(statisticalReport.activeAgingList, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: intl.formatMessage({ id: "success" }),
      });
    },
    onError: (err) => {
      notification.error({
        message: err,
      });
    },
  });

  useEffect(() => {
    activeAgingList.run({
      ...filter,
    });
  }, [filter]);
  const refreshList = () => {
    activeAgingList?.run({
      ...filter,
    });
  };
  return (
    <PageCard xR>
      <InitTableHeader
        customHeaderTitle="Active aging programs"
        hideCreate
        refresh={refreshList}
      />
      <ITable
        className="p-0 remove-padding-table"
        columns={[
          {
            title: "Name",
            dataIndex: "name",
          },
          {
            title: "Threshold",
            dataIndex: "threshold",
          },
          {
            title: "Month 1",
            dataIndex: "month_1",
          },
          {
            title: "Month 2",
            dataIndex: "month_2",
          },
          {
            title: "Month 12",
            dataIndex: "month_12",
          },
          {
            title: "YTD",
            dataIndex: "ytd",
          },
          {
            title: "Monthly average",
            dataIndex: "monthly_average",
          },
        ]}
      />
    </PageCard>
  );
};
