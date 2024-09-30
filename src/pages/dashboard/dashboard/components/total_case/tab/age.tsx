import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const colorMapping: { [key: string]: string } = {
  "-54": "#86CB3C",
  "55-59": "#6E86FF",
  "60-64": "#36BFFA",
  "64-69": "#22CCEE",
  "70-74": "#FDB022",
  "+75": "#F670C7",
};

interface AgeProps {
  data: { [key: string]: number };
}

export const Age: React.FC<AgeProps> = ({ data }) => {
  const graphData = Object.keys(data).map((key) => {
    return {
      name: key,
      value: data[key],
      color: colorMapping[key],
    };
  });

  return (
    <div>
      <PieChart width={350} height={350}>
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
        <Tooltip />
        <Legend
          iconSize={10}
          payload={graphData.map((item) => ({
            value: `${item.name}`,
            type: "circle",
            color: item.color,
          }))}
        />
      </PieChart>
    </div>
  );
};
