import { useRequest } from "ahooks";
import { Card } from "antd";
import { FormInstance } from "antd/lib";
import CustomPagination from "components/pagination";
import InitTableHeader from "components/table-header";
import { useEffect, useRef, useState } from "react";
import file from "service/file";
import permission from "service/settings/permission";
import { initPagination } from "utils/index";
import { Item } from "./components/item";
import { CreatePermission } from "./create";
import { useIntl } from "react-intl";
import { PermissionList } from "service/settings/permission/type";

const PermissionControl: React.FC = () => {
  const [filter, setFilter] = useState(initPagination);
  const intl = useIntl();

  const employeeList = useRequest(permission.list, {
    manual: true,
  });

  const uploadProfile = useRequest(file.upload, {
    manual: true,
  });
  const formRef = useRef<FormInstance>(null);

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
            addButtonName={intl.formatMessage({ id: "create" })}
            refresh={refreshList}
            customHeaderTitle={intl.formatMessage({ id: "permission_control" })}
            CreateComponent={CreatePermission}
          />
        </div>
        <div>
          {employeeList?.data?.items.map(
            (item: PermissionList, index: number) => {
              return (
                <Item
                  data={item}
                  key={index}
                  form={formRef?.current as FormInstance}
                  refreshList={refreshList}
                />
              );
            }
          )}
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
