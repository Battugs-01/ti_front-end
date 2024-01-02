import { useRequest } from "ahooks";
import { Tag, notification } from "antd";
import { ITable, ITag, PermissionButton } from "components/index";
import { SERVICE_CATEGORY_TYPES, SERVICE_OPERATION_TYPES } from "config";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import merchantService from "service/merchantService";
import { MerchantService } from "service/merchantService/type";
import { fillDollar, tableCellFixed } from "utils/index";
import { UpdatePermission } from "./modals/update";
import { atomServiceProductForm } from "./store";
import { CreatePermission } from "./modals/create";

export const List = () => {
  const [form] = useAtom(atomServiceProductForm);
  const [updatePermission, setUpdatePermission] = useState<MerchantService>();
  const list = useRequest(merchantService.list, {
    manual: true,
    onError: (err) => notification.error({ message: err.message }),
  });
  useEffect(() => {
    run();
  }, [form]);

  const run = (values?: any) =>
    list.run({ ...form, created_at: form.full_date, ...values });

  return (
    <>
      <ITable<MerchantService>
        dataSource={list.data?.items}
        loading={list.loading}
        total={list.data?.total}
        refresh={run}
        customActions={(record) => {
          return (
            <PermissionButton onClick={() => setUpdatePermission(record)} />
          );
        }}
        columns={[
          {
            dataIndex: "name",
            title: "Name",
            render: (_, record) => (
              <span className="text-md text-gray-900 font-medium">
                {record.name}
              </span>
            ),
          },
          {
            dataIndex: "phone",
            valueType: "string",
            title: "Phone number",
            className: "text-gray-600",
          },
          {
            ...tableCellFixed(150),
            dataIndex: "email",
            valueType: "string",
            title: "Email",
            className: "text-gray-600",
          },
          {
            dataIndex: "operationType",
            title: "Operation Type",
            render: (_, record) =>
              record.operation_types.map((type, index) => (
                <ITag
                  value={
                    SERVICE_OPERATION_TYPES.find((el) => el.value === type)
                      ?.label
                  }
                  key={"operation-type-" + index}
                />
              )),
          },
          {
            dataIndex: "categories",
            valueType: "string",
            title: "Category",
            render: (_, record) =>
              record?.categories?.map((item, key) => (
                <ITag
                  key={"category-" + key}
                  value={
                    SERVICE_CATEGORY_TYPES.find((el) => el.value === item)
                      ?.label
                  }
                />
              )),
          },
          {
            dataIndex: "tags",
            valueType: "string",
            title: "Specialty",
            render: (_, record) =>
              record.tags?.map((el, index) => (
                <ITag value={el} key={"specialty-tag-" + index} />
              )),
          },
          {
            dataIndex: "price",
            valueType: "number",
            title: "Price",
            render: (_, record) => (
              <ITag value={fillDollar(record.price_range)} />
            ),
          },
          {
            dataIndex: "is_tourist_friendly",
            title: "Tourist Friendly",
            render: (_, record) => (
              <Tag
                className="rounded-full"
                color={record.is_tourist_friendly ? "green" : "silver"}
              >
                {record.is_tourist_friendly ? "Yes" : "No"}
              </Tag>
            ),
          },
        ]}
        CreateComponent={CreatePermission}
      />
      <UpdatePermission
        open={!!updatePermission}
        onCancel={() => setUpdatePermission(undefined)}
        onFinish={() => {
          setUpdatePermission(undefined);
          list.refresh();
        }}
        detail={updatePermission}
      />
    </>
  );
};
