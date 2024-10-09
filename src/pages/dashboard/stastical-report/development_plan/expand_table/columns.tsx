// DevPlanColumns.tsx
import { ProColumns } from "@ant-design/pro-table";
import { Avatar } from "antd";
import IBadge from "components/badge";
import SeverityLevelBadge from "components/badge/severity_level_badge";
import { useIntl } from "react-intl";
import { CareFociItemElement } from "service/development_plan/type";
import file from "service/file";
import { DevPlanQuistion } from "utils/dev_plan";

interface DevPlanColumnsReportProps {
  dataSource: CareFociItemElement[];
  isEvaluated?: boolean;
}

const DevPlanColumnsReport = ({
  dataSource,
  isEvaluated,
}: DevPlanColumnsReportProps): ProColumns<CareFociItemElement>[] => {
  const intl = useIntl();

  const columns: ProColumns<CareFociItemElement>[] = [
    {
      title: "№",
      align: "center",
      width: 50,
      fixed: "left",
      dataIndex: "index",
      valueType: "index",
      className: "text-gray-600",
      render: (_value, _record, index) =>
        index + 1 + (Array.isArray(dataSource) ? 0 : dataSource.length),
    },
    {
      title: intl.formatMessage({ id: "question" }),
      dataIndex: "result",
      className: "text-left",
      width: 220,
      editable: false,
      render: (_, record) => (
        <div className="flex items-center ">
          {isEvaluated
            ? record?.customer_care_foci_item?.care_foci_item?.name
            : DevPlanQuistion(record?.key as string)}
        </div>
      ),
    },
    {
      title: intl.formatMessage({ id: isEvaluated ? "description" : "answer" }),
      dataIndex: "desc",
      editable: false,
      render: (value, record) => (
        <div className="flex items-center ">
          {isEvaluated ? record?.care_foci_desc || "-" : value || "-"}
        </div>
      ),
    },
    {
      title: intl.formatMessage({ id: "severity_syndrome" }),
      dataIndex: "severity_level",
      key: "severity_level",
      width: 100,
      render: (_, record) => (
        <div className="flex items-center justify-center">
          <SeverityLevelBadge title={record?.severity_level} />
        </div>
      ),
    },
    {
      title: intl.formatMessage({ id: "summary_plan" }),
      dataIndex: "summary_plan",
      render: (value) => value,
    },
    {
      title: intl.formatMessage({ id: "time" }),
      dataIndex: "duration",
      width: 100,
      align: "center",
      render: (value) => value + " хоног",
    },
    {
      title: intl.formatMessage({ id: "responsible" }),
      dataIndex: "person_in_charge_id",
      width: 120,
      render: (_, record) => (
        <div>
          {
            <div className="flex gap-2 items-center">
              {record?.person_in_charge?.profile?.physical_path && (
                <Avatar
                  shape="circle"
                  size={"small"}
                  src={file.fileToUrl(
                    record?.person_in_charge?.profile?.physical_path || "-"
                  )}
                />
              )}
              <span>
                {record?.person_in_charge?.last_name &&
                record?.person_in_charge?.first_name
                  ? `${record?.person_in_charge?.last_name?.substring(0, 1)}. ${
                      record?.person_in_charge?.first_name
                    }`
                  : "-"}
              </span>
            </div>
          }
        </div>
      ),
    },
    {
      title: intl.formatMessage({ id: "result" }),
      dataIndex: "result",
      render: (value) => value,
    },
    {
      title: intl.formatMessage({ id: "is_resolved" }),
      key: "is_resolved",
      width: 100,
      dataIndex: "is_resolved",
      render: (value) =>
        value ? (
          <div className="flex items-center justify-center">
            <IBadge color="green" title="Тийм" />
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <IBadge color="gray" title="Үгүй" />
          </div>
        ),
    },
  ];

  return columns;
};

export default DevPlanColumnsReport;
