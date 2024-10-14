import { ModalForm, ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import { useEffect, useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import address from "service/address";
import stackholderList from "service/settings/stackholder";
import { StackholderType } from "service/settings/stackholder/type";
import { ActionComponentProps } from "types";
import { UpdateForm } from "./form/update-form";

export const UpdateStakeholder: React.FC<
  ActionComponentProps<StackholderType>
> = ({ onCancel, onFinish, open, detail }) => {
  const formRef = useRef<ProFormInstance>();
  const createPermission = useRequest(stackholderList.edit, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: intl.formatMessage({ id: "success" }),
      });
      onCancel();
    },
    onError: (error: any) => {
      notification.error({
        message: error.message,
      });
    },
  });

  const city = useRequest(address.city, {});

  const district = useRequest(address.district, {
    manual: true,
  });

  const khoroo = useRequest(address.khoroo, {
    manual: true,
  });

  useEffect(() => {
    if (detail) {
      district.run(detail?.address?.city_id);
      khoroo.run(detail?.address?.district_id);
    }
  }, [detail]);
  const intl = useIntl();
  return (
    <ModalForm
      formRef={formRef}
      onFinish={async (values) => {
        await createPermission.runAsync(
          {
            ...values,
          },
          detail?.id
        );
        onFinish?.();
      }}
      title={intl.formatMessage({ id: "update_stakeholder" })}
      open={open}
      initialValues={{
        ...detail,
      }}
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
      onOpenChange={() => {
        formRef?.current?.resetFields();
      }}
      submitter={{
        render: (props) => {
          return (
            <div className="flex items-center gap-3">
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
              <Button onClick={props.submit} size="large" type="primary">
                <FormattedMessage id="save" />
              </Button>
            </div>
          );
        },
      }}
    >
      <UpdateForm city={city} district={district} khoroo={khoroo} />
    </ModalForm>
  );
};
