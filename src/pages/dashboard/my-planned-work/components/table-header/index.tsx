import { DatePicker } from "antd";
import { PopoverFilter } from "components/filter";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useIntl } from "react-intl";
import { ScreeningListFilter } from "../filter";

interface TableHeaderProps {
  refreshList: () => void;
  setSearch: (value: string) => void;
  search: string;
  onFinishFilter: (values: any) => Promise<void>;
  setFilter: any;
  filter: any;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  refreshList,
  setSearch,
  search,
  onFinishFilter,
  setFilter,
  filter,
}) => {
  const intl = useIntl();
  return (
    <InitTableHeader
      filter={
        <PopoverFilter>
          <ScreeningListFilter onFinish={onFinishFilter} />
        </PopoverFilter>
      }
      hideTitle
      refresh={refreshList}
      hideCreate
      search={search}
      setSearch={setSearch}
      leftContent={
        <DatePicker.RangePicker
          className="w-max"
          placeholder={[
            intl.formatMessage({ id: "select_start_date" }),
            intl.formatMessage({ id: "select_end_date" }),
          ]}
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
