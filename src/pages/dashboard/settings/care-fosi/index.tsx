import { Flex } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";

const CareFosi: React.FC = () => {
  return (
    <Flex vertical gap="large">
      <PageCard xR>
        <InitTableHeader hideCreate customHeaderTitle="Functional" />
        <ITable
          className="p-0 remove-padding-table"
          columns={[
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Min. value",
              dataIndex: "min-value",
            },
            {
              title: "Max. value",
              dataIndex: "max-value",
            },
          ]}
        />
      </PageCard>
      <PageCard xR>
        <InitTableHeader hideCreate customHeaderTitle="Psycho-emotional" />
        <ITable
          className="p-0 remove-padding-table"
          columns={[
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Min. value",
              dataIndex: "min-value",
            },
            {
              title: "Max. value",
              dataIndex: "max-value",
            },
          ]}
        />
      </PageCard>
      <PageCard xR>
        <InitTableHeader hideCreate customHeaderTitle="Socio-economic" />
        <ITable
          className="p-0 remove-padding-table"
          columns={[
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Min. value",
              dataIndex: "min-value",
            },
            {
              title: "Max. value",
              dataIndex: "max-value",
            },
          ]}
        />
      </PageCard>
      <PageCard xR>
        <InitTableHeader hideCreate customHeaderTitle="Clinical" />
        <ITable
          className="p-0 remove-padding-table"
          columns={[
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Min. value",
              dataIndex: "min-value",
            },
            {
              title: "Max. value",
              dataIndex: "max-value",
            },
          ]}
        />
      </PageCard>
    </Flex>
  );
};

export default CareFosi;
