import { Table } from "antd";
import { DashboardLevel } from "components/badge/dashboard_level";
import { GenderBadge } from "components/badge/gender";
import { FormattedMessage, useIntl } from "react-intl";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
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
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={customData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={75}
            dataKey="percent"
            label={({ percent }) => `${percent.toFixed(0)}%`}
          >
            {customData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry?.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length) {
                const { name, percent } = payload[0].payload;
                return (
                  <div className="bg-white p-2 border border-solid border-gray-200">
                    {name} : {percent.toFixed(0)}%
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
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
