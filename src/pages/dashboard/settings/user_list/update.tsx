import { ModalForm, ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import { useEffect, useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import address from "service/address";
import userList from "service/settings/user_list";
import { UserType } from "service/settings/user_list/type";
import { ActionComponentProps } from "types";
import { Form } from "./form";
import file from "service/file";

export const UpdateUser: React.FC<ActionComponentProps<UserType>> = ({
  onCancel,
  onFinish,
  open,
  detail,
}) => {
  const formRef = useRef<ProFormInstance>();
  const userUpdate = useRequest(userList.edit, {
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

  const uploadProfile = useRequest(file.upload, {
    manual: true,
  });

  const khoroo = useRequest(address.khoroo, {
    manual: true,
  });
  const newFileUpload = async (files: any[]) => {
    console.log(files, "Files");
    if (!files[0]?.uid.includes("rc-upload")) {
      console.log("hey");
      return files[0]?.id;
    }
    const file = await uploadProfile.runAsync({
      file: files[0].originFileObj,
    });
    return file[0].id;
  };

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
        const id = await newFileUpload(values?.profile);
        await userUpdate.runAsync(
          {
            ...values,
            profile_id: id,
          },
          detail?.id
        );
        onFinish?.();
      }}
      title={intl.formatMessage({ id: "update_user" })}
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
      <Form city={city} khoroo={khoroo} district={district} />
    </ModalForm>
  );
};
