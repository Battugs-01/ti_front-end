import { useRequest } from "ahooks";
import { Card, Col, Row } from "antd";
import orphanUser from "service/gov-orphan/requests";

export const Distribute: React.FC = () => {
  const orphanList = useRequest(() => orphanUser?.getList({}));
  console.log(orphanList?.data, "data");
  const orphans = orphanList?.data?.items.map((val, key) => {
    return {
      name: val?.organization_name,
      bedNumber: val?.created_user_id,
      maxBed: val?.id,
      imageId: val?.logo_id,
    };
  });
  console.log(orphans);
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card></Card>
        </Col>
        <Col span={12}></Col>
      </Row>
    </div>
  );
};
