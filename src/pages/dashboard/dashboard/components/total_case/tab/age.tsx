import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const colorMapping: { [key: string]: string } = {
  "-54": "#A6CE39",
  "55-59": "#005DC7",
  "60-64": "#00A9FF",
  "64-69": "#FFCF20",
  "70-74": "#F39200",
  "+75": "#FF6FCF",
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
