import { Flex, Radio } from "antd";
import { PageCard } from "components/card";
import { ExportButton } from "components/index";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import { exportFromTable } from "utils/export";

const Statistical: React.FC = () => {
  return (
    <Flex vertical gap="large">
      <PageCard xR>
        <InitTableHeader
          customHeaderTitle="Active aging programs"
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
