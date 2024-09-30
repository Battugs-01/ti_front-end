import { PageLoading } from "@ant-design/pro-layout";
import { EditableProTable } from "@ant-design/pro-table";
import { useRequest } from "ahooks";
import { Button, Collapse, notification } from "antd";
import DownButton from "assets/img/down_button.svg";
import EditSvg from "assets/img/edit.svg";
import UpButton from "assets/img/up_button.svg";
import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import developmentPlan from "service/development_plan";
import { CareFociItemElement } from "service/development_plan/type";
import { Save02 } from "untitledui-js-base";
import { useLevelContext } from "../selected-level";
import DevPlanColumns from "./column";
import { AuthContext } from "context/auth";
import { UserRoleType } from "config";

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
  const [user] = useContext(AuthContext);
  const updateDevPlan = useRequest(developmentPlan.updateDevPlan, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const { selectedLevel } = useLevelContext();
  const [isSwitched, setIsSwitched] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [dataSource, setDataSource] = useState<CareFociItemElement[]>(data);

  useEffect(() => {
    setDataSource([...data]);
  }, [data]);

  const handleFieldChange = (index: number, key: string, value: any) => {
    const newDataSource = [...dataSource];
    console.log(newDataSource, index, key, value);
    newDataSource[index] = { ...newDataSource[index], [key]: value };
    setDataSource(newDataSource);
  };

  const handleSave = async () => {
    const updatedData = dataSource.map((item) => {
      return {
        ...item,
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
  };

  const handleEditClick = () => {
    setIsSwitched(!isSwitched);
  };
  if (!data) return <PageLoading />;

  return (
    <div className="w-full ">
      <Collapse
        defaultActiveKey={["1"]}
        collapsible="icon"
        expandIcon={({}) => (
          <img
            src={isSwitched ? UpButton : DownButton}
            alt="Down"
            className="cursor-pointer"
            onClick={handleEditClick}
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
                {isSwitched && user.user?.role === UserRoleType.doctor && (
                  <Button
                    style={{ opacity: 1, cursor: "pointer" }}
                    className="flex items-center gap-2"
                    onClick={() =>
                      isEditing ? handleSave() : setIsEditing(true)
                    }
                  >
                    {isEditing === true ? <Save02 /> : <img src={EditSvg} />}
                    <div className="text-sm text-gray-700 font-medium">
                      <FormattedMessage
                        id={isEditing ? "save" : "member_drawer_title_update"}
                      />
                    </div>
                  </Button>
                )}
              </div>
            ),
            children: (
              <EditableProTable<CareFociItemElement>
                rowKey="id"
                className="custom-antd-table-cell remove-padding-table"
                value={dataSource}
                bordered
                onChange={(value) => setDataSource([...value])}
                columns={DevPlanColumns({
                  isEditing,
                  dataSource,
                  handleFieldChange,
                  isEvaluated,
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

export default DevPlanTables;