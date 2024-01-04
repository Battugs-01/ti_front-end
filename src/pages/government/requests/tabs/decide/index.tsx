import { Card } from "antd";
import { FilterForm } from "components/filter";
import React from "react";

const data = [{}];

const Decide: React.FC = () => {
  return (
    <Card>
      <div className="">
        <FilterForm />
      </div>
    </Card>
  );
};

export default Decide;
