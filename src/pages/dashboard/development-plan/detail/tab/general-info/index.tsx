import { Area } from "@ant-design/plots";
import { Divider, Radio, Table } from "antd";
import { DevelopmentPlanGraphTab } from "config";
import { useState } from "react";
import { Info } from "../../components/collapsed-info";
import { FormattedMessage, useIntl } from "react-intl";
import { useLocation } from "react-router-dom";
import { useRequest } from "ahooks";
import screenList from "service/screening_list";
import IBadge from "components/badge";

const GeneralInfo: React.FC = () => {
  const location = useLocation();
  const assessmentId = location.search.split("=")[1];
  const intl = useIntl();
  const assessment = useRequest(() =>
    screenList.assessmentDetail(assessmentId)
  );

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
      {assessment.data?.map((val, index) => {
        return (
          <Info
            key={index}
            title={<FormattedMessage id="screening_assessment" />}
            className="mb-4"
            data={val}
          >
            <div className="font-semibold mb-4 text-lg text-gray-700">
              Screening Assessment Detail
            </div>
            <Table
              pagination={false}
              dataSource={val?.questions}
              className="p-0 remove-padding-table"
              columns={[
                {
                  title: "№",
                  align: "center",
                  width: 60,
                  render: (_, __, index) => <div>{index + 1}</div>,
                },
                {
                  title: intl.formatMessage({ id: "name" }),
                  dataIndex: "name",
                  align: "left",
                  render: (_, record) => (
                    <span className="text-sm text-[#475467] font-normal flex">
                      {record?.question?.title || "-"}
                    </span>
                  ),
                },
                {
                  title: intl.formatMessage({ id: "answer" }),
                  width: 100,
                  align: "center",
                  dataIndex: "answer",
                  render: (value) => (
                    <span className="text-sm text-[#475467] font-normal  text-center">
                      {value ? (
                        <IBadge
                          title={<FormattedMessage id="yes" />}
                          color="red"
                        />
                      ) : (
                        <IBadge title={<FormattedMessage id="no" />} />
                      )}
                    </span>
                  ),
                },
              ]}
            />
          </Info>
        );
      })}
      {/* <Info
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
      </Info> */}
    </div>
  );
};

export default GeneralInfo;
