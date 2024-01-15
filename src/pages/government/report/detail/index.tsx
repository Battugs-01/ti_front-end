import React from "react";
import Header from "./header";
import Info from "./info";
const ReportDetail: React.FC = () => {
  return (
    <div>
      <div className="mb-5">
        <Header />
      </div>
      <div className="custom-ant-card-padding-remove">
        <Info />
      </div>
    </div>
  );
};

export default ReportDetail;
