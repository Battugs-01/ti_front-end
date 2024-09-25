// DevPlanColumns.tsx
import { ProFormSelect } from "@ant-design/pro-form";
import { ProColumns } from "@ant-design/pro-table";
import { useRequest } from "ahooks";
import { Avatar, Input, notification, Select } from "antd";
import IBadge from "components/badge";
import BooleanBadge from "components/badge/boolean";
import SeverityLevelBadge from "components/badge/severity_level_badge";
import { debounce } from "lodash";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { CareFociItemElement } from "service/development_plan/type";
import file from "service/file";
import userList from "service/settings/user_list";
import { DevPlanQuistion } from "utils/dev_plan";

interface DevPlanColumnsProps {
  isEditing: boolean;
  dataSource: CareFociItemElement[];
  handleFieldChange: (index: number, key: string, value: any) => void;
  isEvaluated?: boolean;
}

const DevPlanColumns = ({
  isEditing,
  dataSource,
  handleFieldChange,
  isEvaluated,
}: DevPlanColumnsProps): ProColumns<CareFociItemElement>[] => {
  const intl = useIntl();

  const emplyoee = useRequest(userList.list, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  const debouncedSearch = debounce((value) => {
    emplyoee.run({
      current: 1,
      pageSize: 20,
      query: value,
    });
  }, 1000);

  useEffect(() => {
    emplyoee.run({});
  }, [isEditing]);

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
      render: (value, record, index) =>
        isEditing ? (
          <Select
            defaultValue={value}
            style={{ width: 120 }}
            className="custom-input"
            options={[
              {
                value: "Хөнгөн",
                label: <IBadge color="green" title="Хөнгөн" />,
              },
              { value: "Дунд", label: <IBadge color="yellow" title="Дунд" /> },
              { value: "Хүнд", label: <IBadge color="red" title="Хүнд" /> },
            ]}
            onChange={(newValue) =>
              handleFieldChange(index, "severity_level", newValue)
            }
          />
        ) : (
          <div className="flex items-center justify-center">
            <SeverityLevelBadge title={record?.severity_level} />
          </div>
        ),
    },
    {
      title: intl.formatMessage({ id: "summary_plan" }),
      dataIndex: "summary_plan",
      render: (value, record, index) =>
        isEditing ? (
          <Input.TextArea
            defaultValue={value as string}
            name="summary_plan"
            className="m-0 w-full h-20 custom-input bg-white text-xs"
            onChange={(e) =>
              handleFieldChange(index, "summary_plan", e.target.value)
            }
          />
        ) : (
          value
        ),
    },
    {
      title: intl.formatMessage({ id: "time" }),
      dataIndex: "duration",
      render: (value, record, index) =>
        isEditing ? (
          <Select
            defaultValue={value == 7 ? "7 хоног" : "14 хоног"}
            style={{ width: 120 }}
            onChange={(newValue) =>
              handleFieldChange(index, "duration", newValue)
            }
            className="custom-input"
            options={[
              {
                value: 7,
                label: "7 хоног",
              },
              { value: 14, label: "14 хоног" },
            ]}
          />
        ) : (
          value + " хоног"
        ),
    },
    {
      title: intl.formatMessage({ id: "responsible" }),
      dataIndex: "person_in_charge_id",
      width: 200,
      render: (value, record, index) =>
        isEditing ? (
          <div className="flex items-center justify-center mt-6">
            <ProFormSelect
              name={"person_in_charge_id"}
              shouldUpdate
              className="flex items-center justify-center custom-input"
              fieldProps={{
                showSearch: true,
                loading: emplyoee.loading,
                filterOption: false,
                onSearch: debouncedSearch,
                onChange: (newValue) => {
                  handleFieldChange(index, "person_in_charge_id", newValue);
                },
                value: record.person_in_charge_id,
              }}
              placeholder="Сонгох"
              options={emplyoee?.data?.items.reduce<any[]>((acc, record) => {
                acc.push({
                  label: (
                    <div className="flex gap-2 items-center">
                      <Avatar
                        shape="circle"
                        size={"small"}
                        src={file.fileToUrl(
                          record.profile?.physical_path || "AS"
                        )}
                      />
                      <span>{`${record?.last_name?.substring(0, 1)}. ${
                        record?.first_name
                      }`}</span>
                    </div>
                  ),
                  value: record?.id,
                });
                return acc;
              }, [])}
            />
          </div>
        ) : (
          <div>sda</div>
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
                label: <IBadge color="green" title="Тийм" />,
              },
              { value: false, label: <IBadge color="gray" title="Үгүй" /> },
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

  if (isEvaluated) {
    columns.splice(2, 0, {
      title: intl.formatMessage({ id: "evaluation" }),
      dataIndex: "is_have",
      editable: false,
      width: 80,
      className: "text-left",
      render: (_, record) => (
        <BooleanBadge
          status={record?.customer_care_foci_item?.is_have ?? "N/A"}
        />
      ),
    });
  }
  return columns;
};

export default DevPlanColumns;
