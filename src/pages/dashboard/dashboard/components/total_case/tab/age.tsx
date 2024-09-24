import { Pie, PieConfig } from "@ant-design/plots";

// const data = [
//   { type: "54- доош", value: 10 },
//   { type: "55-59", value: 20 },
//   { type: "60-64", value: 10 },
//   { type: "64-69", value: 30 },
//   { type: "70-74", value: 10 },
//   { type: "75 дээш", value: 20 },
// ];

interface AgeProps {
  data: { [key: string]: number };
}

export const Age: React.FC<AgeProps> = ({ data }) => {
  const graphData = Object.keys(data).map((key) => {
    return {
      type: key,
      value: data[key],
    };
  });
  const config: PieConfig = {
    data: graphData,
    angleField: "value",
    colorField: "type",
    innerRadius: 0.7,
    radius: 0.9,
    label: {
      text: (d: any) => `${d.type}`,
      position: "spider",
    },
    legend: {
      color: {
        position: "bottom",
        rowPadding: 10,
        itemSpacing: 10,
      },
    },
  };
  return (
    <div>
      <Pie {...config} height={200} width={350} />
    </div>
  );
};
