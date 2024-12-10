import { Flex, Radio, Tag } from "antd";
import { PopoverFilter } from "components/filter";
import InitTableHeader from "components/table-header";
import { ScreeningTab } from "config";
import { FormattedMessage } from "react-intl";
import { ScreeningListType } from "service/screening_list/type";
import { ListType } from "service/type";
import { ScreeningListFilter } from "../filter";

interface TableHeaderProps {
  setTab: (tab: ScreeningTab) => void;
  refreshList: () => void;
  setSearch: (value: string) => void;
  search: string;
  onFinishFilter: (values: any) => Promise<void>;
  tab: ScreeningTab;
  screenData: ListType<ScreeningListType[]> | undefined;
}

const TableHeader: React.FC<TableHeaderProps> = ({ setTab, refreshList, setSearch, search, onFinishFilter, tab, screenData }) => {
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
      fileName="Case list"
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
              label: (
                <Flex gap={5} justify="space-between" align="center">
                  <FormattedMessage id="all" />
                  <Tag bordered={false}>{screenData?.total}</Tag>
                </Flex>
              ),
              value: ScreeningTab.all,
            },
            {
              label: (
                <Flex gap={5} justify="space-between" align="center">
                  <FormattedMessage id="level" values={{ number: 1 }} />
                  <Tag bordered={false}>{screenData?.total_level_1}</Tag>
                </Flex>
              ),
              value: ScreeningTab.level_1,
            },
            {
              label: (
                <Flex gap={5} justify="space-between" align="center">
                  <FormattedMessage id="level" values={{ number: 2 }} />
                  <Tag bordered={false}>{screenData?.total_level_2}</Tag>
                </Flex>
              ),
              value: ScreeningTab.level_2,
            },
            {
              label: (
                <Flex gap={5} justify="space-between" align="center">
                  <FormattedMessage id="level" values={{ number: 3 }} />
                  <Tag bordered={false}>{screenData?.total_level_3}</Tag>
                </Flex>
              ),
              value: ScreeningTab.level_3,
            },
          ]}
        />
      }
    />
  );
};

export default TableHeader;
