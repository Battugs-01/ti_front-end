import { Area } from "@ant-design/plots";
import { Divider, Radio } from "antd";
import { DevelopmentPlanGraphTab } from "config";
import { useState } from "react";
import { Info } from "../../components/collapsed-info";
import { ITable } from "components/index";
import { FormattedMessage } from "react-intl";

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
        strokeWidth: 2,
      },
    },
  };
  return (
    <div>
      <h2>
        <FormattedMessage id="score_list" />
      </h2>
      <Radio.Group
        defaultValue={DevelopmentPlanGraphTab.mini_cog}
        size="large"
        onChange={(e) => {
          setTab(e.target.value);
        }}
        className="mb-6"
      >
        <Radio.Button value={DevelopmentPlanGraphTab.mini_cog}>
          <FormattedMessage id="mini_cog" />
        </Radio.Button>
        <Radio.Button value={DevelopmentPlanGraphTab.gds}>
          <FormattedMessage id="gds" />
        </Radio.Button>
        <Radio.Button value={DevelopmentPlanGraphTab.barthel}>
          <FormattedMessage id="barthel_index" />
        </Radio.Button>
      </Radio.Group>
      <Area {...config} />
      <Divider />
      <Info
        title={<FormattedMessage id="screening_assessment" />}
        className="mb-4"
      >
        <div className="font-semibold mb-4 text-lg text-gray-700">
          Screening Assessment Detail
        </div>
        <ITable
          className="p-0 remove-padding-table"
          columns={[
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Answer",
              dataIndex: "answer",
            },
          ]}
        />
      </Info>
      <Info title={"Comprehensive Needs Assessment"}>
        <div className="font-semibold mb-4 text-lg text-gray-800">
          Comprehensive Needs Assessment Detail
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <div className="text-lg font-semibold text-gray-800 mb-4">
              Functional
            </div>
            <ITable
              className="p-0 remove-padding-table"
              columns={[
                {
                  title: "Name",
                  dataIndex: "name",
                },
                {
                  title: "Normal value",
                  dataIndex: "normal_value",
                },
                {
                  title: "Assessment value",
                  dataIndex: "assessment_value",
                },
              ]}
            />
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-800 mb-4">
              Psycho-emotional
            </div>
            <ITable
              className="p-0 remove-padding-table"
              columns={[
                {
                  title: "Name",
                  dataIndex: "name",
                },
                {
                  title: "Normal value",
                  dataIndex: "normal_value",
                },
                {
                  title: "Assessment value",
                  dataIndex: "assessment_value",
                },
              ]}
            />
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-800 mb-4">
              Socio-economic
            </div>
            <ITable
              className="p-0 remove-padding-table"
              columns={[
                {
                  title: "Name",
                  dataIndex: "name",
                },
                {
                  title: "Normal value",
                  dataIndex: "normal_value",
                },
                {
                  title: "Assessment value",
                  dataIndex: "assessment_value",
                },
              ]}
            />
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-800 mb-4">
              Clinical
            </div>
            <ITable
              className="p-0 remove-padding-table"
              columns={[
                {
                  title: "Name",
                  dataIndex: "name",
                },
                {
                  title: "Normal value",
                  dataIndex: "normal_value",
                },
                {
                  title: "Assessment value",
                  dataIndex: "assessment_value",
                },
              ]}
            />
          </div>
        </div>
      </Info>
    </div>
  );
};

export default GeneralInfo;
