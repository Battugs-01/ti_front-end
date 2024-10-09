import { PageLoading } from "@ant-design/pro-layout";
import { EditableProTable } from "@ant-design/pro-table";
import { Collapse } from "antd";
import DownButton from "assets/img/down_button.svg";
import UpButton from "assets/img/up_button.svg";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { CareFociItemElement } from "service/development_plan/type";
import DevPlanColumnsReport from "./columns";

interface CareFociProps {
  data: CareFociItemElement[];
  isEvaluated?: boolean;
  name: string;
  id: string;
  loading?: boolean;
  isClose?: boolean;
  onFinish?: () => void;
}

const DevPlanTablesReport: React.FC<CareFociProps> = ({
  name,
  data,
  id,
  isEvaluated,
  loading,
}) => {
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
        expandIcon={({}) => (
          <div className="flex gap-3 items-center">
            <img
              src={isSwitched ? UpButton : DownButton}
              alt="Down"
              className="cursor-pointer"
              onClick={handleEditClick}
            />
            <div className="flex items-center justify-between">
              <div className="text-[18px] font-semibold flex flex-row gap-4 items-center">
                <FormattedMessage id={name} />
              </div>
            </div>
          </div>
        )}
        items={[
          {
            children: (
              <EditableProTable<CareFociItemElement>
                rowKey="id"
                id={id}
                className="custom-antd-table-cell remove-padding-table"
                value={dataSource}
                loading={loading}
                bordered
                onChange={(value) => setDataSource([...value])}
                columns={DevPlanColumnsReport({
                  dataSource,
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

export default DevPlanTablesReport;
