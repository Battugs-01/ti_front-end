import ProForm, {
  ProFormDateRangePicker,
  ProFormSelect,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { notification } from "antd";
import { ExportButton, PopoverFilter, Star } from "components/index";
import { ITable } from "components/table";
import dayjs from "dayjs";
import { useEffect } from "react";
import review from "service/review";
import { Review } from "service/review/type";
import { tableCellFixed } from "utils/index";
import { Dashboard } from "./dashboard";
import { exportFromTable } from "utils/export";

type Props = {
  serviceId: number;
};
export const ReviewTab = ({ serviceId }: Props) => {
  const list = useRequest(review.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  useEffect(() => {
    if (serviceId) run();
  }, [serviceId]);

  const run = (values?: any) =>
    serviceId && list.run({ service_id: serviceId, ...values });

  return (
    <>
      <Dashboard serviceId={serviceId} />
      <div className="mt-6">
        <ITable<Review>
          hideCreateButton
          total={list.data?.total}
          dataSource={list.data?.items}
          toolbarItems={
            <div className="flex gap-2">
              <ExportButton
                onClick={() => {
                  exportFromTable(
                    ["Reviews"],
                    window.document.getElementById("main-table") as HTMLElement,
                    window
                  );
                }}
              />
              <PopoverFilter>
                <ProForm
                  onValuesChange={(curr, old) => {
                    run({ ...old, ...curr });
                  }}
                  submitter={false}
                >
                  <ProFormSelect
                    name={"stars"}
                    mode="multiple"
                    options={[
                      {
                        label: "1",
                        value: 1,
                      },
                      {
                        label: "2",
                        value: 2,
                      },
                      {
                        label: "3",
                        value: 3,
                      },
                      {
                        label: "4",
                        value: 4,
                      },
                      {
                        label: "5",
                        value: 5,
                      },
                    ]}
                  />
                  <ProFormDateRangePicker name={"created_at"} />
                </ProForm>
              </PopoverFilter>
            </div>
          }
          refresh={run}
          columns={[
            {
              ...tableCellFixed(200),
              dataIndex: "name",
              title: "Name",
              render: (_, record) => record.customer?.first_name,
            },
            {
              ...tableCellFixed(200),
              dataIndex: "review",
              title: "Review",
              render: (_, record) => <Star value={record.total_rating} />,
            },
            {
              ...tableCellFixed(200),
              dataIndex: "comment",
              title: "Comment",
            },
            {
              ...tableCellFixed(200),
              dataIndex: "created_at",
              title: "Date",
              render: (_, record) =>
                dayjs(record.created_at).format("MMM D, YYYY HH:mm"),
            },
          ]}
          RemoveModelConfig={{
            action: review.remove,
            config: (record) => ({
              uniqueKey: record?.id ?? 0,
              display: record?.comment?.slice(0, 50),
              title: "Delete",
              body: "delete",
            }),
          }}
        />
      </div>
    </>
  );
};
