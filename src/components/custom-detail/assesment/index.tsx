import { PageLoading } from "@ant-design/pro-layout";
import { Card, Col, Row } from "antd";
import AssesmentSvg from "assets/img/assesment.svg";
import IBadge from "components/badge";
import {
  BloodPressureCard,
  FamilyPicCard,
  ProgressCard,
  StatCard,
} from "components/card";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
  AssessmentListType,
  ComprehensiveType,
} from "service/screening_list/type";
import { BartherIndexModal } from "./assesment-modal/barthel-index";
import { EcoMap } from "./assesment-modal/ecomap";
import { FamilyPicModal } from "./assesment-modal/family_pic";
import { GDSModal } from "./assesment-modal/gds";
import { MiniCogModal } from "./assesment-modal/mini-cog";
import CareFociPercent from "./care-foci-percent";

interface AssesmentProps {
  selectedLevel: AssessmentListType | null;
  data: ComprehensiveType;
}

const Assesment: React.FC<AssesmentProps> = ({ selectedLevel, data }) => {
  const intl = useIntl();
  const [openModal, setOpenModal] = React.useState<string>("");

  if (!selectedLevel) {
    return <PageLoading />;
  }

  return data ? (
    <Card
      title={
        <div className="text-xl font-semibold flex flex-row gap-4">
          <img src={AssesmentSvg} alt="assesment" />
          <FormattedMessage id="screening_assessment" />
          {data?.comp_ass?.is_temporary ? (
            <IBadge
              title={intl.formatMessage({ id: "Incomplete" })}
              color="yellow"
            />
          ) : (
            <IBadge
              title={intl.formatMessage({ id: "state_complete" })}
              color="green"
            />
          )}
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
            <Col xxl={6} lg={12} sm={12} xs={24}>
              <BloodPressureCard
                title="arter_pressure"
                value={data?.health || 0}
              />
            </Col>
            <Col xxl={6} lg={12} sm={12} xs={24}>
              <StatCard
                title="heart_rate"
                value={data?.health?.heart_rate || 0}
              />
            </Col>
            <Col xxl={6} lg={12} sm={12} xs={24}>
              <StatCard
                title="respiratory_rate"
                value={data?.health?.respiratory_rate || 0}
              />
            </Col>
            <Col xxl={6} lg={12} sm={12} xs={24}>
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
          <Row gutter={[16, 16]}>
            <Col lg={12} md={24} sm={24} xs={24}>
              <FamilyPicCard
                title={intl.formatMessage({ id: "family_pic" })}
                value={data?.gds?.point || 0}
                number={3}
                onClick={() => setOpenModal("family_pic")}
              />
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
              <FamilyPicCard
                title={intl.formatMessage({ id: "elderly_social_conv" })}
                value={data?.gds?.point || 0}
                number={3}
                onClick={() => setOpenModal("eco_map")}
              />
            </Col>
          </Row>
        </Col>
      </Row>

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
      {openModal === "family_pic" && (
        <FamilyPicModal
          data={data?.comp_ass}
          onCancel={() => setOpenModal("")}
        />
      )}
      {openModal === "eco_map" && (
        <EcoMap data={data?.comp_ass} onCancel={() => setOpenModal("")} />
      )}
    </Card>
  ) : null;
};

export default Assesment;
