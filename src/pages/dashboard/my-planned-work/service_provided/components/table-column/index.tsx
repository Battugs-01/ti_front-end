import { ProColumns } from "@ant-design/pro-table";
import MaskedValue from "components/masked/masked-value";
import dayjs from "dayjs";
import { useState } from "react";
import { PlannedWorksType } from "service/my_planned_work/types";
import { AlertCircle, Check } from "untitledui-js-base";
import { parseMongolianGender, parseMongolianID } from "utils/index";

export const ServiceProvidedTableColumns = (
  intl: any
): ProColumns<PlannedWorksType>[] => {
  const [visibleRows, setVisibleRows] = useState<{ [key: string]: boolean }>(
    {}
  );
  return [
    {
      title: intl.formatMessage({ id: "register" }),
      dataIndex: "rd",
      width: 150,
      render: (value, record) => {
        const isVisible = visibleRows[record.id] || false;
        const handleEyeClick = () => {
          setVisibleRows((prev) => ({
            ...prev,
            [record.id]: !isVisible,
          }));
        };
        return (
          <MaskedValue
            value={value as string}
            isVisible={isVisible}
            onToggle={handleEyeClick}
          />
        );
      },
    },
    {
      title: intl.formatMessage({ id: "phone" }),
      dataIndex: "phone",
      width: 150,
    },
    {
      title: intl.formatMessage({ id: "age" }),
      dataIndex: "age",
      width: 50,
      align: "center",
      render: (_: any, record: PlannedWorksType): React.ReactNode => (
        <div className="flex items-center justify-center">
          {parseMongolianID(record?.rd)}
        </div>
      ),
    },
    {
      title: intl.formatMessage({ id: "gender" }),
      dataIndex: "gender",
      width: 120,
      render: (_: any, record: PlannedWorksType): any => {
        const gender = parseMongolianGender(record?.rd);
        return (
          <div className="">
            {gender === "male"
              ? intl.formatMessage({ id: "male" })
              : intl.formatMessage({ id: "female" })}
          </div>
        );
      },
    },
    {
      title: intl.formatMessage({ id: "by_hcu_date" }),
      dataIndex: "levels",
      width: 130,
      render: (_: any, record: PlannedWorksType): React.ReactNode => {
        const date = record?.comp_date;
        if (!date || dayjs(date).format("YYYY-MM-DD") === "0001-01-01") {
          return <div className="flex items-center">-</div>;
        }
        return (
          <div className="flex items-center">
            {dayjs(date).format("YYYY-MM-DD")}
          </div>
        );
      },
    },
    {
      title: intl.formatMessage({ id: "care_foci" }),
      dataIndex: "cfs_score",
      align: "center",
      width: 150,
      render: (_: any, record: PlannedWorksType): React.ReactNode => (
        <div className="text-gray-400  ">
          <span className="text-gray-900 font-medium">
            {record?.care_foci_count}
          </span>
          /31
        </div>
      ),
    },
    {
      title: intl.formatMessage({ id: "dp_date" }),
      dataIndex: "levels",
      width: 130,
      render: (_: any, record: PlannedWorksType): React.ReactNode => {
        const date = record?.dp_date;
        if (!date || dayjs(date).format("YYYY-MM-DD") === "0001-01-01") {
          return <div className="flex items-center">-</div>;
        }
        return (
          <div className="flex items-center">
            {dayjs(date).format("YYYY-MM-DD")}
          </div>
        );
      },
    },
    {
      title: intl.formatMessage({ id: "assigned_to_me" }),
      dataIndex: "cfs_score",
      align: "center",
      render: (_: any, record: PlannedWorksType): React.ReactNode => (
        <div>{record?.allocated_count}</div>
      ),
    },
    {
      title: intl.formatMessage({ id: "is_resolved" }),
      dataIndex: "cfs_score",
      align: "center",
      render: (_: any, record: PlannedWorksType): React.ReactNode => (
        <div
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium truncate ${
            record?.resolved_count === record?.allocated_count
              ? "bg-[#ECFDF3] text-[#027A48]"
              : "bg-[#fffaeb] text-[#b54708]"
          }  gap-1`}
        >
          {record?.resolved_count === record?.allocated_count ? (
            <Check size="15" />
          ) : (
            <AlertCircle size="15" color="#f99009" />
          )}
          <div>
            <span className="">{record?.resolved_count}</span>/
            {record?.allocated_count}
          </div>
        </div>
      ),
    },
  ];
};
