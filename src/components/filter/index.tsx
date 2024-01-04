import { FilterOutlined } from "@ant-design/icons";
import ProForm, {
  ProFormDateRangePicker,
  ProFormInstance,
  ProFormItem,
  ProFormProps,
  ProFormRadio,
  ProFormText,
} from "@ant-design/pro-form";
import { Button, Divider, Popover, Radio } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { BsList } from "react-icons/bs";
import { FilterDeadline, FilterFormButton } from "types";
import { IfCondition } from "..";
import { FiCalendar } from "react-icons/fi";
import { RiFilter3Fill } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";

type Props = ProFormProps & {
  showMap?: boolean;
  filters?: React.ReactNode;
  customHeadFilters?: React.ReactNode;
  showGroupButton?: boolean;
  onMapClick?: () => void;
  hideFilter?: boolean;
  hideSearch?: boolean;
  hideDatePicker?: boolean;
  isMapShowing?: boolean;
};
export const FilterForm = ({
  showMap = false,
  filters,
  showGroupButton = true,
  customHeadFilters,
  hideFilter = false,
  onMapClick,
  initialValues,
  isMapShowing,
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

  const checkIfChanged = () => {
    const { deadline, full_date, ...rest } =
      form.current?.getFieldsValue() || {};
    const arr = Object.values(rest || {});
    return arr.some((el: any) => (el?.length || 0) > 0 && el);
  };

  const content = (
    <ProForm
      {...rest}
      formRef={form}
      layout="inline"
      submitter={false}
      className="space-y-2 flex items-center justify-between flex-wrap"
    >
      <div className="flex items-center flex-wrap gap-2 md:gap-0">
        <IfCondition
          condition={showMap}
          whenTrue={
            <ProFormItem>
              <Button
                size="large"
                type="primary"
                className="flex items-center  space-x-2"
                icon={isMapShowing ? <BsList /> : <img src="/svg/map.svg" />}
                onClick={onMapClick}
              >
                {isMapShowing ? "List" : "Map"}
              </Button>
            </ProFormItem>
          }
        />
        <div
          className="gap-2 custom-ant-radio-button relative "
          // onClick={() => setSelectedDate(false)}
        >
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

          <div className={` absolute right-0 top-0 z-10 cursor-pointer h-10 `}>
            <div
              className={`custom-ant-date-range-picker ${
                isSelectedDate
                  ? "w-80 opacity-100 -mt-[1px] -mr-4 md:mr-0 animate-scaleX"
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

      <div className="flex items-center flex-wrap gap-2">
        <div className={`relative ${hideDatePicker && "hidden"}`}>
          <div
            className={`${
              isSelectedDate ? "" : "hover:border-purple-500"
            } border border-solid border-transparent  rounded-md absolute right-0 z-10 cursor-pointer h-10 `}
          >
            <div
              className={`custom-ant-date-range-picker ${
                isSelectedDate
                  ? "w-80 opacity-100 mr-0 -mt-[1px] sm:-mr-4 animate-scaleX"
                  : " w-36 opacity-0 ml-0"
              } `}
            >
              <ProFormDateRangePicker
                name="full_date"
                className="text-gray-700 cursor-pointer"
                allowClear={false}
                hidden={hideDatePicker}
                fieldProps={{
                  size: "large",
                  className: "text-sm",
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
          {/* <div
            className={`${
              isSelectedDate ? "w-[19rem]" : "w-36"
            } flex justify-end `}
          >
            <Button
              size="large"
              className={`flex items-center   gap-2 font-semibold text-sm ${
                isSelectedDate ? "opacity-0" : "opacity-100"
              } `}
              icon={<FiCalendar size={20} className=" text-primary" />}
            >
              Custom date
            </Button>
          </div> */}
        </div>
        <ProFormText
          name={"search"}
          placeholder={"Search"}
          hidden={hideSearch}
          fieldProps={{
            size: "large",
            className: "text-sm",
            prefix: <BiSearch color="#66708066" size={20} />, // Add the icon as a prefix here
          }}
        />
        <Popover
          trigger="click"
          content={
            <div style={{ width: 250 }} className="p-3">
              {filters}
              <Divider type="horizontal" />
              <div className="flex items-center justify-end">
                <Button
                  type="text"
                  className="text-primary text-sm"
                  onClick={() => {
                    form.current?.resetFields();
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>
          }
        >
          <Button
            size="large"
            className={`flex items-center  text-sm gap-2 font-semibold  relative ${
              hideFilter && "hidden"
            }`}
            icon={<RiFilter3Fill className="text-lg text-primary" />}
          >
            {checkIfChanged() && (
              <div className="absolute -top-1 -right-1 w-2 z-[10] h-2 bg-red-500 rounded-full"></div>
            )}
            Filters
          </Button>
        </Popover>
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
