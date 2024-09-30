import { PageLoading } from "@ant-design/pro-layout";
import BooleanBadge from "components/badge/boolean";
import { ITable } from "components/index";
import { FormattedMessage, useIntl } from "react-intl";
import { CareFocusItem } from "service/screening_list/type";

interface CareFociProps {
  data: CareFocusItem[] | undefined;
  name: any;
}

const CareFoci: React.FC<CareFociProps> = ({ data, name }) => {
  const intl = useIntl();

  if (!data) return <PageLoading />;
  return (
    <div>
      <div className="text-xl font-semibold flex flex-row gap-4">
        <FormattedMessage id={name} />
      </div>
      <ITable
        className="p-0 remove-padding-table mt-4"
        dataSource={data}
        columns={[
          {
            title: intl.formatMessage({ id: "name" }),
            dataIndex: "name",
            width: 600,
            className: "text-left",
            render: (value) => {
              return <div className="flex items-center">{value}</div>;
            },
          },
          {
            title: intl.formatMessage({ id: "rating" }),
            dataIndex: "name",
            width: 200,
            render: (_, record) => {
              return <BooleanBadge status={record?.is_have} />;
            },
          },
          {
            title: intl.formatMessage({ id: "description" }),
            dataIndex: "name",
            render: (_, record) => {
              return <div>{record?.desc}</div>;
            },
          },
        ]}
        hidePagination
        scroll={1000}
      />
    </div>
  );
};

export default CareFoci;
