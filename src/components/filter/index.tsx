import { FilterOutlined } from "@ant-design/icons";
import ProForm, {
  ProFormDateRangePicker,
  ProFormInstance,
  ProFormProps,
  ProFormRadio,
} from "@ant-design/pro-form";
import { Button, Popover } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FilterDeadline, FilterFormButton } from "types";
import { FiCalendar } from "react-icons/fi";
import { RiFilter3Fill } from "react-icons/ri";

type Props = ProFormProps & {
  filters?: React.ReactNode;
  customHeadFilters?: React.ReactNode;
  showGroupButton?: boolean;
  hideFilter?: boolean;
  hideSearch?: boolean;
  hideDatePicker?: boolean;
};
export const FilterForm = ({
  filters,
  showGroupButton = true,
  customHeadFilters,
  hideFilter = false,
  initialValues,

  hideSearch = false,
  hideDatePicker = false,
  ...rest
}: Props) => {
  const [isCustomDate, setCustomDate] = useState(false);
  const [isSelectedDate, setSelectedDate] = useState(false);

  const buttons: FilterFormButton[] = [
    {
      value: FilterDeadline.FullHours,
      label: "24 цаг",
      onChange: () => setSelectedDate(false),
    },
    {
      value: FilterDeadline.Week,
      label: "7 хоног",
      onChange: () => setSelectedDate(false),
    },
    {
      value: FilterDeadline.Month,
      label: "30 хоног",
      onChange: () => setSelectedDate(false),
    },
    {
      value: FilterDeadline.ThreeMonth,
      label: "3 сар",
      onChange: () => setSelectedDate(false),
    },
    {
      value: FilterDeadline.SixMonth,
      label: "6 сар",
      onChange: () => setSelectedDate(false),
    },
    {
      value: FilterDeadline.Year,
      label: "1 жил",
      onChange: () => setSelectedDate(false),
    },
    {
      value: FilterDeadline.All,
      label: "Сонгох",
      onChange: (e) => {
        console.log(e);
        setCustomDate(true);
      },
    },
  ];

  const form = useRef<ProFormInstance>();

  useEffect(() => {
    form.current?.setFieldsValue({ ...initialValues });
    if (initialValues?.deadline) {
      setCustomDate(false);
    }
  }, [initialValues, isCustomDate]);

  const content = (
    <ProForm
      {...rest}
      formRef={form}
      layout="inline"
      submitter={false}
      className="space-y-2 flex items-center justify-between flex-wrap"
    >
      <div className="flex items-center flex-wrap gap-2 md:gap-0">
        <div className="gap-2 custom-ant-radio-button relative ">
          <ProFormRadio.Group
            hidden={!showGroupButton}
            name={"deadline"}
            radioType="button"
            fieldProps={{
              onChange: () => setSelectedDate(false),
              size: "large",
            }}
            options={buttons?.map((el) => ({ ...el }))}
            initialValue={FilterDeadline.Month}
          />
          <div className={`absolute right-0 top-0 z-10 cursor-pointer h-10 `}>
            <div
              className={`custom-ant-date-range-picker ${
                isSelectedDate
                  ? "w-80 opacity-0 -mt-[1px] -mr-4 md:mr-0 animate-scaleX"
                  : "opacity-0 ml-0 mr-0 w-24"
              } `}
            >
              <ProFormDateRangePicker
                name="full_date"
                className="text-gray-700 cursor-pointer m-0"
                allowClear={false}
                hidden={hideDatePicker}
                fieldProps={{
                  size: "large",
                  className: "text-sm m-0",
                  suffixIcon: <FiCalendar className="text-gray-700 text-xl" />,
                  onChange(_, formatString) {
                    if (formatString.length === 2) {
                      setSelectedDate(true);
                    }
                  },
                }}
              />
            </div>
          </div>
        </div>
        {customHeadFilters}
      </div>
    </ProForm>
  );

  return (
    <>
      <div className="hidden md:block">{content}</div>
      <div className="md:hidden block">
        <PopoverFilter children={content} />
      </div>
    </>
  );
};

export const PopoverFilter = ({ children }: { children: any }) => {
  return (
    <Popover
      trigger="click"
      content={<div className="p-3 w-80 min-[350]">{children}</div>}
    >
      <Button
        size="large"
        className={`flex items-center  gap-2 font-semibold text-sm `}
        icon={<RiFilter3Fill className="text-lg text-primary" />}
      >
        Filters
      </Button>
    </Popover>
  );
};
