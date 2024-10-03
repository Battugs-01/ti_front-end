import { ProColumns } from "@ant-design/pro-table";
import LevelBadge from "components/badge/level";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import { ScreeningListType } from "service/screening_list/type"; // Assuming this is your table data type
import { parseMongolianID } from "utils/index";

export const PlannedWorkTableColumns = (
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
    render: (value: any): any => <FormattedMessage id={value} />,
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
    title: intl.formatMessage({ id: "hcu_date" }),
    dataIndex: "levels",
    width: 130,
    render: (_: any, record: ScreeningListType): React.ReactNode => (
      <div className="flex items-center ">
        {dayjs(record?.assessment?.date_comp_ass).format("YYYY-MM-DD")}
      </div>
    ),
  },
];
