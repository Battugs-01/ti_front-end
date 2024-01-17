import { Col, Row } from "antd";
import React from "react";

type Props = {
  label?: string;
  children: React.ReactNode;
};
export const SectionContainer = ({ label, children }: Props) => {
  return (
    <Row>
      <Col span={24}>
        <div className="text-[#1D2939] text-sm font-medium mb-3">{label}</div>
      </Col>
      <Col span={24}>{children}</Col>
    </Row>
  );
};

type PropsSection = {
  label?: string;
  children: React.ReactNode;
};
export const SectionField = ({ label, children }: PropsSection) => {
  return (
    <div>
      <div className="mb-2">
        <label className=" text-gray-700 text-sm font-medium ">{label}</label>
      </div>
      {children}
    </div>
  );
};
export const SectionFieldReverse = ({ label, children }: PropsSection) => {
  return (
    <div className="flex items-center gap-3">
      {children}
      <div>
        <label className=" text-gray-700 text-sm font-medium ">{label}</label>
      </div>
    </div>
  );
};
