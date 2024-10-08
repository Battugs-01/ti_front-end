// DevPlanColumns.tsx
import { ProColumns } from "@ant-design/pro-table";
import { Avatar } from "antd";
import IBadge from "components/badge";
import SeverityLevelBadge from "components/badge/severity_level_badge";
import { useIntl } from "react-intl";
import { CareFociItemElement } from "service/development_plan/type";
import file from "service/file";
import { DevPlanQuistion } from "utils/dev_plan";

interface PlannedWordDetailTableColumnProps {
  dataSource: CareFociItemElement[];
  isEvaluated?: boolean;
}

const PlannedWordDetailTableColumn = ({
  isEvaluated,
}: PlannedWordDetailTableColumnProps): ProColumns<CareFociItemElement>[] => {
  const intl = useIntl();

  const columns: ProColumns<CareFociItemElement>[] = [
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
    },
    {
      title: intl.formatMessage({ id: "severity_syndrome" }),
      dataIndex: "severity_level",
      key: "severity_level",
      width: 100,
      render: (value, record, index) => (
        <div className="flex items-center justify-center">
          <SeverityLevelBadge title={record?.severity_level} />
        </div>
      ),
    },
    {
      title: intl.formatMessage({ id: "summary_plan" }),
      dataIndex: "summary_plan",
      render: (value, record, index) => value,
    },
    {
      title: intl.formatMessage({ id: "time" }),
      dataIndex: "duration",
      width: 100,
      align: "center",
      render: (value, record, index) => value + " хоног",
    },
    {
      title: intl.formatMessage({ id: "responsible" }),
      dataIndex: "person_in_charge_id",
      width: 120,
      render: (value, record, index) => (
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
      dataIndex: "is_resolved",
      width: 100,
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

export default PlannedWordDetailTableColumn;
