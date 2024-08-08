import { Radio } from "antd";
import { DevelopmentPlanGraphTab } from "config";
import { useState } from "react";
import { Area } from "@ant-design/plots";

const GeneralInfo: React.FC = () => {
  const [tab, setTab] = useState<DevelopmentPlanGraphTab>(
    DevelopmentPlanGraphTab.mini_cog
  );
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
        strokeWidth: 4,
      },
    },
  };
  return (
    <div>
      <h2>Score list</h2>
      <Radio.Group
        defaultValue={DevelopmentPlanGraphTab.mini_cog}
        size="large"
        onChange={(e) => {
          setTab(e.target.value);
        }}
        className="mb-6"
      >
        <Radio.Button value={DevelopmentPlanGraphTab.mini_cog}>
          Mini-cog
        </Radio.Button>
        <Radio.Button value={DevelopmentPlanGraphTab.gds}>GDS</Radio.Button>
        <Radio.Button value={DevelopmentPlanGraphTab.barthel}>
          Barthel Index
        </Radio.Button>
      </Radio.Group>
      <Area {...config} />
    </div>
  );
};

export default GeneralInfo;
