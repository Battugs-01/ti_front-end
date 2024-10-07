import { PageLoading } from "@ant-design/pro-layout";
import { EditableProTable } from "@ant-design/pro-table";
import { useRequest } from "ahooks";
import { Collapse, notification } from "antd";
import DownButton from "assets/img/down_button.svg";
import UpButton from "assets/img/up_button.svg";
import { AuthContext } from "context/auth";
import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import developmentPlan from "service/development_plan";
import { CareFociItemElement } from "service/development_plan/type";
import PlannedWordDetailTableColumn from "./column";

interface CareFociProps {
  data: CareFociItemElement[];
  isEvaluated?: boolean;
  name: string;
  id: string;
  isClose?: boolean;
  onFinish?: () => void;
  assesment_id: number;
}

const PlannedWorkTables: React.FC<CareFociProps> = ({
  name,
  data,
  id,
  isEvaluated,
  isClose,
  onFinish,
  assesment_id,
}) => {
  const [user] = useContext(AuthContext);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const updateDevPlan = useRequest(developmentPlan.updateItemDevPlan, {
    manual: true,
    onSuccess: () => {
      setEditingRow(null);
      onFinish && onFinish();
    },
    onError: (err) => {
      notification.error({
        message: err.message,
      }),
        setEditingRow(null);
    },
  });

  const [isSwitched, setIsSwitched] = useState(true);
  const [dataSource, setDataSource] = useState<CareFociItemElement[]>(data);

  useEffect(() => {
    setDataSource([...data]);
  }, [data]);

  const handleFieldChange = (index: number, key: string, value: any) => {
    const newDataSource = [...dataSource];
    newDataSource[index] = { ...newDataSource[index], [key]: value };
    setDataSource(newDataSource);
  };

  const handleSave = async (index: number) => {
    const selectedItem = dataSource[index];
    const updatedData = {
      assessment_id: Number(assesment_id),
      care_foci_id: selectedItem?.customer_care_foci_item?.care_foci_id || 0,
      id: selectedItem?.id || 0,
      is_general: !isEvaluated,
      is_resolved: selectedItem?.is_resolved || false,
      result: selectedItem?.result || "",
    };
    await updateDevPlan.run(updatedData);
  };

  const handleDropDownClick = () => {
    setIsSwitched(!isSwitched);
  };

  const handleEditClick = (index: number) => {
    setEditingRow(index);
  };

  if (!data) return <PageLoading />;

  return (
    <div className="w-full">
      <Collapse
        defaultActiveKey={["1"]}
        collapsible="icon"
        expandIcon={({}) => (
          <img
            src={isSwitched ? UpButton : DownButton}
            alt="Down"
            className="cursor-pointer"
            onClick={handleDropDownClick}
          />
        )}
        items={[
          {
            key: "1",
            label: (
              <div className="flex items-center justify-between">
                <div className="text-[18px] font-semibold flex flex-row gap-4 items-center">
                  <FormattedMessage id={name} />
                </div>
              </div>
            ),
            children: (
              <EditableProTable<CareFociItemElement>
                rowKey="id"
                id={id}
                className="custom-antd-table-cell remove-padding-table"
                value={dataSource}
                bordered
                onChange={(value) => setDataSource([...value])}
                columns={PlannedWordDetailTableColumn({
                  editingRow,
                  dataSource,
                  handleFieldChange,
                  isEvaluated,
                  handleSave,
                  handleEditClick,
                })}
                pagination={false}
                scroll={{ x: 1400 }}
                recordCreatorProps={false}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default PlannedWorkTables;
