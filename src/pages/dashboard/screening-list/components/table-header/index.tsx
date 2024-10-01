import { Radio, Segmented } from "antd";
import { PopoverFilter } from "components/filter";
import InitTableHeader from "components/table-header";
import { ScreeningTab } from "config";
import { FormattedMessage } from "react-intl";
import { ScreeningListFilter } from "../filter";

interface TableHeaderProps {
  setTab: (tab: ScreeningTab) => void;
  refreshList: () => void;
  setSearch: (value: string) => void;
  search: string;
  onFinishFilter: (values: any) => Promise<void>;
  tab: ScreeningTab;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  setTab,
  refreshList,
  setSearch,
  search,
  onFinishFilter,
  tab,
}) => {
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
        <Radio.Group
          onChange={(e) => {
            setTab(e.target.value);
          }}
          value={tab}
          optionType="button"
          className="mt-0"
          size="large"
          options={[
            {
              label: <FormattedMessage id="all" />,
              value: ScreeningTab.all,
            },
            {
              label: <FormattedMessage id="level" values={{ number: 1 }} />,
              value: ScreeningTab.level_1,
            },
            {
              label: <FormattedMessage id="level" values={{ number: 2 }} />,
              value: ScreeningTab.level_2,
            },
            {
              label: <FormattedMessage id="level" values={{ number: 3 }} />,
              value: ScreeningTab.level_3,
            },
          ]}
        />
      }
    />
  );
};

export default TableHeader;
