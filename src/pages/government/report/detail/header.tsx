import { ProFormRadio } from "@ant-design/pro-form";
import { FilterForm } from "components/filter";
import React, { Fragment, useState } from "react";
import { FilterReportButton, FilterTypeline } from "service/gov-report";
import { calculateDeadlineDate } from "utils/index";
import FileCheck from "assets/government/icons/fileCheck.svg";
import { RadioChangeEvent } from "antd";

type HeaderType = {
  changeTab?: (e: RadioChangeEvent) => void;
  tab?: String;
};

const Header: React.FC<HeaderType> = ({ changeTab, tab }) => {
  const [filter, setFilter] = useState<object>({
    page: 0,
    pageSize: 20,
  });

  const buttons: FilterReportButton[] = [
    {
      value: FilterTypeline.A13,
      label: "Б-AС-1.3",
    },
    {
      value: FilterTypeline.A14,
      label: "Б-AС-1.4",
    },
    {
      value: FilterTypeline.A15,
      label: "Б-AС-1.5",
    },
    {
      value: FilterTypeline.A16,
      label: "Б-AС-1.6",
    },
  ];
  return (
    <Fragment>
      <FilterForm
        initialValues={{
          ...filter,
        }}
        onValuesChange={(curr) => {
          if (curr.full_date) {
            curr.deadline = undefined;
          }
          if (curr.deadline >= 0) {
            curr.full_date = calculateDeadlineDate(curr.deadline)?.map((el) =>
              el.format("YYYY/MM/DD")
            );
          }
          if (!curr.full_date) curr.full_date = undefined;
          // if (curr.search || !curr.search)
          //   debounceSet.run({ ...filter, ...curr });
          else setFilter({ ...filter, ...curr });
        }}
        customHeadFilters={
          <ProFormRadio.Group
            name={"typeline"}
            radioType="button"
            fieldProps={{
              size: "large",
              value: tab,
              onChange: changeTab,
            }}
            options={buttons?.map((el) => ({
              ...el,
              onChange: changeTab,
            }))}
            initialValue={tab}
          />
        }
        customState={
          <div className="flex p-4 items-center gap-1">
            <img src={FileCheck} alt="file" width={16} />
            <div className="text-base">
              Нийт ирсэн :{" "}
              <span className="text-gray-700 font-bold">13 / </span> 14
            </div>
          </div>
        }
      />
    </Fragment>
  );
};

export default Header;
