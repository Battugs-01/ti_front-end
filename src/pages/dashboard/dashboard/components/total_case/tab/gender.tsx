import { useIntl } from "react-intl";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
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
      <ResponsiveContainer width="100%" height={350}>
        <PieChart height={350}>
          <Pie
            data={graphData}
            cx="50%"
            cy="50%"
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
            style={{
              margin: "auto",
            }}
            payload={graphData.map((item) => ({
              value: `${item.type}`,
              color: item.color,
            }))}
          />
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length) {
                const { type, value } = payload[0].payload;
                return (
                  <div className="bg-white p-2 border border-solid border-gray-200">
                    {type} - {value}
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
