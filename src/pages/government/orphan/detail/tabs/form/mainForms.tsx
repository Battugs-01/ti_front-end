import { Card, Col, Form, Row, Select } from "antd";
import FormInput from "components/form-input";
import { FirstForm } from "./components/firstForm";
import { SecondForm } from "./components/secondForm";
import { ThirdForm } from "./components/thirdForm";

export const MainForms: React.FC = () => {
  return (
    <div>
      <div className="font-medium text-2xl">
        Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ауйн нэгж, байгууллагын
        мэдээ
      </div>
      <div className="w-1/2 m-auto custom-ant-card-padding-remove custom-ant-form">
        <Form>
          <div className="mt-8">
            <FirstForm />
          </div>
          <div className="mt-8">
            <SecondForm />
          </div>
          <div className="mt-8">
            <ThirdForm />
          </div>
        </Form>
      </div>
    </div>
  );
};
