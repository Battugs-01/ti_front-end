import { Segmented } from "antd";
import InitTableHeader from "components/table-header";
import { ScreeningTab } from "config";
import { FormattedMessage } from "react-intl";

interface TableHeaderProps {
  setTab: (tab: ScreeningTab) => void;
  refreshList: () => void;
  setSearch: (value: string) => void;
  search: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  setTab,
  refreshList,
  setSearch,
  search,
}) => {
  return (
    <InitTableHeader
      hideTitle
      refresh={refreshList}
      hideCreate
      search={search}
      setSearch={setSearch}
      leftContent={
        <Segmented
          onChange={(value: any) => {
            setTab(value);
          }}
          className="mt-0"
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
          size="large"
        />
      }
    />
  );
};

export default TableHeader;
