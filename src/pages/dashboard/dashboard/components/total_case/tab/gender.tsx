import { useIntl } from "react-intl";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { Sex } from "service/dashboard/type";

interface GenderProps {
  data?: Sex;
}

export const Gender: React.FC<GenderProps> = ({ data }) => {
  const intl = useIntl();
  const graphData = [
    {
      type: intl.formatMessage({ id: "male" }),
      value: data?.male,
      color: "#2ED3B7",
    },
    {
      type: intl.formatMessage({ id: "female" }),
      value: data?.female,
      color: "#FD6F8E",
    },
  ];
  return (
    <div>
      <PieChart width={300} height={350}>
        <Pie
          data={graphData}
          cx={175}
          cy={140}
          innerRadius={60}
          outerRadius={75}
          dataKey="value"
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
        >
          {graphData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry?.color} />
          ))}
        </Pie>
        <Legend
          iconSize={10}
          iconType="circle"
          layout="vertical"
          payload={graphData.map((item) => ({
            value: `${item.type}`,
            color: item.color,
          }))}
        />
        <Tooltip />
      </PieChart>
    </div>
  );
};
