import {
  DrawerForm,
  FormListActionType,
  ProFormDatePicker,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { Button, Card, Col, Row } from "antd";
import { useRef } from "react";
import { Plus, Trash04 } from "untitledui-js-base";

interface DevelopmentProps {
  cancelModal: () => void;
  visible?: boolean;
}

export const CreateDevelopmentPlan: React.FC<DevelopmentProps> = ({
  cancelModal,
  visible,
}) => {
  const ref = useRef<FormListActionType>();

  return (
    <DrawerForm
      onFinish={async (values) => {
        console.log(values, "Form Values:");
      }}
      title="Create Development Plan"
      open={visible}
      submitter={{
        render: (props) => {
          return (
            <div className="flex items-center gap-4">
              <Button onClick={cancelModal} size="large" type="default">
                Cancel
              </Button>
              <Button
                onClick={props.submit}
                size="large"
                type="primary"
                icon={<Plus />}
                className="flex items-center"
              >
                Create Plan
              </Button>
            </div>
          );
        },
      }}
      drawerProps={{
        onClose: cancelModal,
        width: 500,
      }}
    >
      <Card className="bg-[#F5F8F8]">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <ProFormText name="intervention" label="Intervention" />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <ProFormSelect name="care_foci" label="Care Foci" />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <ProFormSelect name="frequency" label="Frequency" />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <ProFormSelect name="person_in_charge" label="Person in Charge" />
          </Col>
          <Col span={12}>
            <ProFormDatePicker
              name="estimated_completion"
              label="Estimated Completion"
            />
          </Col>
        </Row>
      </Card>
      <Card className="bg-[#F5F8F8] mt-6">
        <ProFormList
          name="list"
          actionRef={ref}
          actionRender={() => []}
          creatorButtonProps={{
            className: "hidden",
          }}
          className="block"
        >
          {(fields, index) => (
            <div key={index}>
              <div className="flex justify-end">
                <Button
                  ghost
                  onClick={() => ref.current?.remove(index)}
                  className="text-[#F04438] flex items-center border-none"
                  icon={<Trash04 />}
                >
                  Remove
                </Button>
              </div>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormText
                    name={[index, "intervention"]}
                    label="Intervention"
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormSelect
                    name={[index, "care_foci"]}
                    label="Care Foci"
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormSelect
                    name={[index, "frequency"]}
                    label="Frequency"
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormSelect
                    name={[index, "person_in_charge"]}
                    label="Person in Charge"
                  />
                </Col>
                <Col span={12}>
                  <ProFormDatePicker
                    name={[index, "estimated_completion"]}
                    label="Estimated Completion"
                  />
                </Col>
              </Row>
            </div>
          )}
        </ProFormList>
      </Card>
      <Button
        icon={<Plus />}
        ghost
        className="my-3 font-medium text-[#144E5A] flex items-center"
        onClick={() => ref.current?.add({})}
      >
        Add more plan
      </Button>
    </DrawerForm>
  );
};
