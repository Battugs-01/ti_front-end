import React, { useEffect, useState } from "react";
import { Button, notification } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { EditableProTable, ProColumns } from "@ant-design/pro-table";
import EditSvg from "assets/img/edit.svg"; // Your custom edit icon
import DownButton from "assets/img/down_button.svg";
import UpButton from "assets/img/up_button.svg";
import BooleanBadge from "components/badge/boolean";
import OtherBadge from "components/badge/other";
import { PageLoading } from "@ant-design/pro-layout";
import { CareFociItemElement } from "service/development_plan/type";
import { DevPlanQuistion } from "utils/dev_plan";
import { Save02 } from "untitledui-js-base";
import IBadge from "components/badge";
import { useRequest } from "ahooks";
import developmentPlan from "service/development_plan";
import { useLevelContext } from "../selected-level";

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
  const { selectedLevel } = useLevelContext();
  const [isSwitched, setIsSwitched] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<CareFociItemElement[]>(data);

  useEffect(() => {
    setDataSource([...data]);
  }, [data]);

  console.log("dataSource", dataSource);

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
        index + 1 + (isSwitched ? 0 : dataSource.length),
    },
    {
      title: intl.formatMessage({ id: "question" }),
      dataIndex: "result",
      className: "text-left",
      width: 300,
      editable: false,
      render: (_, record) => (
        <div className="flex items-center">
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
      width: 300,
    },
    {
      title: intl.formatMessage({ id: "severity_syndrome" }),
      dataIndex: "severity_level",
      key: "severity_level",
      valueType: "select",
      valueEnum: {
        High: { text: <IBadge color="red" title="Хүнд" /> },
        Low: {
          text: <IBadge color="green" title="Хөнгөн" />,
        },
        Medium: {
          text: <IBadge color="yellow" title="Дунд" />,
        },
      },
    },
    {
      title: intl.formatMessage({ id: "summary_plan" }),
      dataIndex: "summary_plan",
    },
    {
      title: intl.formatMessage({ id: "time" }),
      dataIndex: "duration",
      valueType: "select",
      valueEnum: {
        7: { text: "7 хоног" },
        14: { text: "14 хоног" },
      },
    },
    {
      title: intl.formatMessage({ id: "responsible" }),
      dataIndex: "person_in_charge_id",
    },
    {
      title: intl.formatMessage({ id: "result" }),
      dataIndex: "result",
    },
    {
      title: intl.formatMessage({ id: "is_resolved" }),
      key: "is_resolved",
      dataIndex: "is_resolved",
      valueType: "select",
      valueEnum: {
        true: { text: <IBadge color="green" title="Тийм" /> },
        false: {
          text: <IBadge color="gray" title="Үгүй" />,
        },
      },
    },
  ];

  const updateDevPlan = useRequest(developmentPlan.updateDevPlan, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  if (isEvaluated) {
    columns.splice(2, 0, {
      title: intl.formatMessage({ id: "evaluation" }),
      dataIndex: "is_have",
      editable: false,
      className: "text-left",
      render: (_, record) => (
        <BooleanBadge
          status={record?.customer_care_foci_item?.is_have ?? "N/A"}
        />
      ),
    });
  }

  if (!data) return <PageLoading />;

  const handleEditAllRows = () => {
    const allKeys = dataSource.map((item) => item.id);
    setEditableRowKeys(allKeys);
    setIsEditing(true);
  };

  // const handleSave = (body: CareFociItemElement[]) => {
  //   updateDevPlan.run(body);
  //   setIsEditing(false);
  // };

  const handleSave = async () => {
    const updatedData = dataSource.map((item) => {
      return {
        ...item,
        duration: Number(item.duration),
        is_resolved: item.is_resolved === "true" ? true : false,
        person_in_charge_id: 1,
      };
    });
    await updateDevPlan.run({
      assessment_id: selectedLevel?.id,
      ...(isEvaluated
        ? { care_foci_items: updatedData }
        : { general_items: updatedData }),
      ...(isEvaluated ? { is_general: false } : { is_general: true }),
      care_foci_id:
        data?.find((item) => item?.customer_care_foci_item?.care_foci_id)
          ?.customer_care_foci_item?.care_foci_id || 0,
    });
    setIsEditing(false);
    setEditableRowKeys([]);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold flex flex-row gap-4 items-center">
          <img
            src={isSwitched ? UpButton : DownButton}
            alt="Down"
            className="cursor-pointer"
            onClick={() => setIsSwitched(!isSwitched)}
          />
          <FormattedMessage id={name} />
        </div>
        {!isEditing ? (
          <Button
            style={{ opacity: 1, cursor: "pointer" }}
            className="flex items-center gap-2"
            onClick={handleEditAllRows}
          >
            <img src={EditSvg} alt="Edit" />
            <div className="text-sm text-gray-700 font-medium">
              <FormattedMessage id="member_drawer_title_update" />
            </div>
          </Button>
        ) : (
          <Button
            size="middle"
            icon={<Save02 />}
            className="flex items-center"
            onClick={() => handleSave()}
          >
            <FormattedMessage id="save" />
          </Button>
        )}
      </div>

      {isSwitched ? (
        <EditableProTable<CareFociItemElement>
          rowKey="id"
          className="mt-4 custom-antd-table-cell"
          value={dataSource}
          bordered
          onChange={(value) => setDataSource([...value])}
          columns={columns}
          pagination={false}
          scroll={{ x: 1000 }}
          recordCreatorProps={false}
          editable={{
            type: "multiple",
            editableKeys,
            onValuesChange: (record, recordList) =>
              setDataSource([...recordList]),
            onChange: setEditableRowKeys,
          }}
        />
      ) : null}
    </div>
  );
};

export default DevPlanTables;
