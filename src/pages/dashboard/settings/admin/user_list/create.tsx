import { ModalForm } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import address from "service/address";
import file from "service/file";
import userList from "service/settings/user_list";
import { ActionComponentProps } from "types";
import { Form } from "./form";

export const CreateUser: React.FC<ActionComponentProps<any>> = ({
  onCancel,
  onFinish,
  open,
}) => {
  const userAdd = useRequest(userList.create, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: intl.formatMessage({ id: "success" }),
      });
      onFinish?.();
    },
    onError: (error: any) => {
      notification.error({
        message: error.message,
      });
      onFinish?.();
    },
  });
  const intl = useIntl();

  const city = useRequest(address.city);

  const district = useRequest(address.district, {
    manual: true,
  });

  const khoroo = useRequest(address.khoroo, {
    manual: true,
  });
  const uploadProfile = useRequest(file.upload, {
    manual: true,
  });
  return (
    <ModalForm
      onFinish={async (values) => {
        if (!values?.profile) {
          await userAdd.runAsync({
            ...values,
          });
        } else {
          const file = await uploadProfile.runAsync({
            file: values?.profile[0]?.originFileObj,
          });
          await userAdd.runAsync({
            ...values,
            profile_id: file[0]?.id,
          });
        }
        onFinish?.();
      }}
      title={intl.formatMessage({ id: "add_user" })}
      open={open}
      modalProps={{
        destroyOnClose: true,
        width: "650px",
        onCancel,
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
            <div className="flex items-center gap-3">
              <Button onClick={onCancel} size="large" type="default">
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
      <Form city={city} khoroo={khoroo} district={district} />
    </ModalForm>
  );
};
