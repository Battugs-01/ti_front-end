import { Pie } from "@ant-design/charts";
import { useIntl } from "react-intl";
import { Sex } from "service/dashboard/type";

interface GenderProps {
  data?: Sex;
}

export const Gender: React.FC<GenderProps> = ({ data }) => {
  const intl = useIntl();
  const graphData = [
    { type: intl.formatMessage({ id: "male" }), value: data?.male },
    { type: intl.formatMessage({ id: "female" }), value: data?.female },
  ];
  const config = {
    data: graphData,
    angleField: "value",
    colorField: "type",
    innerRadius: 0.8,
    radius: 1,
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
      <Pie {...config} height={180} width={350} />
    </div>
  );
};
