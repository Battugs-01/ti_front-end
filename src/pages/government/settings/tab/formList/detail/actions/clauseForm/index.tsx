import { ProFormDigit, ProFormText } from "@ant-design/pro-form";
import { Col, Row } from "antd";
import TextEditorForm from "components/form_braft";
import { SectionField } from "components/index";

export const ClauseForm: React.FC = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={21}>
          <SectionField
            label="Заалтын нэр"
            children={
              <ProFormText
                placeholder="Асаргаа, сувилгааны үйл ажиллагаа"
                name="clauseName"
              />
            }
          />
        </Col>
        <Col span={3}>
          <SectionField
            label="Дугаар"
            children={<ProFormDigit placeholder="8710" name="number" />}
          />
        </Col>
      </Row>
      <SectionField
        label="Description"
        children={
          <TextEditorForm value={""} language="mn" setValue={() => {}} />
        }
      />
    </div>
  );
};
