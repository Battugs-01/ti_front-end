import { useRequest } from "ahooks";
import { Avatar, notification } from "antd";
import IBadge from "components/badge";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import file from "service/file";
import screenList from "services/screening_list";
import { FileSearch03 } from "untitledui-js-base";
import { initPagination } from "utils/index";

export const DevPlan: React.FC = () => {
  const intl = useIntl();
  const [filter, setFilter] = useState(initPagination);

  const planList = useRequest(screenList.list, {
    manual: true,
    onSuccess: () => {},
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  useEffect(() => {
    planList.run({
      ...filter,
    });
  }, [filter]);

  const refreshList = () => {
    planList?.run({
      ...filter,
    });
  };
  return (
    <PageCard xR>
      <InitTableHeader
        customHeaderTitle={intl.formatMessage({ id: "development_plan" })}
        hideCreate
        refresh={refreshList}
      />
      <ITable
        className="p-0 remove-padding-table"
        dataSource={planList.data?.items || []}
        columns={[
          {
            title: intl.formatMessage({ id: "name" }),
            dataIndex: "first_name",
          },
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
            render: (value: any) => {
              return <FormattedMessage id={value} />;
            },
          },

          {
            title: intl.formatMessage({ id: "cfs_score" }),
            dataIndex: "cfs_score",
            render: (_, record) => (
              <div className="text-gray-400">
                <span
                  className={`${
                    record?.assessment?.cfs_point > 6
                      ? "text-red-400"
                      : "text-black"
                  }`}
                >
                  {record?.assessment.cfs_point}
                </span>{" "}
                / 9
              </div>
            ),
          },
          {
            title: intl.formatMessage({ id: "caregiver" }),
            dataIndex: "caregiver",
            render: (_, record) => (
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
            title: intl.formatMessage({ id: "agency" }),
            dataIndex: "agency",
            render: (_, record) => (
              <div>{record?.person_in_charge?.agency?.name}</div>
            ),
          },
          {
            title: intl.formatMessage({ id: "total_assessment" }),
            dataIndex: "total_assessment",
            render: (_, record) => <div>{record?.assessment?.total}</div>,
          },
          {
            title: intl.formatMessage({ id: "list_assessment_date" }),
            dataIndex: "list_assessment_date",
            render: (_, record) => (
              <div>{dayjs(record?.assessment?.date).format("YYYY-MM-DD")}</div>
            ),
          },

          {
            title: intl.formatMessage({ id: "person_in_charge" }),
            dataIndex: "person_in_charge",
            render: (_, record) => (
              <div className="flex items-center gap-2">
                <Avatar
                  src={file.fileToUrl(
                    record?.person_in_charge?.profile?.physical_path
                  )}
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
            render: (_, record) => <div>{record?.address?.desc}</div>,
          },
        ]}
        customActions={(record) => {
          return (
            <Link
              to={`/dashboard/development-plan/234?customer_id=${record.id}`}
              className="flex items-center"
            >
              <FileSearch03 className="text-gray-600" />
            </Link>
          );
        }}
      />
    </PageCard>
  );
};
