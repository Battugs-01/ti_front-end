import { PageLoading } from "@ant-design/pro-layout";
import { ITable } from "components/index";
import { FormattedMessage, useIntl } from "react-intl";
import { Valuation } from "service/screening_list/type";

interface QuistionHistoryProps {
  data: Valuation | undefined;
}

const General: React.FC<QuistionHistoryProps> = ({ data }) => {
  const intl = useIntl();

  const generalData = [
    {
      title: "Танд бусад хүмүүс хэрхэн хандаж, харилцаасай гэж хүсдэг вэ?",
      value: data?.treat_interact,
    },
    {
      title: "Таны амьдралын бахархал юу вэ?",
      value: data?.life_pride,
    },
    {
      title: "Одоо таны амьдралын үнэт зүйл  юу вэ?",
      value: data?.life_value,
    },
    {
      title: "Танд бусад хүмүүс хэрхэн хандаж, харилцаасай гэж хүсдэг вэ?",
      value: data?.priority_service,
    },
  ];
  if (!data) return <PageLoading />;
  return (
    <div>
      <div className="text-xl font-semibold flex flex-row gap-4">
        <FormattedMessage id="general" />
      </div>
      <ITable
        className="p-0 remove-padding-table mt-4"
        dataSource={generalData}
        columns={[
          {
            title: intl.formatMessage({ id: "question" }),
            dataIndex: "title",
            render: (value) => {
              return <div>{value}</div>;
            },
          },
          {
            title: intl.formatMessage({ id: "answer" }),
            dataIndex: "value",
            render: (value) => {
              return <div>{value}</div>;
            },
          },
        ]}
        hidePagination
        scroll={1000}
      />
    </div>
  );
};

export default General;
