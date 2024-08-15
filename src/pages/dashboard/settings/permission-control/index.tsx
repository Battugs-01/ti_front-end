import { useRequest } from "ahooks";
import { Card } from "antd";
import { FormInstance } from "antd/lib";
import { IModalForm } from "components/modal";
import CustomPagination from "components/pagination";
import InitTableHeader from "components/table-header";
import { useEffect, useRef, useState } from "react";
import file from "service/file";
import permission from "service/settings/permission";
import { initPagination } from "utils/index";
import { Item } from "./components/item";
import { CreatePermission } from "./create";

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
            // setCreate={() => setIsCreate(true)}
            refresh={refreshList}
            customHeaderTitle="Эрхийн тохиргоо"
            CreateComponent={CreatePermission}
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
    </div>
  );
};

export default PermissionControl;
