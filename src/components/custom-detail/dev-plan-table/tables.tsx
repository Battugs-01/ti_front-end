import { PageLoading } from "@ant-design/pro-layout";
import { EditableProTable } from "@ant-design/pro-table";
import { useRequest } from "ahooks";
import { Button, Collapse, notification } from "antd";
import DownButton from "assets/img/down_button.svg";
import EditSvg from "assets/img/edit.svg";
import UpButton from "assets/img/up_button.svg";
import { UserRoleType } from "config";
import { AuthContext } from "context/auth";
import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import developmentPlan from "service/development_plan";
import { CareFociItemElement } from "service/development_plan/type";
import { Save02 } from "untitledui-js-base";
import { useLevelContext } from "../selected-level";
import DevPlanColumns from "./column";

interface CareFociProps {
  data: CareFociItemElement[];
  isEvaluated?: boolean;
  name: string;
  id: string;
  loading?: boolean;
  isClose?: boolean;
  onFinish?: () => void;
}

const DevPlanTables: React.FC<CareFociProps> = ({
  name,
  data,
  id,
  isEvaluated,
  isClose,
  onFinish,
  loading,
}) => {
  const [user] = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const updateDevPlan = useRequest(developmentPlan.updateDevPlan, {
    manual: true,
    onSuccess: () => {
      setIsEditing(false);
      onFinish && onFinish();
    },
    onError: (err) => {
      notification.error({
        message: err.message,
      }),
        setIsEditing(true);
    },
  });

  const { selectedLevel } = useLevelContext();
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
  };

  const handleEditClick = () => {
    setIsSwitched(!isSwitched);
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
                {isSwitched &&
                  user.user?.role === UserRoleType.doctor &&
                  isClose === false && (
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
                id={id}
                className="custom-antd-table-cell remove-padding-table"
                value={dataSource}
                loading={loading || updateDevPlan.loading}
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
