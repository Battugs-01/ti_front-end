import { ProFormDigit, ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { IModalForm } from "components/modal";
import { FC } from "react";

import { Form } from "antd";
import { useAuthContext } from "context/auth";
import settings, { keys } from "service/settings";
import { Config, SubscriptionModel } from "service/settings/types";
import { ActionComponentProps } from "types";
import { useRequest } from "ahooks";
import { SubscriptionTypes } from "utils/constants";
import { PageLoading } from "@ant-design/pro-layout";

const Create: FC<ActionComponentProps<SubscriptionModel>> = ({
  onFinish,
  open,
  onCancel,
  details,
}) => {
  const [{ user }] = useAuthContext();
  const [form] = Form.useForm();

  const notSelectedNames = SubscriptionTypes.filter((e) => {
    const found = details?.find((x) => x.name === e.value);
    return !found;
  });

  return (
    <>
      <IModalForm
        open={open}
        title="Create Subscription"
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: onCancel,
        }}
        submitTimeout={2000}
        onRequest={async (values) => {
          values.created_at = new Date().toISOString();
          values.updated_at = new Date().toISOString();
          values.updated_user_id = user?.id || "";
          values.created_user_id = user?.id || "";
          values.id = Date.now();
          const newValues = [...(details || []), values];
          return settings.set(keys.subscription, newValues);
        }}
        onSuccess={() => {
          onFinish?.();
        }}
      >
        <ProFormSelect
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please enter name",
            },
          ]}
          placeholder={"Select Name"}
          options={notSelectedNames}
        />

        <ProFormDigit
          label="Price"
          name="price"
          placeholder="Enter Price"
          rules={[
            {
              required: true,
              message: "Please enter price",
            },
          ]}
          fieldProps={{
            formatter: (value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          }}
        />
        <ProFormText
          name="description"
          label="Description"
          placeholder="Enter Description"
          rules={[
            {
              required: true,
              message: "Please enter description",
            },
          ]}
        />
      </IModalForm>
    </>
  );
};

export default Create;
