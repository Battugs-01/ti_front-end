import { Button, DatePicker, Divider, Input, Tabs } from "antd";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { chooseDate } from "utils/index";

interface TableHeaderProps {
  refreshList: () => void;
  setSearch: (value: string) => void;
  search: string;
  setFilter: any;
  filter: any;
  submitFilter: () => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  refreshList,
  setSearch,
  search,
  setFilter,
  filter,
  submitFilter,
}) => {
  const intl = useIntl();
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    filter.start_date ? dayjs(filter.start_date) : dayjs().subtract(3, "month"),
    filter.end_date ? dayjs(filter.end_date) : dayjs(),
  ]);
  const [open, setOpen] = useState(false);

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
          open={open}
          onOpenChange={(isOpen) => setOpen(isOpen)}
          value={dateRange}
          panelRender={(originPanel) => {
            return (
              <div className="flex items-center justify-between p-3">
                <div className="custom-ant-tabs-tab">
                  <Tabs
                    tabPosition="left"
                    onChange={(value) => {
                      const [startDate, endDate] = chooseDate(value);
                      setDateRange([startDate, endDate]);
                      setFilter({
                        ...filter,
                        start_date: startDate.format("YYYY-MM-DD"),
                        end_date: endDate.format("YYYY-MM-DD"),
                      });
                    }}
                    items={tabItems?.map((el: any) => ({
                      label: el.label,
                      key: el.value,
                      value: el.value,
                    }))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div>{originPanel}</div>
                  <div>
                    <Divider />
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Input type="text" name="start_date" value={filter.start_date} style={{width: "130px"}}/>
                        <div>-</div>
                        <Input type="text" name="end_date" value={filter.end_date} style={{width: "130px"}}/>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button 
                          type="default" 
                          onClick={() => setOpen(false)}
                        >
                          <FormattedMessage id="cancel" />
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => {
                            submitFilter();
                            setOpen(false);
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
          placeholder={[
            intl.formatMessage({ id: "select_start_date" }),
            intl.formatMessage({ id: "select_end_date" }),
          ]}
          size="large"
          onChange={(values) => {
            if (values?.[0] && values?.[1]) {
              setDateRange([
                values[0] as dayjs.Dayjs,
                values[1] as dayjs.Dayjs,
              ]);
              setFilter({
                ...filter,
                start_date: values[0].format("YYYY-MM-DD"),
                end_date: values[1].format("YYYY-MM-DD"),
              });
            }
          }}
        />
      }
    />
  );
};

export default TableHeader;
