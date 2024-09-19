import { PageCard } from "components/card";
import { AssessmentListType, Questions } from "service/screening_list/type";
import { ITable } from "..";
import { FormattedMessage, useIntl } from "react-intl";
import BooleanBadge from "components/badge/boolean";
import { Pie } from "@ant-design/plots";
import LevelBadge from "components/badge/level";

interface QuistionHistoryProps {
  selectedLevel: AssessmentListType;
}

const QuistionHistory: React.FC<QuistionHistoryProps> = ({ selectedLevel }) => {
  const intl = useIntl();

  const pieConfigData = [
    {
      type: "1",
      value: 9 - (selectedLevel?.cfs_point ?? 0),
    },
    {
      type: "2",
      value: selectedLevel?.cfs_point,
    },
  ];

  const config = {
    height: 120,
    angleField: "value",
    colorField: "type",
    autoFit: true,
    limitInPlot: true,
    innerRadius: 0.8,
    legend: false,
    annotations: [
      {
        type: "text",
        style: {
          text: `ДЭШ оноо\n${selectedLevel?.cfs_point} / 9`,
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 9,
          fontStyle: "bold",
        },
      },
    ],
    scale: {
      color: {
        palette: "custom",
        range: ["#E7EDEE", "#FF0000"],
      },
    },
    color: ["#E7EDEE", "#FF0000"],
  };

  return (
    <PageCard xR paddingRemove className="mt-0 pb-3">
      <div className="p-0 flex mt-0">
        <div className="w-[9%]">
          <Pie
            {...config}
            className="flex items-start justify-start"
            data={pieConfigData}
          />
        </div>
        <div className="text-xl font-semibold flex flex-col items-start justify-center gap-2">
          <FormattedMessage id="screening_history" />
          <LevelBadge status={selectedLevel?.level ?? ""} />
        </div>
      </div>
      <ITable<Questions>
        className=""
        dataSource={selectedLevel?.questions ?? []}
        columns={[
          {
            title: intl.formatMessage({ id: "name" }),
            dataIndex: "answer",
            render: (_, record) => {
              return <div>{record.question.title}</div>;
            },
          },
          {
            title: intl.formatMessage({ id: "answer" }),
            dataIndex: "answer",
            render: (_, record) => {
              return <BooleanBadge status={record?.answer} />;
            },
          },
        ]}
        hidePagination
        scroll={1000}
      />
    </PageCard>
  );
};

export default QuistionHistory;
