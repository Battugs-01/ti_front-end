import { PageLoading } from "@ant-design/pro-layout";
import { useRequest } from "ahooks";
import { Card, Col, Row } from "antd";
import AssesmentSvg from "assets/img/assesment.svg";
import { ProgressCard, StatCard } from "components/card";
import { ScreeningTab, UserRoleType } from "config";
import { AuthContext } from "context/auth";
import React, { useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import screenList from "service/screening_list";
import { AssessmentListType } from "service/screening_list/type";
import { BartherIndexModal } from "./assesment-modal/barthel-index";
import { GDSModal } from "./assesment-modal/gds";
import { MiniCogModal } from "./assesment-modal/mini-cog";
import CareFociPercent from "./care-foci-percent";
import DeseaseHistory from "./desease-history";
import CareFoci from "./tables/care-foci";
import General from "./tables/general";

interface AssesmentProps {
  selectedLevel: AssessmentListType | null;
}

const Assesment: React.FC<AssesmentProps> = ({ selectedLevel }) => {
  const [user] = useContext(AuthContext);
  const comprehensiveData = useRequest(screenList.assessmentComprehensive, {
    manual: true,
  });

  const [openModal, setOpenModal] = React.useState<string>("");

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
                value={data?.mini_cog?.total_point || 0}
                number={1}
                onClick={() => setOpenModal("mini-cog")}
              />
            </Col>
            <Col lg={8} md={24} sm={24} xs={24}>
              <ProgressCard
                title="Barthel Index"
                value={data?.barthel_index?.point || 0}
                number={2}
                onClick={() => setOpenModal("barthel")}
              />
            </Col>
            <Col lg={8} md={24} sm={24} xs={24}>
              <ProgressCard
                title="GDS"
                value={data?.gds?.point || 0}
                number={3}
                onClick={() => setOpenModal("gds")}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <DeseaseHistory data={data?.diseases} />
      {user.user?.role !== UserRoleType.doctor &&
        selectedLevel?.level !== ScreeningTab.level_3 && (
          <>
            <General data={data?.comp_ass?.valuation} />
            <CareFoci
              data={data?.care_foci[0]?.items}
              name={"physical_condition"}
            />
            <CareFoci
              data={data?.care_foci[1]?.items}
              name={"psychology_change"}
            />
            <CareFoci data={data?.care_foci[2]?.items} name={"economy_diff"} />
            <CareFoci data={data?.care_foci[3]?.items} name={"health_risk"} />
          </>
        )}

      {openModal === "mini-cog" && (
        <MiniCogModal data={data?.mini_cog} onCancel={() => setOpenModal("")} />
      )}
      {openModal === "barthel" && (
        <BartherIndexModal
          data={data?.barthel_index?.items}
          onCancel={() => setOpenModal("")}
        />
      )}
      {openModal === "gds" && (
        <GDSModal data={data?.gds} onCancel={() => setOpenModal("")} />
      )}
    </Card>
  ) : null;
};

export default Assesment;
