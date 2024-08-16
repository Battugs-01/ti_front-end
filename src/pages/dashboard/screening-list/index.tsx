import { notification, Radio } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import { EditScreenList } from "./edit";
import screenList from "service/screening_list";
import { FormattedMessage, useIntl } from "react-intl";
import { useRequest } from "ahooks";
import { useEffect, useState } from "react";
import { initFilter } from "utils/index";

const ScreeningList: React.FC = () => {
  const [filter, setFilter] = useState(initFilter);

  const screen = useRequest(screenList.list, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: intl.formatMessage({ id: "success" }),
      });
    },
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  useEffect(() => {
    screen.run({
      ...filter,
    });
  }, [filter]);
  const refreshList = () => {
    screen?.run({
      ...filter,
    });
  };
  const intl = useIntl();
  return (
    <PageCard xR>
      <InitTableHeader
        hideTitle
        refresh={refreshList}
        hideCreate
        leftContent={
          <Radio.Group defaultValue="a" size="large">
            <Radio.Button value="a">
              <FormattedMessage id="all" />
            </Radio.Button>
            <Radio.Button value="b">
              <FormattedMessage id="level" values={{ number: 1 }} />
            </Radio.Button>
            <Radio.Button value="c">
              <FormattedMessage id="level" values={{ number: 2 }} />
            </Radio.Button>
            <Radio.Button value="d">
              <FormattedMessage id="level" values={{ number: 3 }} />
            </Radio.Button>
          </Radio.Group>
        }
      />
      <ITable
        dataSource={[
          {
            name: "John Doe",
            register: "2021-09-01",
            phone: "0123456789",
            age: 30,
            gender: "male",
            risk_level: "High",
            cfs_score: 10,
            agency: "Agency",
            total_assessment: 2,
            list_assessment_date: "2021-09-01",
            caregiver: "Caregiver",
            person_in_charge: "Person in charge",
            development_plan: "Development Plan",
          },
        ]}
        className="p-0 remove-padding-table"
        columns={[
          {
            title: intl.formatMessage({ id: "name" }),
            dataIndex: "name",
          },
          {
            title: intl.formatMessage({ id: "register" }),
            dataIndex: "register",
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
          },
          {
            title: intl.formatMessage({ id: "risk_level" }),
            dataIndex: "risk_level",
          },
          {
            title: intl.formatMessage({ id: "cfs_score" }),
            dataIndex: "cfs_score",
          },
          {
            title: intl.formatMessage({ id: "agency" }),
            dataIndex: "agency",
          },
          {
            title: intl.formatMessage({ id: "total_assessment" }),
            dataIndex: "total_assessment",
          },
          {
            title: intl.formatMessage({ id: "list_assessment_date" }),
            dataIndex: "list_assessment_date",
          },
          {
            title: intl.formatMessage({ id: "caregiver" }),
            dataIndex: "caregiver",
          },
          {
            title: intl.formatMessage({ id: "person_in_charge" }),
            dataIndex: "person_in_charge",
          },
          {
            title: intl.formatMessage({ id: "development_plan" }),
            dataIndex: "development_plan",
          },
        ]}
        UpdateComponent={EditScreenList}
      />
    </PageCard>
  );
};

export default ScreeningList;
