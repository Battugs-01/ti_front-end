import { RightOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { notification } from "antd";
import { ITag, RenderServiceStatus } from "components/index";
import { ITable } from "components/table";
import { SERVICE_OPERATION_TYPES } from "config";
import { useAtom } from "jotai";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import dashboard from "service/dashboard";
import { tableCellFixed } from "utils/index";
import { atomFormDashboard } from "../store";

const LatestMerchants: FC = () => {
  const api = useRequest(dashboard.merchantLatest, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const [form] = useAtom(atomFormDashboard);

  const fetch = (values?: any) => {
    api.run({
      ...form,
      ...values,
      created_at: form.full_date,
    });
  };

  useEffect(() => {
    fetch();
  }, [form]);

  return (
    <>
      <ITable<any>
        noShadow
        hideCreateButton
        loading={api.loading}
        toolbarItems={
          <Link
            to={"/dashboard/merchant/service/all"}
            style={{ color: "#4F46E5" }}
          >
            <span>See All Merchants</span>
            <RightOutlined />
          </Link>
        }
        customHeaderTitle="Latest Requested Merchants"
        dataSource={api.data?.items || []}
        refresh={(values) => fetch({ ...form, ...values })}
        pagination={{
          pageSize: 6,
        }}
        columns={[
          {
            ...tableCellFixed(230),
            dataIndex: "name",
            title: "Merchants",
            render: (_, record) => (
              <div className="flex flex-col">
                <span className="text-md text-gray-600 font-medium">
                  {record.name}
                </span>
                <span className="text-sm">{record.phone}</span>
              </div>
            ),
          },
          {
            dataIndex: "status",
            title: "Status",
            render: (_, record) => (
              <RenderServiceStatus status={record.status} />
            ),
          },
          {
            dataIndex: "operation_types",
            valueType: "string",
            title: "Operation Type",
            render: (_, record) =>
              record.operation_types?.map((type: any, index: number) => (
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

            dataIndex: "clicks",
            valueType: "number",
            title: "Clicks",
            render: (_, record) => record.total_click,
          },
          {
            ...tableCellFixed(200),
            dataIndex: "created_at",
            valueType: "dateTime",
            title: "Date",
          },
        ]}
      />
    </>
  );
};

export default LatestMerchants;
