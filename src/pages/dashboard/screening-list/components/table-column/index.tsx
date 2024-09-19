import { ProColumns } from "@ant-design/pro-table";
import { Avatar } from "antd";
import IBadge from "components/badge";
import LevelBadge from "components/badge/level";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import file from "service/file";
import { ScreeningListType } from "service/screening_list/type"; // Assuming this is your table data type

export const getScreeningTableColumns = (
  intl: any
): ProColumns<ScreeningListType>[] => [
  {
    title: intl.formatMessage({ id: "register" }),
    dataIndex: "rd",
  },
  {
    title: intl.formatMessage({ id: "phone" }),
    dataIndex: "phone",
  },
  {
    title: intl.formatMessage({ id: "age" }),
    dataIndex: "age",
  },
  {
    title: intl.formatMessage({ id: "gender" }),
    dataIndex: "gender",
    render: (value: any): any => <FormattedMessage id={value} />,
  },
  {
    title: intl.formatMessage({ id: "risk_level" }),
    dataIndex: "risk_level",
    render: (_: any, record: ScreeningListType): React.ReactNode => (
      <LevelBadge status={record?.assessment?.level} />
    ),
  },
  {
    title: intl.formatMessage({ id: "cfs_score" }),
    dataIndex: "cfs_score",
    render: (_: any, record: ScreeningListType): React.ReactNode => (
      <div className="text-gray-400">
        <span
          className={`${
            record?.assessment?.cfs_point > 6 ? "text-red-400" : "text-black"
          }`}
        >
          {record?.assessment.cfs_point}
        </span>{" "}
        / 9
      </div>
    ),
  },
  {
    title: intl.formatMessage({ id: "agency" }),
    dataIndex: "agency",
    render: (_: any, record: ScreeningListType): React.ReactNode => (
      <div>{record?.person_in_charge?.agency?.name}</div>
    ),
  },
  {
    title: intl.formatMessage({ id: "total_assessment" }),
    dataIndex: "total_assessment",
    render: (_: any, record: ScreeningListType): React.ReactNode => (
      <div>{record?.assessment?.total}</div>
    ),
  },
  {
    title: intl.formatMessage({ id: "list_assessment_date" }),
    dataIndex: "list_assessment_date",
    render: (_: any, record: ScreeningListType): React.ReactNode => (
      <div>{dayjs(record?.assessment?.date).format("YYYY-MM-DD")}</div>
    ),
  },
  {
    title: intl.formatMessage({ id: "caregiver" }),
    dataIndex: "caregiver",
    render: (_: any, record: ScreeningListType): React.ReactNode => (
      <div>
        {record?.is_have_care_giver ? (
          <IBadge title={<FormattedMessage id="yes" />} color="green" />
        ) : (
          <IBadge title={<FormattedMessage id="no" />} />
        )}
      </div>
    ),
  },
  {
    title: intl.formatMessage({ id: "person_in_charge" }),
    dataIndex: "person_in_charge",
    render: (_: any, record: ScreeningListType): React.ReactNode => (
      <div className="flex items-center gap-2">
        <Avatar
          src={file.fileToUrl(record?.person_in_charge?.profile?.physical_path)}
          className="uppercase"
        >
          {record?.person_in_charge?.first_name.substring(0, 2)}
        </Avatar>
        <div>{record?.person_in_charge?.first_name}</div>
      </div>
    ),
  },
  {
    title: intl.formatMessage({ id: "address" }),
    dataIndex: "address",
    render: (_: any, record: ScreeningListType): React.ReactNode => (
      <div>{record?.address?.desc}</div>
    ),
  },
  {
    title: intl.formatMessage({ id: "development_plan" }),
    dataIndex: "development_plan",
  },
];
