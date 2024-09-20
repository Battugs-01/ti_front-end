import React, { useEffect } from "react";
import { Card, Row, Col, notification } from "antd";
import { useRequest } from "ahooks";
import { FormattedMessage } from "react-intl";
import AssesmentSvg from "assets/img/assesment.svg";
import screenList from "service/screening_list";
import { PageLoading } from "@ant-design/pro-layout";
import CareFociPercent from "../care-foci-percent";
import { ProgressCard, StatCard } from "components/card";
import DeseaseHistory from "../desease-history";
import CareFoci from "./tables/care-foci";
import General from "./tables/general";

interface AssesmentProps {
  selectedLevel: { id: number } | null;
}

const Assesment: React.FC<AssesmentProps> = ({ selectedLevel }) => {
  const comprehensiveData = useRequest(screenList.assessmentComprehensive, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    comprehensiveData.run(selectedLevel?.id || 0);
  };

  useEffect(() => {
    run();
  }, [selectedLevel]);

  if (!selectedLevel) {
    return <PageLoading />;
  }

  const data = comprehensiveData?.data;

  return data ? (
    <Card
      title={
        <div className="text-xl font-semibold flex flex-row gap-4">
          <img src={AssesmentSvg} alt="assesment" />
          <FormattedMessage id="screening_assessment" />
        </div>
      }
      className="card-header-remove"
    >
      <Row gutter={[20, 20]} className="mb-4">
        <Col xl={6} md={24} xs={24}>
          <Card
            bordered
            className="w-full p-0 card-header-remove custom-ant-card-padding-remove"
          >
            <CareFociPercent data={data?.care_foci_percent} />
          </Card>
        </Col>
        <Col xl={18} md={24} xs={24} className="flex flex-col gap-4">
          <Row gutter={[12, 24]}>
            <Col lg={6} md={24} sm={24} xs={24}>
              <StatCard
                title="arter_pressure"
                value={data?.health.blood_presure || 0}
              />
            </Col>
            <Col lg={6} md={24} sm={24} xs={24}>
              <StatCard
                title="heart_rate"
                value={data?.health.heart_rate || 0}
              />
            </Col>
            <Col lg={6} md={24} sm={24} xs={24}>
              <StatCard
                title="respiratory_rate"
                value={data?.health?.respiratory_rate || 0}
              />
            </Col>
            <Col lg={6} md={24} sm={24} xs={24}>
              <StatCard
                title="body_temp"
                value={data?.health?.body_temp || 0}
              />
            </Col>
          </Row>
          <Row gutter={[12, 24]}>
            <Col lg={8} md={24} sm={24} xs={24}>
              <ProgressCard
                title="Mini-Cog"
                value={data?.mini_cog_point || 0}
                number={1}
              />
            </Col>
            <Col lg={8} md={24} sm={24} xs={24}>
              <ProgressCard
                title="Barthel Index"
                value={data?.barthel_index_point || 0}
                number={2}
              />
            </Col>
            <Col lg={8} md={24} sm={24} xs={24}>
              <ProgressCard
                title="GDS"
                value={data?.gds_point || 0}
                number={3}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <DeseaseHistory data={data?.diseases} />
      <General data={data?.comp_ass?.valuation} />
      <CareFoci data={data?.care_foci[0]?.items} name={"physical_condition"} />
      <CareFoci data={data?.care_foci[1]?.items} name={"psychology_change"} />
      <CareFoci data={data?.care_foci[2]?.items} name={"economy_diff"} />
      <CareFoci data={data?.care_foci[3]?.items} name={"health_risk"} />
    </Card>
  ) : null;
};

export default Assesment;
