import {
  ModalForm,
  ModalFormProps,
  ProFormDatePicker,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Avatar, Button, notification } from "antd";
import { SectionContainer } from "components/index";
import { useEffect, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import developmentPlan from "service/development_plan";
import { useLevelContext } from "../selected-level";
import userList from "service/settings/user_list";
import { debounce } from "lodash";
import file from "service/file";
import dayjs from "dayjs";

type PropsCancel = ModalFormProps & {
  onCancel: () => void;
  visible: boolean;
  onFinish?: () => void;
};

export const DevPlanEndModal = ({
  onCancel,
  onFinish,
  visible,
  ...rest
}: PropsCancel) => {
  const formRef = useRef<ProFormInstance>();
  const intl = useIntl();
  const { selectedLevel } = useLevelContext();
  const [isDoNext, setIsDoNext] = useState<boolean>(true);
  const closeRequest = useRequest(developmentPlan.closeRequest, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай",
      });
      onFinish && onFinish();
    },
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  const debouncedSearch = debounce((value) => {
    emplyoee.run({
      current: 1,
      pageSize: 20,
      query: value,
    });
  }, 1000);

  useEffect(() => {
    if (visible === true) {
      emplyoee.run({});
    }
  }, [visible]);

  const emplyoee = useRequest(userList.list, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  return (
    <ModalForm
      {...rest}
      modalProps={{ maskClosable: false, onCancel, className: "rounded " }}
      labelAlign="left"
      layout="vertical"
      title={
        <div className="text-lg font-semibold text-gray-900">
          {intl.formatMessage({ id: "development_plan" })}
        </div>
      }
      width={550}
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      className="pt-3"
      open={visible === true}
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
          !!visible &&
          (await closeRequest.runAsync(selectedLevel?.id, {
            ...values,
          }))
        ) {
          return true;
        }
        return false;
      }}
    >
      <div className="">
        <SectionContainer
          label={intl.formatMessage({ id: "next_assessment" })}
          children={
            <ProFormRadio.Group
              name="is_do_next"
              radioType="button"
              fieldProps={{
                onChange: (e) => {
                  setIsDoNext(e.target.value);
                },
              }}
              options={[
                {
                  label: intl.formatMessage({ id: "yes" }),
                  value: true,
                },
                {
                  label: intl.formatMessage({ id: "no" }),
                  value: false,
                },
              ]}
              initialValue={true}
            />
          }
        />

        {isDoNext && (
          <ProFormDatePicker
            name="date"
            initialValue={dayjs().endOf("day")}
            fieldProps={{
              disabledDate: (current) => {
                return current && current < dayjs().endOf("day");
              },
            }}
            label={
              <div className="text-base font-medium">
                {intl.formatMessage({ id: "implement_date" })}
              </div>
            }
          />
        )}

        <div className="text-lg font-medium m-0 p-0">
          <FormattedMessage id="risk_level" />
        </div>
        <ProFormRadio.Group
          name="priority"
          className="flex gap-2 mt-0 pt-0"
          layout="vertical"
          initialValue="high"
          options={[
            {
              label: (
                <div className="flex flex-col m-0 p-0 mt-4">
                  <span className="m-0 p-0 text-base font-medium text-gray-700">
                    <FormattedMessage id="high" />
                  </span>
                  <span className="m-0 p-0 text-sm font-normal text-gray-600">
                    <FormattedMessage id="start_immediately" />
                  </span>
                </div>
              ),
              value: "high",
            },
            {
              label: (
                <div className="flex flex-col m-0 p-0 mt-4">
                  <span className="m-0 p-0 text-base font-medium text-gray-700">
                    <FormattedMessage id="medium" />
                  </span>
                  <span className="m-0 p-0 text-sm font-normal text-gray-600">
                    <FormattedMessage id="next_7_days" />
                  </span>
                </div>
              ),
              value: "medium",
            },
            {
              label: (
                <div className="flex flex-col m-0 p-0 mt-4">
                  <span className="m-0 p-0 text-base font-medium text-gray-700">
                    <FormattedMessage id="low" />
                  </span>
                  <span className="m-0 p-0 text-sm font-normal text-gray-600">
                    <FormattedMessage id="next_few_month" />
                  </span>
                </div>
              ),
              value: "low",
            },
          ]}
        />
        <ProFormTextArea
          name="note"
          placeholder="Дэлгэрэнгүй оруулна уу..."
          label={
            <div className="text-base font-medium">
              <FormattedMessage id="notes" />
            </div>
          }
        />
        <ProFormSelect
          label={
            <div className="text-base font-medium">
              <FormattedMessage id="responsible" />
            </div>
          }
          name={"person_in_charge_id"}
          shouldUpdate
          className="flex items-center justify-center custom-input"
          fieldProps={{
            showSearch: true,
            loading: emplyoee.loading,
            filterOption: false,
            onSearch: debouncedSearch,
          }}
          placeholder={intl.formatMessage({ id: "select" })}
          options={emplyoee?.data?.items.reduce<any[]>((acc, record) => {
            acc.push({
              label: (
                <div className="flex gap-2 items-center">
                  <Avatar
                    shape="circle"
                    size={"small"}
                    src={file.fileToUrl(record.profile?.physical_path || "AS")}
                  />
                  <span>{`${record?.last_name?.substring(0, 1)}. ${
                    record?.first_name
                  }`}</span>
                </div>
              ),
              value: record?.id,
            });
            return acc;
          }, [])}
        />
      </div>
    </ModalForm>
  );
};
