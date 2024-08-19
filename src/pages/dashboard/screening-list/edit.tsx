import {
  DrawerForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Col, Divider, notification, Row } from "antd";
import { agencyArray, workersGenderArray } from "config";
import { FormattedMessage, useIntl } from "react-intl";
import screenList from "service/screening_list";
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
  const editScreen = useRequest(screenList.edit, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Success",
      });
      onFinish?.();
    },
    onError: (e) => {
      notification.error({
        message: e.message,
      });
      onCancel();
    },
  });
  const intl = useIntl();
  return (
    <DrawerForm
      initialValues={{
        ...detail,
      }}
      onFinish={async (values) => {
        await editScreen.runAsync(values);
        console.log(values, "Form Values:");
      }}
      title={intl.formatMessage({ id: "edit_entry" })}
      open={open}
      submitter={{
        render: (props) => {
          return (
            <div className="flex items-center gap-4">
              <Button onClick={onCancel} size="large" type="default">
                <FormattedMessage id="cancel" />
              </Button>
              <Button
                onClick={props.submit}
                size="large"
                type="primary"
                icon={<Save02 />}
                className="flex items-center"
              >
                <FormattedMessage id="save" />
              </Button>
            </div>
          );
        },
      }}
      drawerProps={{
        onClose: onCancel,
        width: 500,
        styles: { body: { backgroundColor: "#F5F8F8" } },
      }}
    >
      <div>
        <FormattedMessage id="comprehensive_assessment_title" />
      </div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormText name="name" label={intl.formatMessage({ id: "name" })} />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ProFormDatePicker
            name="birth_date"
            label={intl.formatMessage({ id: "date_of_birth" })}
          />
        </Col>
        <Col span={12}>
          <ProFormSelect
            name="gender"
            label={intl.formatMessage({ id: "gender" })}
            options={workersGenderArray.map((el) => ({ ...el }))}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ProFormDatePicker
            name="register_no"
            label={intl.formatMessage({ id: "register_no" })}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="phone"
            label={intl.formatMessage({ id: "phone" })}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormText
            name="resident_address"
            label={intl.formatMessage({ id: "resident_address" })}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormSelect
            name="person_in_charge"
            label={intl.formatMessage({ id: "person_in_charge" })}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormSelect
            name="agency_id"
            label={intl.formatMessage({ id: "agency" })}
            options={agencyArray.map((el) => ({ ...el }))}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormDatePicker
            name="assessment_date"
            label={intl.formatMessage({ id: "assessment_date" })}
          />
        </Col>
      </Row>
      <Divider />
      <div>
        <FormattedMessage id="caregiver_info_title" />
      </div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormRadio.Group
            name="senior_living"
            layout="vertical"
            label={intl.formatMessage({ id: "senior_living_question" })}
            options={[
              {
                label: intl.formatMessage({ id: "yes" }),
                value: "yes",
              },
              {
                label: intl.formatMessage({ id: "no" }),
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
            label={intl.formatMessage({ id: "caregiver_living_question" })}
            options={[
              {
                label: intl.formatMessage({ id: "yes" }),
                value: "yes",
              },
              {
                label: intl.formatMessage({ id: "no" }),
                value: "no",
              },
            ]}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ProFormDatePicker
            name="relationship"
            label={intl.formatMessage({ id: "relationship" })}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="caregiver_phone"
            label={intl.formatMessage({ id: "phone" })}
          />
        </Col>
      </Row>
    </DrawerForm>
  );
};
