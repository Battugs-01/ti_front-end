import { Flex } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import { ActiveAging } from "./active_aging";

const Statistical: React.FC = () => {
  return (
    <Flex vertical gap="large">
      <ActiveAging />
      <PageCard xR>
        <InitTableHeader
          customHeaderTitle="Case management"
          hideCreate
          hideSearch
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
    </Flex>
  );
};

export default Statistical;
