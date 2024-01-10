import { Card, Radio, Tabs } from "antd";
import InitTableHeader from "components/table-header";
import { RadioFormType } from "service/gov-orphan";
import { MainForms } from "./mainForms";

export const Form: React.FC = () => {
  return (
    <div className="custom-ant-card-padding-remove">
      <Card>
        <div className="mt-5" style={{ borderBottom: "1px solid #EAECF0" }}>
          <InitTableHeader
            hideTitle
            hideCreate
            toolbarItems={undefined}
            leftContent={
              <Radio.Group defaultValue={RadioFormType.ba1a}>
                <Radio.Button value={RadioFormType.ba1a}>
                  Б-АС-1.1А
                </Radio.Button>
                <Radio.Button value={RadioFormType.ba1b}>
                  Б-АС-1.1Б
                </Radio.Button>
                <Radio.Button value={RadioFormType.ba12}>Б-АС-1.2</Radio.Button>
              </Radio.Group>
            }
          />
        </div>
        <div className="p-6">
          <MainForms />
        </div>
      </Card>
    </div>
  );
};
