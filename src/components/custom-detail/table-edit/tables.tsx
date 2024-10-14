import { PageLoading } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import { useRequest } from "ahooks";
import { Collapse, notification } from "antd";
import DownButton from "assets/img/down_button.svg";
import UpButton from "assets/img/up_button.svg";
import { UserRoleType } from "config";
import { AuthContext } from "context/auth";
import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import developmentPlan from "service/development_plan";
import { CareFociItemElement } from "service/development_plan/type";
import DevPlanColumns from "./column";

interface CareFociProps {
  data: CareFociItemElement[];
  isEvaluated?: boolean;
  name: string;
  id: string;
  loading?: boolean;
  onFinish?: () => void;
  onRowSelected: (item: CareFociItemElement) => void;
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
  selectedRowKeys: React.Key[];
}

const DevPlanTables: React.FC<CareFociProps> = ({
  name,
  data,
  id,
  isEvaluated,
  onFinish,
  loading,
  onRowSelected,
  setSelectedRowKeys,
  selectedRowKeys,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [user] = useContext(AuthContext);
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

  const [isSwitched, setIsSwitched] = useState(true);

  const [dataSource, setDataSource] = useState<CareFociItemElement[]>(data);

  useEffect(() => {
    setDataSource([...data]);
  }, [data]);

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
              </div>
            ),
            children: (
              <ProTable<CareFociItemElement>
                rowKey="id"
                id={id}
                options={{
                  reload: false,
                  setting: false,
                  density: false,
                }}
                className="custom-antd-table-cell remove-padding-table"
                dataSource={dataSource}
                loading={loading || updateDevPlan.loading}
                pagination={false}
                search={false}
                tableAlertRender={false}
                scroll={{ x: 1400 }}
                rowSelection={
                  user?.user?.role === UserRoleType.doctor
                    ? {
                        type: "radio",
                        onChange: (selectedRowKeys, selectedRows) => {
                          setSelectedRowKeys(selectedRowKeys);
                          selectedRows[0].is_general = isEvaluated
                            ? false
                            : true;
                          onRowSelected(selectedRows[0]);
                        },
                        selectedRowKeys: selectedRowKeys,
                      }
                    : {}
                }
                onRow={(record, rowIndex) => {
                  if (user?.user?.role === UserRoleType.doctor) {
                    return {
                      onClick: (event) => {
                        if (selectedRowKeys.includes(record.id)) {
                          setSelectedRowKeys(
                            selectedRowKeys.filter((key) => key !== record.id)
                          );
                          onRowSelected(null as any);
                        } else {
                          setSelectedRowKeys([record.id]);
                          record.is_general = isEvaluated ? false : true;
                          onRowSelected(record);
                        }
                      },
                    };
                  }
                  return {};
                }}
                columns={DevPlanColumns({
                  dataSource,
                  isEvaluated,
                })}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default DevPlanTables;
