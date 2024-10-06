// DevPlanColumns.tsx
import { ProColumns } from "@ant-design/pro-table";
import { Avatar, Input, Select } from "antd";
import IBadge from "components/badge";
import SeverityLevelBadge from "components/badge/severity_level_badge";
import { useIntl } from "react-intl";
import { CareFociItemElement } from "service/development_plan/type";
import file from "service/file";
import { DevPlanQuistion } from "utils/dev_plan";

interface PlannedWordDetailTableColumnProps {
  isEditing: boolean;
  dataSource: CareFociItemElement[];
  handleFieldChange: (index: number, key: string, value: any) => void;
  isEvaluated?: boolean;
}

const PlannedWordDetailTableColumn = ({
  isEditing,
  dataSource,
  handleFieldChange,
  isEvaluated,
}: PlannedWordDetailTableColumnProps): ProColumns<CareFociItemElement>[] => {
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
      width: 200,
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
      width: 200,
    },
    {
      title: intl.formatMessage({ id: "severity_syndrome" }),
      dataIndex: "severity_level",
      key: "severity_level",
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
      render: (value, record, index) => value + " хоног",
    },
    {
      title: intl.formatMessage({ id: "responsible" }),
      dataIndex: "person_in_charge_id",
      width: 200,
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
      render: (value, record, index) =>
        isEditing ? (
          <Input.TextArea
            defaultValue={value as string}
            name="result"
            onChange={(e) => handleFieldChange(index, "result", e.target.value)}
            className="m-0 w-full h-20 custom-input bg-white text-xs"
          />
        ) : (
          value
        ),
    },
    {
      title: intl.formatMessage({ id: "is_resolved" }),
      key: "is_resolved",
      dataIndex: "is_resolved",
      render: (value, record, index) =>
        isEditing ? (
          <Select
            defaultValue={value}
            style={{ width: 120 }}
            className="custom-input"
            options={[
              {
                value: true,
                label: "Тийм",
              },
              { value: false, label: "Үгүй" },
            ]}
            onChange={(newValue) => {
              handleFieldChange(index, "is_resolved", newValue);
            }}
          />
        ) : value ? (
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
