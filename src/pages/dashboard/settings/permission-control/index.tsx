import { useRequest } from "ahooks";
import { Card } from "antd";
import { FormInstance } from "antd/lib";
import { ExportButton } from "components/index";
import { IModalForm } from "components/modal";
import CustomPagination from "components/pagination";
import InitTableHeader from "components/table-header";
import { useEffect, useRef, useState } from "react";
import file from "service/file";
import permission from "service/settings/permission";
import { exportFromTable } from "utils/export";
import { initPagination } from "utils/index";
import { Item } from "./components/item";

const PermissionControl: React.FC = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [fakeData, setFakeData] = useState<any>([]);
  const [filter, setFilter] = useState(initPagination);

  const employeeList = useRequest(permission.get, {
    manual: true,
  });

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setFakeData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  console.log(fakeData, "sda");

  const employeeCreate = useRequest(permission.get, {
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
    <div className="custom-ant-card-padding-remove">
      <Card loading={employeeList?.loading}>
        <div style={{ borderBottom: "1px solid #EAECF0" }}>
          <InitTableHeader
            addButtonName="Нэмэх"
            setCreate={() => setIsCreate(true)}
            refresh={refreshList}
            customHeaderTitle="Эрхийн тохиргоо"
            toolbarItems={
              <div className="flex">
                <ExportButton
                  onClick={() => {
                    exportFromTable(
                      ["Эрхийн тохиргоо"],
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
          {fakeData?.products?.map((item: any, index: number) => {
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
      {isCreate && (
        <IModalForm
          open={isCreate}
          formRef={formRef}
          onOpenChange={() => formRef.current?.resetFields()}
          width={724}
          title="Add member"
          modalProps={{ onCancel: cancelModal }}
          okText="Save"
          cancelText="Cancel"
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
          <div>sda create</div>
          {/* <CreateForm form={formRef?.current} /> */}
        </IModalForm>
      )}
    </div>
  );
};

export default PermissionControl;
