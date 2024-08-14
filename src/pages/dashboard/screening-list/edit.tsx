import {
  DrawerForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { Button, Col, Divider, Row } from "antd";
import { ActionComponentProps } from "types";
import { Save02 } from "untitledui-js-base";

interface DevelopmentProps {
  cancelModal: () => void;
}

export const EditScreenList: React.FC<ActionComponentProps<any>> = ({
  onCancel,
  onFinish,
  open,
  detail,
}) => {
  return (
    <DrawerForm
      className="custom-ant-drawer-body"
      onFinish={async (values) => {
        console.log(values, "Form Values:");
      }}
      title="Edit Entry"
      open={open}
      submitter={{
        render: (props) => {
          return (
            <div className="flex items-center gap-4">
              <Button onClick={onCancel} size="large" type="default">
                Cancel
              </Button>
              <Button
                onClick={props.submit}
                size="large"
                type="primary"
                icon={<Save02 />}
                className="flex items-center"
              >
                Save
              </Button>
            </div>
          );
        },
      }}
      drawerProps={{
        onClose: onCancel,
        width: 500,
      }}
    >
      <div>Comprehensive Needs Assessment for At Risk Seniors</div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormText name="name" label="Name" />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ProFormDatePicker name="date_of_birth" label="Date of Birth" />
        </Col>
        <Col span={12}>
          <ProFormSelect name="gender" label="Gender" />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ProFormDatePicker name="register_no" label="Register No." />
        </Col>
        <Col span={12}>
          <ProFormText name="phone" label="Phone" />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormText name="resident_address" label="Resident Address" />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormSelect name="person_in_charge" label="Person in Charge" />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormSelect name="agency" label="Agency" />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormDatePicker name="assessment_date" label="Assessment Date" />
        </Col>
      </Row>
      <Divider />
      <div>Caregiver Information</div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormRadio.Group
            name="senior_living"
            layout="vertical"
            label="Is the senior living with someone else?"
            options={[
              {
                label: "Yes",
                value: "yes",
              },
              {
                label: "No",
                value: "no",
              },
            ]}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormRadio.Group
            name="caregiver_living"
            layout="vertical"
            label="If the senior is living with someone else, is there someone committed to caregiving?"
            options={[
              {
                label: "Yes",
                value: "yes",
              },
              {
                label: "No",
                value: "no",
              },
            ]}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ProFormDatePicker name="relationship" label="Relationship" />
        </Col>
        <Col span={12}>
          <ProFormText name="phone" label="Phone" />
        </Col>
      </Row>
    </DrawerForm>
  );
};
