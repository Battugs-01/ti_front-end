import { Col, Row } from "antd";
import React from "react";

interface CustomCardProps {
  title: string;
  children: any;
  // Define the props for your component here
}

const CustomCard: React.FC<CustomCardProps> = ({ title, children }) => {
  // Implement your component logic here
  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} sm={14}>
        <div className="text-sm font-normal text-gray-600">{title}</div>
      </Col>
      <Col xs={24} sm={10}>
        <div className="text-sm font-bold text-gray-900">{children}</div>
      </Col>
    </Row>
  );
};

export default CustomCard;
