import { Card } from "antd";
import { ExportButton } from "components/index";
import InitTableHeader from "components/table-header";
import { exportFromTable } from "utils/export";
import { Item } from "./components/item";
import { useEffect, useRef, useState } from "react";
import { useRequest } from "ahooks";
import employee from "service/gov-employees";
import { FormInstance } from "antd/lib";
import { IModalForm } from "components/modal";
import { CreateForm } from "./action/CreateForm";
import file from "service/file";
import CustomPagination from "components/pagination";
import { initPagination } from "utils/index";

const EmployeePage: React.FC = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [filter, setFilter] = useState(initPagination);
  const employeeList = useRequest(employee.employeeList, {
    manual: true,
  });
  const employeeCreate = useRequest(employee.create, {
    manual: true,
    onSuccess: () => {
      setIsCreate(false);
      employeeList.run({ ...filter });
    },
    onError: () => {
      setIsCreate(false);
    },
  });
  const uploadProfile = useRequest(file.upload, {
    manual: true,
  });
  const formRef = useRef<FormInstance>(null);
  const cancelModal = () => {
    setIsCreate(false);
  };
  useEffect(() => {
    employeeList.run({
      ...filter,
    });
  }, [filter]);
  const refreshList = () => {
    employeeList.run({ ...filter });
  };
  const setPagination = (pageNumber: number, pageSize: number) => {
    setFilter({ ...filter, current: pageNumber, pageSize });
    employeeList?.run({ ...filter, current: pageNumber, pageSize });
  };
  return (
    <div>
      <div className="custom-ant-card-padding-remove mt-4">
        <Card loading={employeeList?.loading} className="pt-4">
          <div style={{ borderBottom: "1px solid #EAECF0" }}>
            <InitTableHeader
              addButtonName="Нэмэх"
              setCreate={() => setIsCreate(true)}
              refresh={refreshList}
              customHeaderTitle="Ажилчдын Жагсаалт"
              toolbarItems={
                <div className="flex">
                  <ExportButton
                    onClick={() => {
                      exportFromTable(
                        ["Ажилчдын Жагсаалт"],
                        window.document.getElementById(
                          "main-table"
                        ) as HTMLElement,
                        window
                      );
                    }}
                  />
                </div>
              }
            />
          </div>
          <div>
            {employeeList?.data?.items?.map((item, index) => {
              return (
                <Item
                  data={item}
                  key={index}
                  form={formRef?.current as FormInstance}
                  refreshList={refreshList}
                />
              );
            })}
          </div>
          <div
            className="flex justify-end mb-4 px-6"
            style={{ borderTop: "1px solid #EAECF0" }}
          >
            <CustomPagination
              current={filter.current}
              total={employeeList?.data?.total}
              setPagination={setPagination}
            />
          </div>
        </Card>
      </div>
      {isCreate && (
        <IModalForm
          open={isCreate}
          formRef={formRef}
          onOpenChange={() => formRef.current?.resetFields()}
          width={724}
          title="Үйлчлүүлэгч нэмэх"
          modalProps={{ onCancel: cancelModal }}
          okText="Нэмэх"
          onRequest={async (values) => {
            const profile = await uploadProfile.runAsync({
              file: values?.profile?.[0]?.originFileObj,
            });
            return employeeCreate.runAsync({
              ...values,
              profile_id: profile[0]?.id,
            });
          }}
        >
          <CreateForm form={formRef?.current} />
        </IModalForm>
      )}
    </div>
  );
};

export default EmployeePage;
