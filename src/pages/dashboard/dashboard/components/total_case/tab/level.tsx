import { Pie } from "@ant-design/plots";
import { Table } from "antd";
import { DashboardLevel } from "components/badge/dashboard_level";
import { GenderBadge } from "components/badge/gender";
import { FormattedMessage, useIntl } from "react-intl";
import { Levels } from "service/dashboard/type";

interface LevelProps {
  data: Levels[];
}

export const Level: React.FC<LevelProps> = ({ data }) => {
  const intl = useIntl();
  const config = {
    data: data.map((item) => {
      return {
        type: intl.formatMessage({ id: item.name }),
        value: item.percent,
      };
    }),
    angleField: "value",
    colorField: "type",
    innerRadius: 0.55,
    radius: 0.7,
    label: {
      text: (d: any) => `${d.type}`,
      position: "spider",
    },
    legend: null,
  };
  return (
    <div>
      <Pie {...config} height={200} width={350} />
      <Table
        className="p-4"
        dataSource={data}
        pagination={false}
        columns={[
          {
            title: <FormattedMessage id="levels" />,
            dataIndex: "name",
            width: "40%",
            render: (value) => {
              return <DashboardLevel status={value} />;
            },
          },
          {
            title: <FormattedMessage id="male" />,
            dataIndex: "male_percent",
            width: "30%",
            render: (value) => {
              return <GenderBadge status="male" percent={parseInt(value)} />;
            },
          },
          {
            title: <FormattedMessage id="female" />,
            dataIndex: "female_percent",
            width: "30%",
            render: (value) => {
              return <GenderBadge status="female" percent={parseInt(value)} />;
            },
          },
        ]}
      />
    </div>
  );
};
