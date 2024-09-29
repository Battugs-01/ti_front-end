import { Table } from "antd";
import { DashboardLevel } from "components/badge/dashboard_level";
import { GenderBadge } from "components/badge/gender";
import { FormattedMessage, useIntl } from "react-intl";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { Levels } from "service/dashboard/type";

interface LevelProps {
  data: Levels[];
}

const getColor = (name: string) => {
  switch (name) {
    case "level_1":
      return "#2ED3B7";
    case "level_2":
      return "#FDB022";
    case "level_3":
      return "#F97066";
  }
};

export const Level: React.FC<LevelProps> = ({ data }) => {
  const intl = useIntl();

  const customData = data?.map((item) => {
    return {
      name: intl.formatMessage({ id: item.name }),
      percent: item.percent,
      color: getColor(item.name),
    };
  });
  return (
    <div>
      <PieChart width={350} height={250}>
        <Pie
          data={customData}
          cx={175}
          cy={140}
          innerRadius={60}
          outerRadius={75}
          dataKey="percent"
          label={({ percent }) => `${percent.toFixed(0)}%`}
        >
          {customData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry?.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
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
