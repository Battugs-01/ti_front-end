import { useDebounceFn, useRequest } from "ahooks";
import { Card } from "antd";
import { FormInstance } from "antd/lib";
import CustomPagination from "components/pagination";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import file from "service/file";
import permission from "service/settings/permission";
import { PermissionList } from "service/settings/permission/type";
import { initPagination } from "utils/index";
import { Item } from "./components/item";
import { CreatePermission } from "./create";

const PermissionControl: React.FC = () => {
  const [filter, setFilter] = useState(initPagination);
  const [search, setSearch] = useState<string>("");
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

  const searchRun = useDebounceFn(employeeList.run, { wait: 1000 });

  const downloadList = employeeList?.data?.items?.map(
    (item: PermissionList) => {
      return {
        first_name: item.first_name,
        last_name: item.last_name,
        email: item.email,
        phone: item.phone,
        created_at: dayjs(item.created_at).format("YYYY-MM-DD"),
      };
    }
  );

  return (
    <div className="custom-ant-card-padding-remove">
      <Card loading={employeeList?.loading}>
        <div style={{ borderBottom: "1px solid #EAECF0" }}>
          <InitTableHeader
            search={search}
            setSearch={(e) => {
              setSearch(e);
              searchRun.run({
                ...filter,
                query: e,
              });
            }}
            fileName="user_list"
            downloadList={downloadList || []}
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
