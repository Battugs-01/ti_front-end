import { PageLoading } from "@ant-design/pro-layout";
import { Collapse } from "antd";
import DownButton from "assets/img/down_button.svg";
import UpButton from "assets/img/up_button.svg";
import { ITable } from "components/table";
import { AuthContext } from "context/auth";
import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { CareFociItemElement } from "service/development_plan/type";
import { Edit04 } from "untitledui-js-base";
import PlannedWordDetailTableColumn from "./column";
import { DevPlanUpdate } from "./update";

interface CareFociProps {
  data: CareFociItemElement[];
  isEvaluated?: boolean;
  name: string;
  id: string;
  loading?: boolean;
  onFinish?: () => void;
  assesment_id: number;
}

const PlannedWorkTables: React.FC<CareFociProps> = ({
  name,
  data,
  id,
  isEvaluated,
  onFinish,
  assesment_id,
  loading,
}) => {
  const [user] = useContext(AuthContext);
  const [updateAction, setUpdateAction] = useState<CareFociItemElement>();

  const [isSwitched, setIsSwitched] = useState(true);
  const [dataSource, setDataSource] = useState<CareFociItemElement[]>(data);

  useEffect(() => {
    setDataSource([...data]);
  }, [data]);

  const handleDropDownClick = () => {
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
              <ITable<CareFociItemElement>
                rowKey="id"
                id={id}
                hidePagination
                className="custom-antd-table-cell remove-padding-table"
                dataSource={dataSource}
                bordered
                loading={loading}
                columns={PlannedWordDetailTableColumn({
                  dataSource,
                  isEvaluated,
                })}
                pagination={false}
                customActions={(record) =>
                  user?.user?.id === record?.person_in_charge?.id ? (
                    <div className="flex items-center justify-center">
                      <Edit04
                        size="20"
                        onClick={() => setUpdateAction(record)}
                        className="cursor-pointer flex justify-center"
                      />
                    </div>
                  ) : null
                }
              />
            ),
          },
        ]}
      />
      {updateAction && (
        <DevPlanUpdate
          assesment_id={assesment_id}
          isEvaluated={isEvaluated}
          data={updateAction}
          onCancel={() => setUpdateAction(undefined)}
          onFinish={async () => {
            if (onFinish) {
              await onFinish();
            }
            setUpdateAction(undefined);
          }}
        />
      )}
    </div>
  );
};

export default PlannedWorkTables;
