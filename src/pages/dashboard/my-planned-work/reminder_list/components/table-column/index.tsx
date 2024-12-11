import { ProColumns } from "@ant-design/pro-table";
import IBadge from "components/badge";
import LevelBadge from "components/badge/level";
import MaskedValue from "components/masked/masked-value";
import dayjs from "dayjs";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { ScreeningListType } from "service/screening_list/type";
import { parseMongolianGender, parseMongolianID } from "utils/index";

export const ReminderListTableColumns = (
  intl: any
): ProColumns<ScreeningListType>[] => {
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
    },
    {
      title: intl.formatMessage({ id: "age" }),
      dataIndex: "age",
      align: "center",
      render: (_: any, record: ScreeningListType): React.ReactNode => (
        <div className="flex items-center justify-center">
          {parseMongolianID(record?.rd)}
        </div>
      ),
    },
    {
      title: intl.formatMessage({ id: "gender" }),
      dataIndex: "gender",
      render: (_: any, record: ScreeningListType): any => {
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
      title: intl.formatMessage({ id: "screening_date" }),
      dataIndex: "levels",
      render: (_: any, record: ScreeningListType): React.ReactNode => {
        const date = record?.created_at;
        if (!date || dayjs(date).format("YYYY-MM-DD") === "0001-01-01") {
          return <div className="flex items-center">-</div>;
        }
        return (
          <div className="flex items-center">
            {dayjs(date).format("YYYY/MM/DD")}
          </div>
        );
      },
    },
    {
      title: intl.formatMessage({ id: "levels" }),
      dataIndex: "levels",
      render: (_, record) => <LevelBadge status={record?.assessment?.level} />,
    },
    {
      title: intl.formatMessage({ id: "by_hcu_date" }),
      dataIndex: "by_hcu_date",
      render: (_: any, record: ScreeningListType): React.ReactNode => {
        const date = record?.assessment?.date_comp_ass;
        if (!date || dayjs(date).format("YYYY-MM-DD") === "0001-01-01") {
          return <div className="flex items-center">-</div>;
        }
        return (
          <div className="flex items-center">
            {dayjs(date).format("YYYY/MM/DD")}
          </div>
        );
      },
    },
    {
      title: intl.formatMessage({ id: "next_screening_date" }),
      dataIndex: "levels",
      render: (_: any, record: ScreeningListType): React.ReactNode => {
        const date = record?.created_at;
        if (!date || dayjs(date).format("YYYY-MM-DD") === "0001-01-01") {
          return <div className="flex items-center">-</div>;
        }
        if (record?.assessment?.level === "level_2") {
          return <div>{dayjs(date).add(1, "year").format("YYYY/MM/DD")}</div>;
        } else if (record?.assessment?.level === "level_3") {
          return <div>{dayjs(date).add(6, "month").format("YYYY/MM/DD")}</div>;
        } else {
          return <div>{dayjs(date).format("YYYY/MM/DD")}</div>;
        }
      },
    },
    {
      title: intl.formatMessage({ id: "remaining_day" }),
      dataIndex: "levels",
      render: (_: any, record: ScreeningListType): React.ReactNode => {
        const screeningDate = record?.created_at;
        if (
          !screeningDate ||
          dayjs(screeningDate).format("YYYY-MM-DD") === "0001-01-01"
        ) {
          return <div className="flex items-center">-</div>;
        }

        let nextScreeningDate;
        if (record?.assessment?.level === "level_2") {
          nextScreeningDate = dayjs(screeningDate).add(1, "year");
        } else if (record?.assessment?.level === "level_3") {
          nextScreeningDate = dayjs(screeningDate).add(6, "month");
        } else {
          return <div>-</div>;
        }

        const remainingDays = nextScreeningDate
          .startOf("day")
          .diff(dayjs().startOf("day"), "day");

        return (
          <IBadge
            title={
              <div className="flex items-center gap-1">
                <div>{remainingDays}</div>
                <FormattedMessage id={"day"} />
              </div>
            }
            color="gray"
          />
        );
      },
    },
  ];
};
