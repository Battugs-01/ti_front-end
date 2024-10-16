import {
  ModalForm,
  ModalFormProps,
  ProFormInstance,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Avatar, Button, Col, notification, Row } from "antd";
import SeverityLevelBadge from "components/badge/severity_level_badge";
import { ReadMore } from "components/read-more";
import { useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import developmentPlan from "service/development_plan";
import { CareFociItemElement } from "service/development_plan/type";
import file from "service/file";
import { DevPlanQuistion } from "utils/dev_plan";

type PropsCancel = ModalFormProps & {
  onCancel: () => void;
  data: CareFociItemElement;
  onFinish?: any;
  isEvaluated?: boolean;
  assesment_id: number;
};

export const DevPlanUpdate = ({
  onCancel,
  onFinish,
  data,
  isEvaluated,
  assesment_id,
  ...rest
}: PropsCancel) => {
  const formRef = useRef<ProFormInstance>();
  const intl = useIntl();

  const updateDevPlan = useRequest(developmentPlan.updateItemDevPlan, {
    manual: true,
    onSuccess: () => {
      onFinish && onFinish();
    },
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  return (
    <ModalForm
      {...rest}
      modalProps={{
        destroyOnClose: true,
        width: "650px",
        onCancel: () => {
          formRef?.current?.resetFields();
          onCancel?.();
        },
        styles: {
          header: {
            padding: "1.2rem",
            borderBottom: "1px solid #EAECF0",
          },
          content: {
            padding: "0",
          },
          body: {
            padding: "1.2rem 1.2rem 0 1.2rem",
          },
          footer: {
            padding: "0 1.2rem 1.2rem 1.2rem",
          },
        },
      }}
      labelAlign="left"
      layout="vertical"
      title={
        <div className="text-lg font-semibold text-gray-900">
          {intl.formatMessage({ id: "development_plan_update" })}
        </div>
      }
      initialValues={{
        ...data,
      }}
      width={550}
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      className="pt-3"
      open={!!data}
      submitter={{
        render: ({ submit: cancelRequest }) => {
          return (
            <div className="flex items-center gap-3">
              <Button onClick={onCancel} size="large" type="default">
                <FormattedMessage id="cancel" />
              </Button>
              <Button onClick={cancelRequest} size="large" type="primary">
                <FormattedMessage id="save" />
              </Button>
            </div>
          );
        },
      }}
      onFinish={async (values) => {
        if (
          !!data &&
          (await updateDevPlan.runAsync({
            ...values,
            assessment_id: Number(assesment_id),
            care_foci_id: data?.customer_care_foci_item?.care_foci_id || 0,
            id: data?.id || 0,
            is_general: !isEvaluated,
          }))
        ) {
          return true;
        }
        return false;
      }}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between ">
          <div className="text-gray-900 font-medium text-sm w-1/2">
            <FormattedMessage id="question" />
          </div>
          <div className="text-gray-700 font-normal text-sm text-right">
            {isEvaluated
              ? data?.customer_care_foci_item?.care_foci_item?.name
              : DevPlanQuistion(data?.key as string)}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-gray-900 font-medium text-sm">
            <FormattedMessage id={isEvaluated ? "description" : "answer"} />
          </div>
          <div className="text-gray-700 font-normal text-sm ">
            {data?.desc || "-"}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-gray-900 font-medium text-sm">
            <FormattedMessage id="severity_syndrome" />
          </div>
          <div className="text-gray-700 font-normal text-sm ">
            <SeverityLevelBadge title={data?.severity_level} />
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-gray-900 font-medium text-sm">
            <FormattedMessage id="summary_plan" />
          </div>
          <div className="text-gray-700 font-normal text-sm ">
            {<ReadMore id={"read more plan"} text={data?.summary_plan} />}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-gray-900 font-medium text-sm">
            <FormattedMessage id="time" />
          </div>
          <div className="text-gray-700 font-normal text-sm ">
            {data?.duration + " " + intl.formatMessage({ id: "day" }) || "-"}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="text-gray-900 font-medium text-sm">
            <FormattedMessage id="responsible" />
          </div>
          <div className="text-gray-700 font-normal text-sm ">
            <div>
              {
                <div className="flex gap-2 items-center">
                  {data?.person_in_charge?.profile?.physical_path && (
                    <Avatar
                      shape="circle"
                      size={"small"}
                      src={file.fileToUrl(
                        data?.person_in_charge?.profile?.physical_path || "-"
                      )}
                    />
                  )}
                  <span>
                    {data?.person_in_charge?.last_name &&
                    data?.person_in_charge?.first_name
                      ? `${data?.person_in_charge?.last_name?.substring(
                          0,
                          1
                        )}. ${data?.person_in_charge?.first_name}`
                      : "-"}
                  </span>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormTextArea
            fieldProps={{
              size: "large",
            }}
            placeholder={intl.formatMessage({ id: "result" })}
            name="result"
            label={
              <div className="text-gray-700 font-medium custom-input mt-5">
                {intl.formatMessage({ id: "result" })}
              </div>
            }
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProFormSelect
            options={[
              {
                value: true,
                label: "Тийм",
              },
              { value: false, label: "Үгүй" },
            ]}
            label={
              <div className="text-gray-700 font-medium ">
                {intl.formatMessage({ id: "is_resolved" })}
              </div>
            }
            name="is_resolved"
            placeholder={intl.formatMessage({ id: "is_resolved" })}
            fieldProps={{
              size: "large",
            }}
          />
        </Col>
      </Row>
    </ModalForm>
  );
};
