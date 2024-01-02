import { useRequest } from "ahooks";
import { notification } from "antd";
import { ExportButton, ITable, Star } from "components/index";
import { FC, useEffect } from "react";
import review from "service/review";
import { Review } from "service/review/type";
import { exportFromTable } from "utils/export";

interface Props {
  customerId?: number;
}

const ReviewsTab: FC<Props> = ({ customerId }) => {
  const { run, data, loading } = useRequest(review.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    if (customerId) {
      run({
        page: 0,
        limit: 20,
        customer_id: customerId,
      });
    }
  }, [customerId]);

  return (
    <>
      <ITable<Review>
        style={{ marginTop: "20px" }}
        loading={loading}
        hideCreateButton
        toolbarItems={
          <ExportButton
            onClick={() => {
              exportFromTable(
                ["Reviews"],
                window.document.getElementById("main-table") as HTMLElement,
                window
              );
            }}
          />
        }
        total={data?.total || 0}
        dataSource={data?.items}
        refresh={(values) => run({ customer_id: customerId, ...values })}
        columns={[
          {
            dataIndex: "service_name",
            valueType: "string",
            title: "Name",
            render: (_, record) => (
              <span className="font-semibold">{record.service?.name}</span>
            ),
          },
          {
            dataIndex: "total_rating",
            valueType: "string",
            title: "Total Rating",
            render: (_, record) => <Star value={record.total_rating} />,
          },
          {
            dataIndex: "rate1",
            valueType: "string",
            title: "Taste",
            render: (_, record) => <Star value={record.rate1} />,
          },
          {
            dataIndex: "rate2",
            valueType: "string",
            title: "Environment",
            render: (_, record) => <Star value={record.rate2} />,
          },
          {
            dataIndex: "rate3",
            valueType: "string",
            title: "Service",
            render: (_, record) => <Star value={record.rate3} />,
          },
          {
            dataIndex: "rate4",
            valueType: "string",
            title: "Price",
            render: (_, record) => <Star value={record.rate4} />,
          },

          {
            dataIndex: "comment",
            valueType: "string",
            title: "Comment",
          },
          {
            dataIndex: "created_at",
            valueType: "date",
            title: "Date",
          },
        ]}
      />
    </>
  );
};

export default ReviewsTab;
