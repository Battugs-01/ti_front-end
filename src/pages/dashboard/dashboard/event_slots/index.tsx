import { useRequest } from "ahooks";
import { notification } from "antd";
import { IProgress, RenderProductStatus } from "components/index";
import { ITable } from "components/table";
import { useAtom } from "jotai";
import { FC, useEffect } from "react";
import dashboard from "service/dashboard";
import { renderEnDate, tableCellFixed } from "utils/index";
import { atomFormDashboard } from "../store";

const EventSlots: FC = () => {
  const { data, run, loading } = useRequest(dashboard.slots, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  const [form] = useAtom(atomFormDashboard);

  const fetch = (values?: any) => {
    run({
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
        style={{
          margin: 0,
        }}
        noShadow
        hideCreateButton
        customHeaderTitle="Event/Tax Slots"
        loading={loading}
        total={data?.total || 0}
        dataSource={data?.items || []}
        refresh={(values) => run({ ...form, ...values })}
        limit={10}
        columns={[
          {
            ...tableCellFixed(150),
            dataIndex: "name",
            title: "Name",
            render: (_, record) => (
              <div className="flex flex-col">
                <span className="text-md text-gray-600 font-medium">
                  {record.name}
                </span>
                <span className="text-sm">
                  {renderEnDate(record.start_date)} -{" "}
                  {renderEnDate(record.end_date)}
                </span>
              </div>
            ),
          },
          {
            ...tableCellFixed(100),
            dataIndex: "status",
            title: "Status",
            render: (_, record) => (
              <RenderProductStatus status={record.status} />
            ),
          },
          {
            valueType: "string",
            title: "Slot",
            render: (_, record) => {
              return (
                <IProgress
                  toolTipInfo={`${record.limit} / ${record.original_limit}`}
                  percent={
                    record.original_limit === 0
                      ? 0
                      : (record.limit * 100) / record.original_limit
                  }
                  days={
                    record.original_limit === 0
                      ? 0
                      : ((record.limit * 100) / record.original_limit).toFixed(
                          1
                        ) + "%"
                  }
                />
              );
            },
          },
          {
            dataIndex: "total_click",
            title: "Clicks",
            render: (_, record) => record.total_click,
          },
        ]}
      />
    </>
  );
};

export default EventSlots;
