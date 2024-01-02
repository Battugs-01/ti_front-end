import { Col, Row } from "antd";
import React, { FC } from "react";

const Footer: FC = () => (
  <Row
    justify="center"
    style={{
      padding: 10,
    }}
  >
    <Col span={24} className=" text-right mr-5">
      <span className="text-md font-bold">
        © Powered by{" "}
        <a
          style={{ cursor: "pointer", color: "#1DA57A" }}
          href="https://fibo.cloud/"
          target="_blank"
          rel="noreferrer"
        >
          {"“Techpartners” LLC".toUpperCase()}
        </a>
      </span>
    </Col>
  </Row>
);

export default Footer;
