import ProForm, { ProFormText } from "@ant-design/pro-form";
import { Button, DatePicker, Divider, Tabs } from "antd";
import { TabsType } from "antd/lib/tabs";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { chooseDate } from "utils/index";

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
  const dateRef = useRef<any>(null);
  const tabItems: any = [
    {
      label: intl.formatMessage({ id: "today" }),
      value: "today",
    },
    {
      label: intl.formatMessage({ id: "tommorow" }),
      value: "tommorow",
    },
    {
      label: intl.formatMessage({ id: "this_week" }),
      value: "this_week",
    },
    {
      label: intl.formatMessage({ id: "next_week" }),
      value: "next_week",
    },
    {
      label: intl.formatMessage({ id: "this_month" }),
      value: "this_month",
    },
    {
      label: intl.formatMessage({ id: "next_month" }),
      value: "next_month",
    },
    {
      label: intl.formatMessage({ id: "this_year" }),
      value: "this_year",
    },
    {
      label: intl.formatMessage({ id: "next_year" }),
      value: "next_year",
    },
  ];
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
          ref={dateRef}
          panelRender={(originPanel) => {
            return (
              <div className="flex items-center justify-between p-3">
                <div className="custom-ant-tabs-tab">
                  <Tabs
                    tabPosition="left"
                    onChange={(value) => {
                      console.log(dateRef.current);
                      setFilter({
                        ...filter,
                        start_date: chooseDate(value)[0].format("YYYY-MM-DD"),
                        end_date: chooseDate(value)[1].format("YYYY-MM-DD"),
                      });
                    }}
                    items={tabItems?.map((el: any, key: number) => {
                      return {
                        label: el.label,
                        key: el.value,
                        value: el.value,
                      };
                    })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div>{originPanel}</div>

                  <div>
                    <Divider />
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-3 items-center"></div>
                        <Button type="default">
                          <FormattedMessage id="cancel" />
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => {
                            setFilter({
                              ...filter,
                              start_date: dayjs().format("YYYY-MM-DD"),
                              end_date: dayjs().format("YYYY-MM-DD"),
                            });
                          }}
                        >
                          <FormattedMessage id="search" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
          className="w-max"
          value={filter}
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
