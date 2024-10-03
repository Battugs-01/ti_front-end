import { ProColumns } from "@ant-design/pro-table";
import IBadge from "components/badge";
import LevelBadge from "components/badge/level";
import dayjs from "dayjs";
import { ScreeningListType } from "service/screening_list/type"; // Assuming this is your table data type
import { parseMongolianGender, parseMongolianID } from "utils/index";

export const getScreeningTableColumns = (
  intl: any
): ProColumns<ScreeningListType>[] => [
  {
    title: intl.formatMessage({ id: "register" }),
    dataIndex: "rd",
    width: 150,
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
    render: (_: any, record: ScreeningListType): React.ReactNode => (
      <div className="flex items-center justify-center">
        {parseMongolianID(record?.rd)}
      </div>
    ),
  },
  {
    title: intl.formatMessage({ id: "gender" }),
    dataIndex: "gender",
    width: 80,
    render: (_: any, record: ScreeningListType): any => {
      const gender = parseMongolianGender(record?.rd);
      console.log(gender, "llr");
      return (
        <div className="flex items-center justify-center">
          {gender === "male"
            ? intl.formatMessage({ id: "male" })
            : intl.formatMessage({ id: "female" })}
        </div>
      );
    },
  },
  {
    title: intl.formatMessage({ id: "levels" }),
    dataIndex: "levels",
    width: 120,
    align: "center",
    render: (_: any, record: ScreeningListType): React.ReactNode => (
      <div className="flex items-center justify-center">
        <LevelBadge status={record?.assessment?.level} />
      </div>
    ),
  },
  {
    title: intl.formatMessage({ id: "cfs_score" }),
    dataIndex: "cfs_score",
    width: 80,
    align: "center",
    render: (_: any, record: ScreeningListType): React.ReactNode => (
      <div className="text-gray-400  ">
        <span
          className={`${
            record?.assessment?.cfs_point > 6
              ? "text-red-600 font-medium"
              : "text-gray-900 font-medium"
          }`}
        >
          {record?.assessment.cfs_point}
        </span>{" "}
        / 9
      </div>
    ),
  },
  {
    title: intl.formatMessage({ id: "cfs_date" }),
    dataIndex: "levels",
    width: 130,
    align: "center",
    render: (_: any, record: ScreeningListType): React.ReactNode => (
      <div>{dayjs(record?.assessment?.date).format("YYYY-MM-DD")}</div>
    ),
  },
  {
    title: "ХЦҮ",
    dataIndex: "levels",
    width: 100,
    align: "center",
    render: (_: any, record: ScreeningListType): React.ReactNode => (
      <div className="">{record?.assessment?.count_comp_ass || "-"}</div>
    ),
  },
  {
    title: intl.formatMessage({ id: "hcu_date" }),
    dataIndex: "levels",
    width: 130,
    render: (_: any, record: ScreeningListType): React.ReactNode => {
      const date = record?.assessment?.date_comp_ass;
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
    title: intl.formatMessage({ id: "address" }),
    dataIndex: "address",
    width: 250,
    render: (_: any, record: ScreeningListType): React.ReactNode => (
      <div>{`${record?.address?.city?.name || ""}  ${
        record?.address?.district?.name || ""
      }  ${record?.address?.khoroo?.name || ""}`}</div>
    ),
  },
  {
    title: intl.formatMessage({ id: "development_plan" }),
    dataIndex: "development_plan",
    align: "center",
    render: (_: any, record: ScreeningListType): React.ReactNode => (
      <div className="">
        <IBadge
          title={record?.assessment?.developer_plan ? "Оруулсан" : "Оруулаагүй"}
          color={record?.assessment?.developer_plan ? "green" : "gray"}
        />
      </div>
    ),
  },
  {
    title: intl.formatMessage({ id: "risk_level" }),
    dataIndex: "risk_level",
    align: "center",
    render: (_: any, record: ScreeningListType): React.ReactNode => {
      switch (record?.assessment?.priority) {
        case "high":
          return <IBadge title="Өндөр" color="red" />;
        case "medium":
          return <IBadge title="Дунд" color="yellow" />;
        case "low":
          return <IBadge title="Бага" color="green" />;
        default:
          return "-";
      }
    },
  },
];
