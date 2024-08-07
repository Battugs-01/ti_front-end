import { Radio } from "antd";

const DevelopmentPlan: React.FC = () => {
  return (
    <>
      <Radio.Group defaultValue="a" size="large">
        <Radio.Button value="a">Statistical</Radio.Button>
        <Radio.Button value="b">By Care Foci List</Radio.Button>
      </Radio.Group>
    </>
  );
};

export default DevelopmentPlan;
