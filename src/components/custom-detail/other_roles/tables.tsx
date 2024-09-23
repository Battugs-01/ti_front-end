import { PageLoading } from "@ant-design/pro-layout";
import { ProColumns } from "@ant-design/pro-table";
import DownButton from "assets/img/down_button.svg";
import UpButton from "assets/img/up_button.svg";
import BooleanBadge from "components/badge/boolean";
import OtherBadge from "components/badge/other";
import { ITable } from "components/index";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { CareFociItemElement } from "service/development_plan/type";
import { DevPlanQuistion } from "utils/dev_plan";

interface CareFociProps {
  data: CareFociItemElement[];
  name: string;
  isEvaluated?: boolean;
}

const DevPlanTables: React.FC<CareFociProps> = ({
  name,
  data,
  isEvaluated,
}) => {
  const intl = useIntl();
  const [isSwitched, setIsSwitched] = useState(true);

  const columns: ProColumns<CareFociItemElement, any>[] | undefined = [
    {
      title: intl.formatMessage({ id: "question" }),
      dataIndex: "result",
      className: "text-left",
      width: 300,
      render: (_, record) => {
        return (
          <div className="flex items-center">
            {isEvaluated
              ? record?.customer_care_foci_item?.care_foci_item?.name
              : DevPlanQuistion(record?.key as string)}
          </div>
        );
      },
    },
    {
      title: intl.formatMessage({ id: isEvaluated ? "description" : "answer" }),
      dataIndex: "desc",
      width: 300,
      render: (value) => {
        return <div>{value}</div>;
      },
    },
    {
      title: intl.formatMessage({ id: "severity_syndrome" }),
      dataIndex: "severity_level",
      render: (value) => {
        return <div>{value}</div>;
      },
    },
    {
      title: intl.formatMessage({ id: "summary_plan" }),
      dataIndex: "summary_plan",
      render: (value) => {
        return <div>{value}</div>;
      },
    },
    {
      title: intl.formatMessage({ id: "time" }),
      dataIndex: "duration",
      render: (value) => {
        return <div>{value}</div>;
      },
    },
    {
      title: intl.formatMessage({ id: "responsible" }),
      dataIndex: "responsible",
      render: (value) => {
        return <div>{value}</div>;
      },
    },
    {
      title: intl.formatMessage({ id: "result" }),
      dataIndex: "result",
      render: (value) => {
        return <div>{value}</div>;
      },
    },
    {
      title: intl.formatMessage({ id: "is_resolved" }),
      dataIndex: "is_resolved",
      render: (value) => {
        return <OtherBadge status={value} />;
      },
    },
  ];
  if (isEvaluated) {
    columns.splice(1, 0, {
      title: intl.formatMessage({ id: "evaluation" }),
      dataIndex: "is_have",
      className: "text-left",
      render: (_, record) => {
        return (
          <BooleanBadge
            status={record?.customer_care_foci_item?.is_have ?? "N/A"}
          />
        );
      },
    });
  }

  if (!data) return <PageLoading />;
  return (
    <div>
      <div className="text-xl font-semibold flex flex-row gap-4 items-center">
        <img
          src={isSwitched ? UpButton : DownButton}
          alt="Down"
          className="cursor-pointer"
          onClick={() => setIsSwitched(!isSwitched)}
        />
        <FormattedMessage id={name} />
      </div>
      {isSwitched ? (
        <ITable
          className="p-0 remove-padding-table mt-4"
          dataSource={data}
          columns={columns}
          hidePagination
          scroll={{ x: 1000 }}
        />
      ) : null}
    </div>
  );
};

export default DevPlanTables;
