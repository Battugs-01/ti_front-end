import { StarFilled } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { notification } from "antd";
import { ITable } from "components/table";
import { useAtom } from "jotai";
import { FC, useEffect } from "react";
import dashboard from "service/dashboard";
import { tableCellFixed } from "utils/index";
import { atomFormDashboard } from "../store";

const TopReviews: FC = () => {
  const api = useRequest(dashboard.reviews, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const [form] = useAtom(atomFormDashboard);

  const fetch = (values?: any) => {
    api.run({
      ...values,
      ...form,
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
        dataSource={api.data?.items || []}
        refresh={(values) => fetch({ ...values, ...form })}
        customHeaderTitle="Top Reviews"
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
              </div>
            ),
          },
          {
            ...tableCellFixed(100),
            dataIndex: "average_total_rating",
            title: "Avg. rating",
            render: (_, record) => (
              <div className="flex item-center gap-2">
                <StarFilled className="text-yellow-500" />
                <span>
                  {record.average_total_rating === 0
                    ? 0
                    : record.average_total_rating?.toFixed(1)}
                </span>
              </div>
            ),
          },
          {
            dataIndex: "review_count",
            title: "Total reviews",
          },

          {
            dataIndex: "total_click",
            valueType: "string",
            title: "Clicks",
          },
        ]}
      />
    </>
  );
};

export default TopReviews;
