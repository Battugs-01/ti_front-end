import { Pie } from "@ant-design/plots";
import { Segmented, Table } from "antd";
import { ICard } from "components/card";
import { TotalCaseTab } from "config";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

const data = [
  { type: "33%", value: 30 },
  { type: "32%", value: 30 },
  { type: "31%", value: 30 },
];

export const TotalCase: React.FC = () => {
  const [tab, setTab] = useState<TotalCaseTab>(TotalCaseTab.level);
  const config = {
    data,
    angleField: "value",
    colorField: "type",
    innerRadius: 0.5,
    radius: 0.7,
    label: {
      text: (d: any) => `${d.type}\n ${d.value}`,
      position: "spider",
    },
    legend: null,
  };
  return (
    <ICard xR yR>
      <p className="px-5 text-xl font-semibold">
        <FormattedMessage id="total_case" />
      </p>
      <div className="text-center mb-3">
        <Segmented
          onChange={(value: any) => {
            setTab(value);
          }}
          options={[
            {
              label: <FormattedMessage id="levels" />,
              value: TotalCaseTab.level,
            },
            {
              label: <FormattedMessage id="age" />,
              value: TotalCaseTab.age,
            },
            {
              label: <FormattedMessage id="mandal" />,
              value: TotalCaseTab.gender,
            },
          ]}
          size="large"
        />
      </div>
      <Pie {...config} height={180} width={350} />
      <Table
        className="p-4"
        columns={[
          {
            title: <FormattedMessage id="levels" />,
            dataIndex: "level",
            key: "level",
          },
          {
            title: <FormattedMessage id="male" />,
            dataIndex: "male",
            key: "male",
          },
          {
            title: <FormattedMessage id="female" />,
            dataIndex: "female",
            key: "female",
          },
        ]}
      />
    </ICard>
  );
};
