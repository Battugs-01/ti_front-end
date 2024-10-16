// DevPlanColumns.tsx
import { ProColumns } from "@ant-design/pro-table";
import { Avatar } from "antd";
import IBadge from "components/badge";
import SeverityLevelBadge from "components/badge/severity_level_badge";
import { ReadMore } from "components/read-more";
import { FormattedMessage, useIntl } from "react-intl";
import { CareFociItemElement } from "service/development_plan/type";
import file from "service/file";
import { DevPlanQuistion } from "utils/dev_plan";

interface DevPlanColumnsReportProps {
  dataSource: CareFociItemElement[];
  isEvaluated?: boolean;
}

const DevPlanColumnsReport = ({
  dataSource,
  isEvaluated,
}: DevPlanColumnsReportProps): ProColumns<CareFociItemElement>[] => {
  const intl = useIntl();

  const columns: ProColumns<CareFociItemElement>[] = [
    {
      title: "№",
      align: "center",
      width: 50,
      fixed: "left",
      dataIndex: "index",
      valueType: "index",
      className: "text-gray-600",
      render: (_value, _record, index) =>
        index + 1 + (Array.isArray(dataSource) ? 0 : dataSource.length),
    },
    {
      title: intl.formatMessage({ id: "question" }),
      dataIndex: "result",
      className: "text-left",
      width: 220,
      editable: false,
      render: (_, record) => (
        <div className="flex items-center ">
          {isEvaluated ? (
            localStorage?.getItem("web.locale") === "en" ? (
              record?.customer_care_foci_item?.care_foci_item?.name_eng
            ) : (
              record?.customer_care_foci_item?.care_foci_item?.name
            )
          ) : (
            <FormattedMessage id={DevPlanQuistion(record?.key as string)} />
          )}
        </div>
      ),
    },
    {
      title: intl.formatMessage({ id: isEvaluated ? "description" : "answer" }),
      dataIndex: "desc",
      editable: false,
      render: (value, record) => (
        <div className="flex items-center ">
          {isEvaluated
            ? record?.customer_care_foci_item?.description || ""
            : record?.desc || ""}
        </div>
      ),
    },
    {
      title: intl.formatMessage({ id: "severity_syndrome" }),
      dataIndex: "severity_level",
      key: "severity_level",
      width: 150,
      render: (value, record, index) => (
        <div className="flex items-center justify-center">
          <SeverityLevelBadge title={record?.severity_level} />
        </div>
      ),
    },
    {
      title: intl.formatMessage({ id: "summary_plan" }),
      dataIndex: "summary_plan",
      render: (value, record) => (
        <div className="flex justify-center wrap">
          {record?.summary_plan?.length > 0 ? (
            <div className="text-xs text-gray-600">
              {<ReadMore id={"read more plan"} text={record?.summary_plan} />}
            </div>
          ) : (
            ""
          )}
        </div>
      ),
    },
    {
      title: intl.formatMessage({ id: "time" }),
      dataIndex: "duration",
      width: 100,
      align: "center",
      render: (value) => (
        <div className="flex gap-2 justify-center">
          {value + " " + intl.formatMessage({ id: "day" })}
        </div>
      ),
    },
    {
      title: intl.formatMessage({ id: "responsible" }),
      dataIndex: "person_in_charge_id",
      width: 120,
      render: (value, record, index) => (
        <div>
          {
            <div className="flex gap-2 items-center">
              {record?.person_in_charge?.profile?.physical_path && (
                <Avatar
                  shape="circle"
                  size={"small"}
                  src={file.fileToUrl(
                    record?.person_in_charge?.profile?.physical_path || ""
                  )}
                />
              )}
              <span>
                {record?.person_in_charge?.last_name &&
                record?.person_in_charge?.first_name
                  ? `${record?.person_in_charge?.last_name?.substring(0, 1)}. ${
                      record?.person_in_charge?.first_name
                    }`
                  : "-"}
              </span>
            </div>
          }
        </div>
      ),
    },
    {
      title: intl.formatMessage({ id: "result" }),
      dataIndex: "result",
      render: (value, record) => (
        <>
          {record?.result?.length > 0 ? (
            <div className="text-xs text-gray-600">
              {<ReadMore id={"read more result"} text={record?.result} />}
            </div>
          ) : (
            ""
          )}
        </>
      ),
    },
    {
      title: intl.formatMessage({ id: "is_resolved" }),
      key: "is_resolved",
      dataIndex: "is_resolved",
      width: 100,
      render: (value) =>
        value ? (
          <div className="flex items-center justify-center">
            <IBadge color="green" title={intl.formatMessage({ id: "yes" })} />
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <IBadge color="gray" title={intl.formatMessage({ id: "no" })} />
          </div>
        ),
    },
  ];

  return columns;
};

export default DevPlanColumnsReport;
