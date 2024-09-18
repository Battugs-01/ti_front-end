import { Area } from "@ant-design/plots";
import { PageCard } from "components/card";
import { FormattedMessage } from "react-intl";

export const TotalPoint: React.FC = () => {
  const config = {
    height: 300,
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/stocks.json",
      transform: [
        { type: "filter", callback: (d: any) => d.symbol === "GOOG" },
      ],
    },
    xField: (d: any) => new Date(d.date),
    yField: "price",
    style: {
      fill: "linear-gradient(-90deg, white 0%, #144E5A 100%)",
    },
    axis: {
      y: { labelFormatter: "~s" },
    },
    line: {
      style: {
        stroke: "#144E5A",
        strokeWidth: 2,
      },
    },
  };
  return (
    <PageCard xR yR>
      <p className="px-5 text-xl font-semibold">
        <FormattedMessage id="total_point" />
      </p>
      <Area {...config} />
    </PageCard>
  );
};
