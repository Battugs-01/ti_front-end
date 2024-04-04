import { Avatar, Card, Tabs } from "antd";
import dayjs from "dayjs";
import React from "react";

const RightDetail: React.FC<any> = ({ data, items }) => {
  const color = "#146135";
  const avatar = "AA";
  const onChange = (key: String) => {
  };
  return (
    <Card className="min-h-full overflow-y-visible">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </Card>
  );
};

export default RightDetail;
