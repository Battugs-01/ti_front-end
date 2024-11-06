import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Button, Card } from "antd";
import { CareFociEnum, UserRoleType } from "config";
import { AuthContext } from "context/auth";
import { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import developmentPlan from "service/development_plan";
import { CareFociItemElement } from "service/development_plan/type";
import { ScreeningListType } from "service/screening_list/type";
import { DownloadCloud02, LineChartUp05 } from "untitledui-js-base";
import { exportFromTableManyData } from "utils/export";
import { useLevelContext } from "../selected-level";
import { DevPlanEndModal } from "./dev_plan_close";
import DevPlanEditForm from "./edit-form";
import DevPlanTables from "./tables";
interface TableEditDevPlanProps {
  customerMainData: ScreeningListType;
}
const TableEditDevPlan: React.FC<TableEditDevPlanProps> = ({
  customerMainData,
}) => {
  const { selectedLevel } = useLevelContext();
  const [user] = useContext(AuthContext);
  const [modal, setModal] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<CareFociItemElement>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const devPlanData = useRequest(developmentPlan.getDetail, {
    manual: true,
    onError: (err) => {
      setError(true);
    },
    onSuccess: (err) => {
      setError(false);
    },
  });

  const run = () => {
    devPlanData.run(selectedLevel?.id || 0);
    setSelectedRowKeys([]);
  };

  useEffect(() => {
    if (selectedLevel) {
      run();
    }
  }, [selectedLevel]);

  if (!selectedLevel) {
    return <PageLoading />;
  }

  const generalData =
    devPlanData.data?.items
      .filter((item) => item?.valuation_id)
      .flatMap((item) => item?.general_items || []) || [];

  const loseActivityData =
    devPlanData.data?.items
      .filter((item) => item?.care_foci_id === CareFociEnum.loseActivity)
      .flatMap(
        (item) =>
          item?.care_foci_items &&
          item?.care_foci_items.map((careFociItem) => ({
            ...careFociItem,
            care_foci_id: item.care_foci_id,
          }))
      ) || [];

  const psychologyChangeData =
    devPlanData.data?.items
      .filter((item) => item?.care_foci_id === CareFociEnum.psychologyChange)
      .flatMap(
        (item) =>
          item?.care_foci_items &&
          item?.care_foci_items.map((careFociItem) => ({
            ...careFociItem,
            care_foci_id: item.care_foci_id,
          }))
      ) || [];
  const EconemyData =
    devPlanData.data?.items
      .filter((item) => item?.care_foci_id === CareFociEnum.Econemy)
      .flatMap(
        (item) =>
          item?.care_foci_items &&
          item?.care_foci_items.map((careFociItem) => ({
            ...careFociItem,
            care_foci_id: item.care_foci_id,
          }))
      ) || [];
  const HealthRiskData =
    devPlanData.data?.items
      .filter((item) => item?.care_foci_id === CareFociEnum.HealthRisk)
      .flatMap(
        (item) =>
          item?.care_foci_items &&
          item?.care_foci_items.map((careFociItem) => ({
            ...careFociItem,
            care_foci_id: item.care_foci_id,
          }))
      ) || [];

  return (
    <>
      {devPlanData?.data?.items && error === false && (
        <div className="flex  gap-2">
          <Card
            title={
              <div className="text-xl font-semibold xl:flex gap-4 items-center mt-3 ml-6 hidden ">
                <LineChartUp05 className="text-primary-700" />
                <FormattedMessage id="development_plan" />
              </div>
            }
            extra={
              <div className="flex flex-wrap gap-4 mt-3">
                <Button
                  size="large"
                  type="default"
                  icon={<DownloadCloud02 />}
                  onClick={() => {
                    exportFromTableManyData(
                      [`Хөгжлийн төлөвлөгөө ${customerMainData?.first_name}`],
                      [
                        "edit-table-general", // Table 1
                        "edit-table-physical", // Table 2
                        "edit-table-psychology", // Table 3
                        "edit-table-economy", // Table 4
                        "edit-table-health-risk", // Table 5
                      ],
                      window
                    );
                  }}
                  className="flex items-center gap-2"
                >
                  <FormattedMessage id="download" />
                </Button>
                {user &&
                  (user.user?.role === UserRoleType.doctor ||
                    user.user?.role === UserRoleType.senior_case_manager) &&
                  devPlanData?.data?.is_close === false && (
                    <Button
                      size="large"
                      className="flex items-center gap-2"
                      type="primary"
                      onClick={() => setModal(true)}
                    >
                      <FormattedMessage id="development_plan_end" />
                    </Button>
                  )}
              </div>
            }
            className="card-header-remove h-full w-full overflow-x-hidden"
          >
            <div className="flex flex-col gap-6 w-full">
              <DevPlanTables
                name="general"
                id="edit-table-general"
                data={generalData}
                isEvaluated={false}
                onFinish={async () => {
                  run();
                }}
                devPlanIsClose={devPlanData?.data?.is_close}
                onRowSelected={(row: CareFociItemElement) =>
                  setSelectedRow(row)
                }
                setSelectedRowKeys={setSelectedRowKeys}
                selectedRowKeys={selectedRowKeys}
              />
              <DevPlanTables
                name="lose_activity"
                id="edit-table-physical"
                data={loseActivityData as any}
                isEvaluated={true}
                devPlanIsClose={devPlanData?.data?.is_close}
                onFinish={async () => {
                  run();
                }}
                onRowSelected={(row: CareFociItemElement) =>
                  setSelectedRow(row)
                }
                setSelectedRowKeys={setSelectedRowKeys}
                selectedRowKeys={selectedRowKeys}
              />
              <DevPlanTables
                name="psychology_change"
                id="edit-table-psychology"
                data={psychologyChangeData as CareFociItemElement[]}
                isEvaluated={true}
                devPlanIsClose={devPlanData?.data?.is_close}
                onFinish={async () => {
                  run();
                }}
                onRowSelected={(row: CareFociItemElement) =>
                  setSelectedRow(row)
                }
                setSelectedRowKeys={setSelectedRowKeys}
                selectedRowKeys={selectedRowKeys}
              />
              <DevPlanTables
                name="economy_diff"
                id="edit-table-economy"
                data={EconemyData as CareFociItemElement[]}
                isEvaluated={true}
                devPlanIsClose={devPlanData?.data?.is_close}
                onFinish={async () => {
                  run();
                }}
                onRowSelected={(row: CareFociItemElement) =>
                  setSelectedRow(row)
                }
                setSelectedRowKeys={setSelectedRowKeys}
                selectedRowKeys={selectedRowKeys}
              />
              <DevPlanTables
                name="health_risk"
                id="edit-table-health-risk"
                data={HealthRiskData as CareFociItemElement[]}
                isEvaluated={true}
                devPlanIsClose={devPlanData?.data?.is_close}
                onFinish={async () => {
                  run();
                }}
                onRowSelected={(row: CareFociItemElement) =>
                  setSelectedRow(row)
                }
                setSelectedRowKeys={setSelectedRowKeys}
                selectedRowKeys={selectedRowKeys}
              />
            </div>
          </Card>
          {selectedRow ? (
            <div className="h-[900px] min-w-[400px]  max-w-[450px]">
              <DevPlanEditForm
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                setSelectedRowKeys={setSelectedRowKeys}
                data={selectedRow as CareFociItemElement}
                setSelectedRow={setSelectedRow}
                onFinish={async () => {
                  run();
                }}
              />
            </div>
          ) : null}
        </div>
      )}

      <DevPlanEndModal
        visible={modal}
        onCancel={() => setModal(false)}
        onFinish={async () => {
          run();
          setModal(false);
        }}
      />
    </>
  );
};

export default TableEditDevPlan;
