import {
  DrawerForm,
  FormListActionType,
  ProFormDatePicker,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Card, Col, notification, Row } from "antd";
import dayjs from "dayjs";
import { useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import developmentPlan from "service/development_plan";
import { Plus, Trash04 } from "untitledui-js-base";

interface DevelopmentProps {
  cancelModal: () => void;
  visible?: boolean;
}

export const CreateDevelopmentPlan: React.FC<DevelopmentProps> = ({
  cancelModal,
  visible,
}) => {
  const intl = useIntl();
  const createDevPlan = useRequest(developmentPlan.create, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: intl.formatMessage({ id: "success" }),
      });
      cancelModal();
    },
    onError: (error) => {
      notification.error({
        message: error.message,
      });
    },
  });
  const ref = useRef<FormListActionType>();

  return (
    <DrawerForm
      onFinish={async (values) => {
        await createDevPlan.runAsync({
          ...values,
          estimated_completion: dayjs(values.estimated_completion).toDate(),
        });
      }}
      title={intl.formatMessage({ id: "create_development_plan" })}
      open={visible}
      submitter={{
        render: (props) => {
          return (
            <div className="flex items-center gap-4">
              <Button onClick={cancelModal} size="large" type="default">
                <FormattedMessage id="cancel" />
              </Button>
              <Button
                onClick={props.submit}
                size="large"
                type="primary"
                icon={<Plus />}
                className="flex items-center"
              >
                <FormattedMessage id="create_plan" />
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
          alwaysShowItemLabel
          className="block"
        >
          {(fields, index) => (
            <div key={index}>
              <div className="flex justify-end">
                <Button
                  ghost
                  onClick={(e) => {
                    console.log(e, "e");
                    console.log(index, "index");
                    ref.current?.remove(index);
                  }}
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
                    label={"Intervention"}
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
        <FormattedMessage id="add_plan" />
      </Button>
    </DrawerForm>
  );
};
