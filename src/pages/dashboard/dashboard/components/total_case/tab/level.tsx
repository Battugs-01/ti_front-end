import { Pie } from "@ant-design/plots";
import { Badge, Table } from "antd";
import { DashboardLevel } from "components/badge/dashboard_level";
import { GenderBadge } from "components/badge/gender";
import LevelBadge from "components/badge/level";
import { FormattedMessage } from "react-intl";
import { Levels } from "service/dashboard/type";

// const data = [
//   { type: "33%", value: 30 },
//   { type: "32%", value: 30 },
//   { type: "31%", value: 30 },
// ];

interface LevelProps {
  data: Levels[];
}

export const Level: React.FC<LevelProps> = ({ data }) => {
  console.log(data, "data");
  const config = {
    data: data.map((item) => {
      return {
        type: item.name,
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
