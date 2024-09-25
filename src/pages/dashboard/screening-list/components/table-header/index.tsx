import { Segmented } from "antd";
import { FormattedMessage } from "react-intl";
import { PopoverFilter } from "components/filter";
import { ScreeningTab } from "config";
import InitTableHeader from "components/table-header";

interface TableHeaderProps {
  setTab: (tab: ScreeningTab) => void;
  refreshList: () => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ setTab, refreshList }) => {
  return (
    <InitTableHeader
      hideTitle
      refresh={refreshList}
      hideCreate
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
