import { DatePicker } from "antd";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useIntl } from "react-intl";

interface TableHeaderProps {
  refreshList: () => void;
  setSearch: (value: string) => void;
  search: string;
  setFilter: any;
  filter: any;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  refreshList,
  setSearch,
  search,
  setFilter,
  filter,
}) => {
  const intl = useIntl();
  return (
    <InitTableHeader
      hideTitle
      refresh={refreshList}
      hideCreate
      search={search}
      setSearch={setSearch}
      fileName="My Planned work"
      leftContent={
        <DatePicker.RangePicker
          className="w-max"
          placeholder={[
            intl.formatMessage({ id: "select_start_date" }),
            intl.formatMessage({ id: "select_end_date" }),
          ]}
          size="large"
          onChange={(values) => {
            setFilter({
              ...filter,
              start_date: dayjs(values?.[0]?.toDate()).format("YYYY-MM-DD"),
              end_date: dayjs(values?.[1]?.toDate()).format("YYYY-MM-DD"),
            });
          }}
          defaultValue={[
            filter.start_date
              ? dayjs(filter.start_date)
              : dayjs().subtract(3, "month"),
            filter.end_date ? dayjs(filter.end_date) : dayjs(),
          ]}
        />
      }
    />
  );
};

export default TableHeader;
