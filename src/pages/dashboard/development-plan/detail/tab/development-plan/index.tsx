import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Avatar, Badge, Table } from "antd";
import { CustomCard } from "components/card";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import { useLocation } from "react-router-dom";
import file from "service/file";
import screenList from "service/screening_list";
import NotFound from "./not-found";

interface DevelopmentPlanTabType {
  data: {}[];
}

const DevelopmentPlanTab: React.FC<DevelopmentPlanTabType> = ({ data }) => {
  const location = useLocation();
  const customerId = location.search.split("=")[1];
  const developmentPlans = useRequest(async () =>
    screenList.developmentPlansList(parseInt(customerId))
  );

  if (developmentPlans.loading) {
    return <PageLoading />;
  }
  if (!developmentPlans.data || developmentPlans.data?.length === 0) {
    return <NotFound />;
  }
  return (
    <>
      {developmentPlans.data?.map((data, key) => (
        <CustomCard title="Development Plan" key={key} className="mb-6">
          <div className="flex gap-2 mb-4">
            <div>
              <FormattedMessage id="agency" />{" "}
              <span className="font-bold">
                {data?.created_employee?.agency?.name}
              </span>
            </div>
            <Badge status="default" />
            <div>
              <FormattedMessage id="cm_charge" />{" "}
              <span className="font-bold">
                {data?.created_employee?.first_name}
              </span>
            </div>
            <Badge status="default" />
            <div>
              <FormattedMessage id="assessment_date" />{" "}
              <span className="font-bold">
                {dayjs(data?.created_at).format("DD/MM/YYYY")}
              </span>
            </div>
            <Badge status="default" />
            <div>
              <FormattedMessage id="date_next_review" />{" "}
              <span className="font-bold">
                {dayjs(new Date()).format("DD/MM/YYYY")}
              </span>
            </div>
          </div>
          <Table
            pagination={false}
            dataSource={data?.items}
            className="p-0 remove-padding-table"
            columns={[
              {
                title: "Care Foci",
                dataIndex: "care_foci_item",
                render: (_, record) => (
                  <span className="text-sm text-[#475467] font-normal flex text-center">
                    {record?.care_foci_item?.name || "-"}
                  </span>
                ),
              },
              {
                title: "Intervention",
                dataIndex: "intervention",
              },
              {
                title: "Person in charge",
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
                title: "Frequency",
                dataIndex: "frequency_type",
              },
              {
                title: "Estimated Completion",
                dataIndex: "estimated_date",
                render: (value: any) => (
                  <span className="text-sm text-[#475467] font-normal flex text-center">
                    {dayjs(value).format("DD/MM/YYYY")}
                  </span>
                ),
              },
            ]}
          />
        </CustomCard>
      ))}
    </>
  );
};

export default DevelopmentPlanTab;
