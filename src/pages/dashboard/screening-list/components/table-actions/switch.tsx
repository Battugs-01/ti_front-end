import ProForm, {
  ModalForm,
  ModalFormProps,
  ProFormInstance,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Avatar, Button, notification } from "antd";
import { debounce } from "lodash";
import { useEffect, useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import file from "service/file";
import screenList from "service/screening_list";
import userList from "service/settings/user_list";

type PropsCancel = ModalFormProps & {
  onCancel: () => void;
  data?: any;
  onFinish?: () => void;
};

export const SwitchModal = ({
  onCancel,
  data,
  onFinish,
  ...rest
}: PropsCancel) => {
  const formRef = useRef<ProFormInstance>();
  const intl = useIntl();
  const switchRequest = useRequest(screenList.switchCustomer, {
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
    if (data) {
      emplyoee.run({});
    }
  }, [data]);

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
      width={550}
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      open={!!data}
      title={intl.formatMessage({ id: "case_movement" })}
      modalProps={{
        destroyOnClose: true,
        width: "650px",
        onCancel: () => {
          onCancel?.();
          formRef?.current?.resetFields();
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
      submitter={{
        render: (props) => {
          return (
            <div className="flex items-center gap-4">
              <Button
                onClick={() => {
                  onCancel?.();
                  formRef?.current?.resetFields();
                }}
                size="large"
                type="default"
              >
                <FormattedMessage id="cancel" />
              </Button>
              <Button
                onClick={props.submit}
                size="large"
                type="primary"
                className="flex items-center"
              >
                <FormattedMessage id="save" />
              </Button>
            </div>
          );
        },
      }}
      onFinish={async (values) => {
        if (!!data && (await switchRequest.runAsync(data.id, { ...values }))) {
          return true;
        }
        return false;
      }}
    >
      <ProForm.Item noStyle shouldUpdate>
        {(form) => {
          return (
            <>
              <ProFormSelect
                label={
                  <div className="font-medium text-gray-700">
                    <FormattedMessage id="to_whom" />
                  </div>
                }
                name={"employee_id"}
                shouldUpdate
                className="flex items-center justify-center "
                fieldProps={{
                  showSearch: true,
                  loading: emplyoee.loading,
                  filterOption: false,
                  onSearch: debouncedSearch,
                  size: "large",
                }}
                placeholder={intl.formatMessage({ id: "select" })}
                options={emplyoee?.data?.items.reduce<any[]>((acc, record) => {
                  acc.push({
                    label: (
                      <div className="flex gap-2 items-center">
                        <Avatar
                          shape="circle"
                          size={"small"}
                          src={file.fileToUrl(
                            record.profile?.physical_path || "AS"
                          )}
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
              <ProFormTextArea
                name="description"
                label={
                  <div className="text-gray-700 font-medium ">
                    {intl.formatMessage({ id: "description" })}
                  </div>
                }
                placeholder={intl.formatMessage({ id: "placeholder_text" })}
              />
            </>
          );
        }}
      </ProForm.Item>
    </ModalForm>
  );
};
